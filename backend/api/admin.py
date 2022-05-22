from django.contrib import admin

from .models import Product, Transaction, Transactions

# add models for the admin site
admin.site.register(Product)
admin.site.register(
    Transaction,
)
admin.site.register(Transactions)
