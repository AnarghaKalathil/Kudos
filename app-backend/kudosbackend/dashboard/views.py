from django.db.models import Q
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import KudosUser
from dashboard.models import Recognition, Star, RecognitionStatus
from admin_dashboard.models import Skills
from dashboard import serializer as serializer_obj
from dashboard.serializer import StatusUpdateSerializer, RecognitionListSerializer, SkillSerializer


class Dashboard(APIView):
    permission_classes = [IsAuthenticated, ]

    @extend_schema(
        summary="Get All User Daata",
        tags=["Accounts API's"],
    )
    def get(self,request):
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

            return Response({
                "star_count": star_count,
                "recognitions": {
                    "pending": RecognitionListSerializer(pending, many=True).data,
                    "approved": RecognitionListSerializer(approved, many=True).data,
                    "rejected": RecognitionListSerializer(rejected, many=True).data,
                },
                "skills": SkillSerializer(skills_qs, many=True).data
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
            recognition_list = Recognition.objects.filter(receiver=user).order_by("-id")
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
        request=serializer_obj.RecognitionSerializer,
        summary="Add New Recognition",
        tags=["Recognition API's"]
    )
    def post(self, request):
        try:
            serializer = serializer_obj.RecognitionSerializer(data=request.data)

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
    permission_classes = [AllowAny, ]

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
    permission_classes = [AllowAny, ]

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
    permission_classes = [AllowAny, ]

    @extend_schema(
        summary="Get All Employee List",
        tags=["Team API's"]
    )
    def get(self, request):
        try:
            emp_list = KudosUser.objects.filter(is_superuser=False).order_by("username")
            serializer = serializer_obj.UserSerializer(emp_list, many=True)
            return Response(
                {"data": serializer.data, "status": True},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"message": f"Server error: {str(e)}", "status": False},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class RecognitionStatusChange(APIView):
    permission_classes = [AllowAny, ]

    @extend_schema(
        request = StatusUpdateSerializer,
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
