from django.contrib.auth.models import AbstractUser
from django.db import models


class KudosUser(AbstractUser):
    designation = models.CharField(max_length=100, blank=True, null=True)
    department = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.username if self.username else ""
