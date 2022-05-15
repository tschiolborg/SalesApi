from django.db import models
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    """ViewSet for Product as layer for db"""

    # permission_classes = [IsAuthenticated]  # restricting access
    queryset = Product.objects.all().order_by("name")
    serializer_class = ProductSerializer

    def get_queryset(self):
        """enable search for products"""

        qs = super().get_queryset()

        # search after name
        search = self.request.query_params.get("search", None)
        if search:
            qs = qs.filter(models.Q(name__icontains=search))

        return qs
