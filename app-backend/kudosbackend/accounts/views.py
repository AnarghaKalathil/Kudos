from django.contrib.auth import authenticate
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

from .models import KudosUser, DeviceToken
from .serializers import (LoginSwaggerSerializer, LogoutSwaggerSerializer,
                          UserSerializer)


class LoginApiView(APIView):
    @extend_schema(
        request=LoginSwaggerSerializer,
        summary="Login API",
        tags=["User Account API's"]
    )
    def post(self, request):
        try:

            email = request.data.get("email")
            password = request.data.get("password")

            if not email or not password:
                return Response(
                    {
                        "data": "",
                        "message": "Email and password are required.",
                        "status": False,
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Verify email domain
            if not email.endswith("@terrificminds.com"):
                return Response(
                    {
                        "data": "",
                        "message": "Only emails from terrificminds.com are allowed.",
                        "status": False,
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )

            try:
                user = KudosUser.objects.get(email=email)
            except KudosUser.DoesNotExist:
                return Response(
                    {"data": "", "message": "User not found.", "status": False},
                    status=status.HTTP_404_NOT_FOUND,
                )

            # Authenticate the user
            user = authenticate(username=user.username, password=password)
            if user is not None:
                refresh = RefreshToken.for_user(user)
                serializer = UserSerializer(user)
                return Response(
                    {
                        "data": {
                            "user_id": user.id,
                            "username": user.username,
                            "email": user.email,
                            "user_data": serializer.data,
                            "access_token": str(refresh.access_token),
                            "refresh_token": str(refresh),
                        },
                        "message": "Login successful.",
                        "status": True,
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"data": "", "message": "Invalid credentials.", "status": False},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

        except Exception as e:
            return Response(
                {"data": "", "message": f"Server error: {str(e)}", "status": False},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=LogoutSwaggerSerializer,
        summary="Logout API",
        tags=["User Account API's"]
    )
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")

            if not refresh_token:
                return Response(
                    {"message": "Refresh token is required.", "status": False},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(
                {"message": "Logout successful.", "status": True},
                status=status.HTTP_200_OK,
            )

        except TokenError:
            return Response(
                {"message": "Invalid or expired token.", "status": False},
                status=status.HTTP_400_BAD_REQUEST,
            )

        except Exception as e:
            return Response(
                {"message": f"Server error: {str(e)}", "status": False},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class SaveFCMToken(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            token = request.data.get("token")
            device_type = request.data.get("device_type")

            if token:
                DeviceToken.objects.update_or_create(
                    user=request.user,
                    token=token,
                    defaults={"device_type": device_type}
                )
                return Response({"message": "Token saved."})
            return Response({"error": "Token is required"}, status=400)
        except Exception as e:
            return Response(
                {"message": f"Server error: {str(e)}", "status": False},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
