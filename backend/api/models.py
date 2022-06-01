from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    """A product that we are selling"""

    name = models.CharField(max_length=256, unique=True)
    count = models.PositiveIntegerField(default=0)
    image = models.FileField(upload_to="images/", default="images/no_photo.jpeg")
    price = models.DecimalField(decimal_places=2, max_digits=12)  # add min value

    def increase_count(self, amount: int) -> bool:
        self.count += amount
        self.save()
        return True

    def decrease_count(self, amount: int) -> bool:
        if amount <= self.count:
            self.count -= amount
            self.save()
            return True
        else:
            return False

    def __str__(self):
        return str(self.name) if self.name else "<no-name>"


class Transaction(models.Model):
    """A transaction of a product"""

    total_price = models.DecimalField(decimal_places=2, max_digits=12)
    amount_payed = models.DecimalField(decimal_places=2, max_digits=12)
    date = models.DateTimeField("date of transaction", auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, default=None)
    name = models.CharField(max_length=256, null=True)

    @property
    def pay_missing(self) -> bool:
        return self.total_price > self.amount_payed

    def __str__(self):
        username = str(self.user.username) if self.user else "<deleted_user>"
        return self.name + " at " + str(self.date)[0:16] + " by " + username


class Transactions(models.Model):
    "for many-many : transactions : product"

    transaction = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True, default=None)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, default=None)
    count = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = "Transactions list"

    def __str__(self):
        productname = self.product.name if self.product else "<deleted-product>"
        transaction = self.transaction if self.transaction else "<deleted-transaction>"
        return productname + " : " + str(transaction)



class Table(models.Model):
    "a table with a transaction"

    name = models.CharField(max_length=256, default="Tableau")
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE)
    value = models.IntegerField(default=0)

    @classmethod
    def create(cls, transaction):
        table = cls(transaction=transaction)
        top_list = Table.objects.order_by('-value')
        table.value = top_list[0].value + 1 if len(top_list) > 0 else 1
        table.name += str(table.value)
        table.save()
        return table

    def rename(self, name):
        self.value = 0
        self.name = name
        self.save()


    def __str__(self):
        return self.name

