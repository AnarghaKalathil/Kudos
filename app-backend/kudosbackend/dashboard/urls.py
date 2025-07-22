from django.urls.conf import path

from dashboard import views

app_name = "dashboard"

urlpatterns = [
    path("api/recognition/", views.RecognitionData.as_view(), name="login"),
    path("api/dashboard/", views.Dashboard.as_view(), name="login"),
    path("api/teams/", views.TeamList.as_view(), name="login"),
    path("api/recognition/status", views.RecognitionStatusChange.as_view(), name="status"),
    path("api/profile", views.GetuserProfile.as_view(), name="profile"),
]
