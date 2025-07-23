from django.urls.conf import path

from .views import LoginApiView, LogoutView, SaveFCMToken

app_name = "accounts"

urlpatterns = [
    path("api/login/", LoginApiView.as_view(), name="login"),
    path("api/logout/", LogoutView.as_view(), name="logout"),
    path("api/device-token/", SaveFCMToken.as_view(), name="device-token"),
]
