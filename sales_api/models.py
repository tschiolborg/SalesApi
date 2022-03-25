from django.db import models

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256, unique=True)
    count = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to='images/', default='images/no_photo.jpeg')
    price = models.DecimalField(decimal_places=2, max_digits=12)






