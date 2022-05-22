from datetime import date

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

from .models import Transactions, Transaction, Product
from .serializers import UserSerializer


class UserView(APIView):
    """User view"""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """return user data"""

        serializer = UserSerializer(request.user)
        return Response(serializer.data)


@api_view(["GET", "POST"])
def transactions_view(request):
    """Get transactions today or post a new"""

    if request.method == "GET":
        transactions = Transaction.objects.filter(date__gt=date.today()).order_by("-date")

        context_list = []

        for transaction in transactions:
            list_of_products = Transactions.objects.all().filter(transaction=transaction)
            c = {}
            c["id"] = transaction.id
            c["name"] = transaction.name
            c["total_price"] = transaction.total_price
            c["amount_payed"] = transaction.amount_payed
            c["pay_missing"] = transaction.pay_missing
            c["date"] = str(transaction.date)[:16]
            c["username"] = transaction.user.username
            c["products"] = [
                {"name": product.product.name if product.product is not None else "<deleted>", "count": product.count}
                for product in list_of_products
            ]
            context_list += [c]

        return Response(context_list, status=status.HTTP_200_OK)

    elif request.method == "POST":
        total_price = request.data["total_price"]
        amount_payed = request.data["amount_payed"]
        product_ids = request.data["product_ids"]
        counts = request.data["counts"]
        user_id = request.data["user_id"]
        name = request.data["name"]

        # find user
        user = User.objects.filter(id=user_id)[0]

        transaction = Transaction.objects.create(
            total_price=total_price,
            amount_payed=amount_payed,
            user=user,
            name=name,
        )

        for (product_id, count) in zip(product_ids, counts):
            # find product
            product = Product.objects.filter(id=product_id)[0]

            if not product.decrease_count(count):
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            Transactions.objects.create(transaction=transaction, product=product, count=count)

        return Response(status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_400_BAD_REQUEST)
