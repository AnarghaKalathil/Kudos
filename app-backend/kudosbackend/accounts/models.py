from django.contrib.auth.models import AbstractUser
from django.db import models


class KudosUser(AbstractUser):
    designation = models.CharField(max_length=100, blank=True, null=True)
    department = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.username if self.username else ""

class DeviceToken(models.Model):
    user = models.ForeignKey(KudosUser, on_delete=models.CASCADE)
    token = models.CharField(max_length=255)
    device_type = models.CharField(max_length=10, choices=(('android', 'Android'), ('ios', 'iOS')))
    created_at = models.DateTimeField(auto_now_add=True)