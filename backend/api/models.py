from datetime import datetime
from django.db import models
from django.contrib.auth.models import User

from PIL import Image


class Product(models.Model):
    """A product that we are selling"""

    name = models.CharField(max_length=256, unique=True)
    count = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to="images/", default="images/no_photo.jpeg")
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

    def save(self):
        super().save()

        img = Image.open(self.image.path)

        if img.height > 300 or img.width > 300:
            new_img = (300, 300)
            img.thumbnail(new_img)
            img.save(self.image.path)

    def __str__(self):
        return str(self.name)


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
        return self.name + " at " + str(self.date)[0:16] + " by " + str(self.user.username)


class Transactions(models.Model):
    "for many-many : transactions : product"

    transaction = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True, default=None)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, default=None)
    count = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = "Transactions list"

    def __str__(self):
        if self.product:
            return self.product.name + " : " + str(self.transaction)
        else:
            return "<deleted> : " + str(self.transaction)
