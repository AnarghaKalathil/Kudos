from django.urls.conf import path

from dashboard.views import RecognitionData

app_name = "dashboard"

urlpatterns = [
    path("api/recognition/", RecognitionData.as_view(), name="login"),
]
