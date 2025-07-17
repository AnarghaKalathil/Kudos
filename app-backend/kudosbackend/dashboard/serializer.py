from rest_framework import serializers

from dashboard.models import Recognition


class RecognitionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recognition
        fields = ["sender", "receiver", "category", "message", "tags", "reviewer"]
