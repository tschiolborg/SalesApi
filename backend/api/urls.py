from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .viewsets import ProductViewSet
from .views import SimpleAPIView, UserView

router = DefaultRouter()
router.register(r"products", ProductViewSet, "product")

urlpatterns = [
    path("test", SimpleAPIView.as_view(), name="test_api_view"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("me/", UserView.as_view(), name="me"),
    path("", include(router.urls)),
]


urlpatterns += router.urls
