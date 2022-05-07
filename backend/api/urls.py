from django.urls import path


from .views import SimpleAPIView

urlpatterns = [
    path("test", SimpleAPIView.as_view(), name="test_api_view"),
    # path("", views.index, name="index"),
    # path("add_count/<int:id>/", views.add_count, name="add_count"),
    # path("sales/<int:id>/", views.sales, name="sales"),
]
