from django.http import HttpResponse
from django.shortcuts import render

from .models import Product


def index(request):
    all_products = Product.objects.all()
    context = {
        'all_products': all_products,
    }
    return render(request, 'sales_api/index.html', context)

