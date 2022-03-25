from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("create_new_product/", views.create_new_product, name="create_new_product"),
    path("delete_product/<int:id>/", views.delete_product, name="delete_product"),
]
