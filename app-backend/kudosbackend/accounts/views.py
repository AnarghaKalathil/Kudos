from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, TokenError


class LoginApiView(APIView):

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
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response(
                    {"data": "", "message": "User not found.", "status": False},
                    status=status.HTTP_404_NOT_FOUND,
                )

            # Authenticate the user
            user = authenticate(username=user.username, password=password)
            if user is not None:
                refresh = RefreshToken.for_user(user)
                return Response(
                    {
                        "data": {
                            "user_id": user.id,
                            "username": user.username,
                            "email": user.email,
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

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")

            if not refresh_token:
                return Response(
                    {"message": "Refresh token is required.", "status": False},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(
                {"message": "Logout successful.", "status": True},
                status=status.HTTP_205_RESET_CONTENT,
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
