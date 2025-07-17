from rest_framework import serializers

from .models import KudosUser


class LoginSwaggerSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class LogoutSwaggerSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = KudosUser
        fields = [
            "last_login",
            "is_superuser",
            "is_active",
            "date_joined",
            "designation",
        ]
