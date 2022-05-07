from django.http import HttpResponse
from django.shortcuts import redirect, render


def index(request):
    return redirect("/sales_api/")
