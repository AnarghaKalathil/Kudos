from django.db import models

from accounts.models import KudosUser
from admin_dashboard.models import Skills, Category

class RecognitionStatus(models.TextChoices):
    PENDING = "PENDING", "PENDING"
    REJECTED = "REJECTED", "REJECTED"
    APPROVED = "APPROVED", "APPROVED"


class Recognition(models.Model):
    sender = models.ForeignKey(
        KudosUser, related_name="recognitions_given", on_delete=models.CASCADE
    )
    receiver = models.ForeignKey(
        KudosUser, related_name="recognitions_received", on_delete=models.CASCADE
    )
    category = models.ForeignKey(
        Category, related_name="recognitions_category", on_delete=models.CASCADE
    )
    message = models.TextField()
    skills = models.ManyToManyField(Skills, related_name="recognitions")
    reviewer = models.ForeignKey(
        KudosUser,
        null=True,
        blank=True,
        related_name="reviews",
        on_delete=models.SET_NULL,
    )
    is_reviewed = models.BooleanField(default=False)
    reviewed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=RecognitionStatus.choices,
        default=RecognitionStatus.PENDING,
    )

    def __str__(self):
        return (
            f"{self.sender} ➡ {self.receiver}" if self.sender and self.receiver else ""
        )


class Star(models.Model):
    recognition = models.OneToOneField(
        Recognition, on_delete=models.CASCADE, related_name="star"
    )
    date_given = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Star for {self.recognition.receiver} on {self.recognition}"
