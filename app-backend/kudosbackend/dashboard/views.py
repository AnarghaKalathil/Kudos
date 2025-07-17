from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import KudosUser
from dashboard.models import Recognition, Skills
from dashboard import serializer as serializer_obj


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
            name= request.data.get("name")
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
    def get(self,request):
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