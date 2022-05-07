from django.contrib import admin

from .models import Product

# add Product as Model for the admin site
admin.site.register(Product)
