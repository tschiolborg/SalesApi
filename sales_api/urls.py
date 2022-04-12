from django.urls import path


from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("config/", views.config, name="config"),
    path("config/create_new_product/", views.create_new_product, name="create_new_product"),
    path("config/delete_product/<int:id>/", views.delete_product, name="delete_product"),
    path("add_count/<int:id>/", views.add_count, name="add_count"),
    path("sales/<int:id>/", views.sales, name="sales"),
]
