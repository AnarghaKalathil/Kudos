from rest_framework import serializers

from accounts.models import KudosUser
from dashboard.models import Recognition, Skills


class RecognitionListSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    receiver = serializers.SerializerMethodField()
    reviewer = serializers.SerializerMethodField()
    skills = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()

    class Meta:
        model = Recognition
        fields = ["receiver","category", "message", "is_reviewed",
                  "reviewed_at", "created_at", "sender",
                  "reviewer", "skills", "status","id"]
    def get_receiver(self, obj):
        return obj.receiver.get_full_name() if obj.sender  else None

    def get_sender(self, obj):
        return obj.sender.get_full_name() if obj.sender  else None

    def get_reviewer(self, obj):
        return obj.reviewer.get_full_name() if obj.reviewer else None

    def get_skills(self, obj):
        return obj.skills.all().values_list("name", flat=True)

    def get_category(self, obj):
        return obj.category.name

class RecognitionSwaggerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recognition
        fields = ["sender", "receiver", "category", "message", "skills", "reviewer"]


class RecognitionSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    receiver = serializers.SerializerMethodField()
    reviewer = serializers.SerializerMethodField()
    skills = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()

    class Meta:
        model = Recognition
        fields = ["sender", "receiver", "category", "message", "skills", "reviewer"]

    def get_receiver(self, obj):
        return obj.receiver.get_full_name() if obj.sender  else None

    def get_sender(self, obj):
        return obj.sender.get_full_name() if obj.sender  else None

    def get_reviewer(self, obj):
        return obj.reviewer.get_full_name() if obj.reviewer else None

    def get_skills(self, obj):
        return obj.skills.all().values_list("name", flat=True)

    def get_category(self, obj):
        return obj.category.name


class SkillListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = "__all__"


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = ["name"]


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = KudosUser
        fields = [
            "full_name"
            "username",
            "first_name",
            "last_name",
            "email",
            "designation",
            "department",
        ]

    def get_full_name(self,obj):
        return obj.get_full_name()

class StatusUpdateSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    status = serializers.ChoiceField(choices=["PENDING", "REJECTED", "APPROVED"])
