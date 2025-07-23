from rest_framework import serializers

from accounts.models import KudosUser
from dashboard.models import Recognition, Skills


class RecognitionListSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    reviewer = serializers.SerializerMethodField()
    skills = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()

    class Meta:
        model = Recognition
        fields = ["category", "message", "is_reviewed",
                  "reviewed_at", "created_at", "sender",
                  "reviewer", "skills", "status"]

    def get_sender(self, obj):
        return obj.sender.username if obj.sender.username  else None

    def get_reviewer(self, obj):
        return obj.reviewer.username if obj.reviewer.username else None

    def get_skills(self, obj):
        return obj.skills.all().values_list("name", flat=True)

    def get_category(self, obj):
        return obj.category.name


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


class StatusUpdateSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    status = serializers.ChoiceField(choices=["PENDING", "REJECTED", "APPROVED"])
