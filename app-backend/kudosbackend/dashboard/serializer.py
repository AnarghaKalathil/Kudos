from rest_framework import serializers

from accounts.models import KudosUser
from dashboard.models import Recognition, Skills


class RecognitionListSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    reviewer = serializers.SerializerMethodField()
    skills = serializers.SerializerMethodField()

    class Meta:
        model = Recognition
        fields = ["category", "message", "is_reviewed",
                  "reviewed_at", "created_at", "sender",
                  "reviewer", "skills"]

    def get_sender(self, obj):
        return obj.sender.username

    def get_reviewer(self, obj):
        return obj.reviewer.username

    def get_skills(self, obj):
        return obj.skills.all().values_list("name", flat=True)


class RecognitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recognition
        fields = ["sender", "receiver", "category", "message", "skills", "reviewer"]


class SkillListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = "__all__"


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = ["name"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = KudosUser
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
            "designation",
            "department",
        ]