from decimal import Decimal

from django.http import HttpResponse
from django.shortcuts import redirect, render

from .models import Product


def index(request):
    all_products = Product.objects.all()
    context = {
        "all_products": all_products,
        "active": "products",
    }
    return render(request, "sales_api/index.html", context)


def create_new_product(request):
    if request.method == "POST":
        name = request.POST.get("name")
        price = request.POST.get("price")
        if name is not None and name != "":
            try:
                price = Decimal(price)
            except:
                return HttpResponse("Error: Cannot read price")

            Product.objects.create(
                name=name,
                price=price,
            )
            return redirect("/sales_api/")
        else:
            return HttpResponse("Error: No name given")
    return HttpResponse("Error: no post")


def delete_product(request, id):
    try:
        Product.objects.filter(id=id).delete()
    except:
        return HttpResponse(f"Error: Could not delete.")
    return redirect("/sales_api/")


def add_count(request, id):
    if request.method == "POST":
        try:
            print(request.POST.get("count"))
            Product.objects.filter(id=id)[0].increase_count(
                int(request.POST.get("count"))
            )
            return redirect("/sales_api/")
        except:
            return HttpResponse(f"Error: Could not update product")
    return HttpResponse("Error: no post")
