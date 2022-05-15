from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


from .models import Product
from .serializers import UserSerializer


class UserView(APIView):
    """User view"""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """return user data"""

        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class SimpleAPIView(APIView):
    """test view"""

    def get(self, request):
        # products = Product.objects.order_by("name").all()
        # context = {"products": products}
        context = {"text": "Hellow"}
        return Response(context, status=status.HTTP_200_OK)
