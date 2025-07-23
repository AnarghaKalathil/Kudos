from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from drf_spectacular.utils import extend_schema
from drf_spectacular.views import (SpectacularAPIView, SpectacularRedocView,
                                   SpectacularSwaggerView)
from django.conf import settings
from django.conf.urls.static import static

@extend_schema(exclude=True)
class HiddenSchemaView(SpectacularAPIView):
    pass

urlpatterns = [
    # SWAGGER
    path("api/schema/", HiddenSchemaView.as_view(), name="schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    # API'S
    path("admin/", admin.site.urls),
    path("accounts/", include("accounts.urls")),
    path("dashboard/", include("dashboard.urls")),
    path("admin-dashboard/", include("admin_dashboard.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
