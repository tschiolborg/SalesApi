from django.contrib import admin

from .models import Product, Transaction, Transactions, Table

# add models for the admin site
admin.site.register([Product, Transaction, Transactions, Table])
