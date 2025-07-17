from django.urls.conf import path

from dashboard import views

app_name = "dashboard"

urlpatterns = [
    path("api/recognition/", views.RecognitionData.as_view(), name="login"),
    path("api/skills/", views.SkillsData.as_view(), name="login"),
    path("api/skills/<int:id>/", views.SkillDelete.as_view(), name="login"),
    path("api/teams/", views.TeamList.as_view(), name="login"),


]
