from django.db.models import Q, Count
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from collections import defaultdict
from accounts.models import KudosUser
from admin_dashboard.serializers import CategorySerializer
from dashboard.models import Recognition, Star, RecognitionStatus
from admin_dashboard.models import Skills, Category
from dashboard import serializer as serializer_obj
from dashboard.serializer import StatusUpdateSerializer, RecognitionListSerializer, SkillSerializer, \
    RecognitionSerializer
from django.db.models import Prefetch

class Dashboard(APIView):
    permission_classes = [IsAuthenticated, ]

    @extend_schema(
        summary="Get All User Daata",
        tags=["Accounts API's"],
    )
    def get(self, request):
        try:
            user = request.user
            star_count = Star.objects.filter(
                Q(recognition__sender=user) |
                Q(recognition__receiver=user) |
                Q(recognition__reviewer=user)
            ).count()

            pending = Recognition.objects.filter(status=RecognitionStatus.PENDING)
            approved = Recognition.objects.filter(status=RecognitionStatus.APPROVED)
            rejected = Recognition.objects.filter(status=RecognitionStatus.REJECTED)

            approved_user_recognitions = Recognition.objects.filter(
                status=RecognitionStatus.APPROVED,
                receiver=user
            )
            skills_qs = Skills.objects.filter(
                recognitions__in=approved_user_recognitions
            ).distinct()

            # Top 5 users with most stars received
            top_users_qs = KudosUser.objects.annotate(
                star_count=Count('recognitions_received__star')
            ).filter(
                star_count__gt=0
            ).order_by('-star_count')[:5]

            top_users = []
            total_users = ""
            total_contributors = ""
            total_star_count = ""
            total_skill_count = ""
            if top_users_qs:
                for u in top_users_qs:
                    recognitions = Recognition.objects.filter(receiver=u, status=RecognitionStatus.APPROVED)

                    user_categories = Category.objects.filter(
                        recognitions_category__in=recognitions
                    ).distinct()

                    user_skills = Skills.objects.filter(
                        recognitions__in=recognitions
                    ).distinct()

                    top_users.append({
                        "username": u.username,
                        "first_name": u.first_name,
                        "last_name": u.last_name,
                        "star_count": u.star_count,
                        "categories": CategorySerializer(user_categories, many=True).data,
                        "skills": SkillSerializer(user_skills, many=True).data,
                    })
            total_users = KudosUser.objects.filter(is_superuser=False).count()

            total_contributors = KudosUser.objects.filter(
                recognitions_given__isnull=False
            ).distinct().count()

            total_star_count = Star.objects.count()

            total_skill_count = Skills.objects.count()

            return Response({
                "user_data": {
                    "star_count": star_count,
                    "recognitions": {
                        "pending": RecognitionListSerializer(pending, many=True).data,
                        "approved": RecognitionListSerializer(approved, many=True).data,
                        "rejected": RecognitionListSerializer(rejected, many=True).data,
                    },
                    "skills": SkillSerializer(skills_qs, many=True).data,
                },
                "top_users": top_users,
                "total_count": {
                    "total_number_of_users": total_users,
                    "total_contributors": total_contributors,
                    "total_star_count": total_star_count,
                    "total_skill_count": total_skill_count,
                }
            })

        except Exception as e:
            return Response(
                {"message": f"Server error: {str(e)}", "status": False},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class RecognitionData(APIView):
    permission_classes = [
        IsAuthenticated,
    ]

    @extend_schema(
        request=serializer_obj.RecognitionSerializer,
        summary="Get All Recognition",
        tags=["Recognition API's"],
    )
    def get(self, request):
        try:
            user = request.user
            recognition_list = Recognition.objects.filter(reviewer=user).order_by("-id")
            serializer = serializer_obj.RecognitionListSerializer(recognition_list, many=True)
            return Response(
                {"data": serializer.data, "status": True},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"message": f"Server error: {str(e)}", "status": False},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @extend_schema(
        request=serializer_obj.RecognitionSwaggerSerializer,
        summary="Add New Recognition",
        tags=["Recognition API's"]
    )
    def post(self, request):
        try:
            serializer = serializer_obj.RecognitionSwaggerSerializer(data=request.data)

            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            print("HIT ABOVE")
            data = serializer.validated_data
            print(f"data - {data["receiver"]}")
            receiver = KudosUser.objects.get(username=data["receiver"])
            reviewer = KudosUser.objects.get(username=data["reviewer"])
            print("HIT Here")
            recognition = Recognition.objects.create(
                sender=data["sender"],
                receiver=receiver,
                category=data["category"],
                message=data["message"],
                reviewer=reviewer,
            )
            skill_tags = data.get("skills", [])
            recognition.skills.set(skill_tags)
            return Response(
                {"message": "Recognition added successfully", "status": True},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"message": f"Server error: {str(e)}", "status": False},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class SkillsData(APIView):
    permission_classes = [IsAuthenticated, ]

    @extend_schema(
        request=serializer_obj.RecognitionSerializer,
        summary="Get All Skills",
        tags=["Skill API's"]
    )
    def get(self, request):
        try:
            skill_list = Skills.objects.all().order_by("name")
            serializer = serializer_obj.SkillListSerializer(skill_list, many=True)
            return Response(
                {"data": serializer.data, "status": True},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"message": f"Server error: {str(e)}", "status": False},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @extend_schema(
        request=serializer_obj.SkillSerializer,
        summary="Add New Skill API",
        tags=["Skill API's"]
    )
    def post(self, request):
        try:
            skill = request.data.get("name")
            Skills.objects.create(
                name=skill
            )
            return Response(
                {"message": "New skill created successfully", "status": True},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"message": f"Server error: {str(e)}", "status": False},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class SkillDelete(APIView):
    permission_classes = [IsAuthenticated, ]

    @extend_schema(
        parameters=[
            OpenApiParameter(name='name', location=OpenApiParameter.PATH, required=True, type=str)
        ],
        summary="Delete Skill API",
        tags=["Skill API's"]
    )
    def delete(self, request, name):
        try:
            name = request.data.get("name")
            skill = Skills.objects.filter(name=name)
            if skill:
                skill.delete()
                return Response(
                    {"message": "Skill deleted successfully", "status": True},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"message": "No Skill found with given ID", "status": False},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            return Response(
                {"message": f"Server error: {str(e)}", "status": False},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class TeamList(APIView):
    permission_classes = [IsAuthenticated, ]

    @extend_schema(
        summary="Get All Employee List",
        tags=["Team API's"]
    )
    def get(self, request):
        try:
            users = KudosUser.objects.filter(is_superuser=False)

            # Collect user IDs to filter recognitions/stars in bulk
            user_ids = users.values_list('id', flat=True)

            # Fetch all recognitions in one go, related to users
            recognitions = Recognition.objects.filter(receiver_id__in=user_ids).select_related(
                'category').prefetch_related('skills')

            # Fetch all stars related to those recognitions
            stars = Star.objects.filter(recognition__receiver_id__in=user_ids).select_related('recognition__category')

            # Group data
            user_recognitions = defaultdict(list)
            user_stars = defaultdict(list)
            user_skills = defaultdict(set)

            for recog in recognitions:
                user_recognitions[recog.receiver_id].append(recog)
                if recog.status == RecognitionStatus.APPROVED:
                    for skill in recog.skills.all():
                        user_skills[recog.receiver_id].add(skill.id)

            for star in stars:
                user_stars[star.recognition.receiver_id].append(star)

            data = []

            for user in users:
                uid = user.id
                user_recs = user_recognitions.get(uid, [])
                approved = [r for r in user_recs if r.status == RecognitionStatus.APPROVED]
                pending = [r for r in user_recs if r.status == RecognitionStatus.PENDING]
                rejected = [r for r in user_recs if r.status == RecognitionStatus.REJECTED]

                stars = user_stars.get(uid, [])
                star_count = len(stars)

                category_counts = defaultdict(int)
                for star in stars:
                    category_name = star.recognition.category.name
                    category_counts[category_name] += 1

                skill_ids = list(user_skills.get(uid, []))
                skills = Skills.objects.filter(id__in=skill_ids)

                data.append({
                    "user_id": user.id,
                    "name": user.get_full_name() if hasattr(user, "get_full_name") else user.username,
                    "email": user.email,
                    "designation": user.designation,
                    "star_count": star_count,
                    "star_summary": category_counts,
                    "skills": SkillSerializer(skills, many=True).data,
                    "recognitions": {
                        "pending": RecognitionSerializer(pending, many=True).data,
                        "approved": RecognitionSerializer(approved, many=True).data,
                        "rejected": RecognitionSerializer(rejected, many=True).data,
                    }
                })

            return Response(
                {"data": data, "status": True},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"message": f"Server error: {str(e)}", "status": False},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class RecognitionStatusChange(APIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = StatusUpdateSerializer

    @extend_schema(
        request=StatusUpdateSerializer,
        summary="Recognition Status Change API's",
        tags=["Recognition API's"]
    )
    def post(self, request):
        try:
            recognition_id = request.data.get("id")
            rec_status = request.data.get("status")
            print(f"status - {rec_status} || reco id - {recognition_id}")
            if recognition_id and rec_status:
                print("HITINF")
                recognition_ins = Recognition.objects.get(id=recognition_id)
                recognition_ins.status = rec_status
                recognition_ins.save()
                print("HIT HERE")
                if rec_status == "APPROVED":
                    Star.objects.get_or_create(
                        recognition=recognition_ins
                    )
                return Response(
                    {"message": "Status Updated suuccessfully", "status": True},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"message": "Invalid ID or Status, Please try again", "status": True},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            return Response(
                {"message": f"Server error: {str(e)}", "status": False},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class GetuserProfile(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        summary="Get User Data",
        tags=["Accounts API's"],
    )
    def get(self, request):
        try:
            user = request.user

            total_stars = Star.objects.filter(
                recognition__receiver=user
            ).count()

            stars = Star.objects.filter(
                recognition__receiver=user
            ).select_related('recognition__category')

            category_counts = defaultdict(int)

            for star in stars:
                category_name = star.recognition.category.name
                category_counts[category_name] += 1

            user_recognitions = Recognition.objects.filter(
                Q(receiver=user) | Q(sender=user)
            )
            skills = Skills.objects.filter(
                recognitions__receiver=user,
                recognitions__status=RecognitionStatus.APPROVED
            ).distinct()
            return Response({
                "user_id": user.id,
                "name": user.get_full_name() if hasattr(user, "get_full_name") else user.username,
                "star_summary": category_counts,
                "total_stars": total_stars,
                "recognitions": RecognitionSerializer(user_recognitions, many=True).data,
                "user_skills":skills
            })
        except Exception as e:
            return Response(
                {"message": f"Server error: {str(e)}", "status": False},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
