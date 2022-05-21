from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("api.urls")),
    path("accounts/", include("django.contrib.auth.urls")),
    # re_path(".*", TemplateView.as_view(template_name="index.html")),
]

# media
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
