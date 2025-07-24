from rest_framework import serializers

from .models import KudosUser


class LoginSwaggerSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class LogoutSwaggerSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = KudosUser
        fields = [
            "full_name",
            "last_login",
            "is_superuser",
            "is_active",
            "date_joined",
            "designation",
            ]
    def get_full_name(self,obj):
        return obj.get_full_name()