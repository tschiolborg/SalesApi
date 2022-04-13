from decimal import Decimal
from datetime import date

from django.http import HttpResponse
from django.shortcuts import redirect, render

from .models import Product, Transaction


def index(request):
    all_products = Product.objects.order_by("name").all()

    transactiions_today = Transaction.objects.all().filter(date__gte=date.today())

    context = {
        "all_products": all_products,
        "transactiions_today": transactiions_today,
    }
    return render(request, "sales_api/sales_api.html", context)


def add_count(request, id):
    if request.method == "POST":
        try:
            Product.objects.filter(id=id)[0].increase_count(int(request.POST.get("count")))
            return redirect("/sales_api/")
        except:
            return HttpResponse(f"Error: Could not update product")
    return HttpResponse("Error: no post")


def sales(request, id):
    if request.method == "POST":
        try:
            product = Product.objects.filter(id=id)[0]
            price = product.price
            count = int(request.POST.get("count"))
            was_changed = product.decrease_count(count)
            if was_changed:
                Transaction.objects.create(
                    product=product,
                    amount=count,
                    total_price=count * price,
                )
                return redirect("/sales_api/")
            else:
                return HttpResponse(
                    f"Error: Cannot sell {count} items, when there only is {product.count} available."
                )
        except Exception as e:
            print(e)
            return HttpResponse(f"Error: Could not update product")
    return HttpResponse("Error: no post")
