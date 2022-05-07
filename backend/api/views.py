from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Product


class SimpleAPIView(APIView):
    def get(self, request):
        # products = Product.objects.order_by("name").all()
        # context = {"products": products}
        context = {"text": "Hellow"}
        return Response(context, status=status.HTTP_200_OK)
