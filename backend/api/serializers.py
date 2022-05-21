from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User

from .models import Product

User = get_user_model()


class ProductSerializer(serializers.ModelSerializer):
    """Complex data to simple datatypes that can be rendered into json etc."""

    class Meta:
        model = Product
        fields = ('id', 'name', 'count', 'price', 'image')


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User"""

    class Meta:
        model = User
        exclude = ("password",)
