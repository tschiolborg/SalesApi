from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .viewsets import ProductViewSet
from .views import UserView, transactions_view

router = DefaultRouter()
router.register(r"products", ProductViewSet, "product")

urlpatterns = [
    path("transactions/", transactions_view, name="transactions_view"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("me/", UserView.as_view(), name="me"),
    path("", include(router.urls)),
]


urlpatterns += router.urls
