from django.urls import path


from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("add_count/<int:id>/", views.add_count, name="add_count"),
    path("sales/<int:id>/", views.sales, name="sales"),
]
