from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import KudosUser
from dashboard.models import Recognition, Skills
from dashboard.serializer import RecognitionSerializer


class RecognitionData(APIView):
    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request):
        try:
            pass
        except Exception as e:
            return Response(
                {"message": f"Server error: {str(e)}", "status": False},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @extend_schema(
        request=RecognitionSerializer,
        summary="Logout API",
    )
    def post(self, request):
        try:
            serializer = RecognitionSerializer(data=request.data)

            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            data = serializer.validated_data
            receiver = KudosUser.objects.get(id=data["receiver"])
            reviewer = KudosUser.objects.get(id=data["reviewer"])

            recognition = Recognition.objects.create(
                sender=data["sender"],
                receiver=receiver,
                category=data["category"],
                message=data["message"],
                reviewer=reviewer,
            )
            skill_tags = data.get("skill_tags", [])
            tag_objs = []
            for tag in skill_tags:
                obj, _ = Skills.objects.get_or_create(name=tag.strip())
                tag_objs.append(obj)
            recognition.skill_tags.set(tag_objs)
            return Response(
                {"message": "Recognition added successfully", "status": True},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"message": f"Server error: {str(e)}", "status": False},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
