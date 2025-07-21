from rest_framework import serializers
from accounts.models import KudosUser
from dashboard.models import Skills
from .models import Category


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = KudosUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'designation', 'department', 'is_admin', 'date_joined']
        read_only_fields = ['id', 'date_joined']


class CreateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = KudosUser
        fields = ['username', 'email', 'first_name', 'last_name', 'designation', 'department', 'password']
    
    def validate_email(self, value):
        if not value.endswith('@terrificminds.com'):
            raise serializers.ValidationError("Only emails from terrificminds.com are allowed.")
        return value
    
    def create(self, validated_data):
        user = KudosUser.objects.create_user(**validated_data)
        return user


class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = ['id', 'name']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at'] 