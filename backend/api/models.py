from django.db import models


class Product(models.Model):
    """A product that we are selling"""

    name = models.CharField(max_length=256, unique=True)
    count = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to="images/", default="images/no_photo.jpeg")
    price = models.DecimalField(decimal_places=2, max_digits=12)  # add min value

    def increase_count(self, amount):
        self.count += amount
        self.save()
        return True

    def decrease_count(self, amount):
        if amount <= self.count:
            self.count -= amount
            self.save()
            return True
        else:
            return False

    def __str__(self):
        return str(self.name)


class Transaction(models.Model):
    """A transaction of a product"""

    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, default=None)
    amount = models.PositiveIntegerField(default=0)
    total_price = models.DecimalField(decimal_places=2, max_digits=12)
    date = models.DateTimeField("date of transaction", auto_now_add=True)

    # add user, who did the transaction