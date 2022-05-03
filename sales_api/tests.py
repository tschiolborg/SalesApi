from django.test import TestCase

from .models import Product, Transaction


class ProductTest(TestCase):
    """Test of Product model"""

    @classmethod
    def setUpTestData(cls):
        Product.objects.create(name="A", price=0)

    def tearDown(self):
        # reset count
        Product.objects.get(id=1).count = 0

    def test_name(self):
        product = Product.objects.get(id=1)
        # label
        field_label = product._meta.get_field("name").verbose_name
        self.assertEqual(field_label, "name")
        # max length
        max_length = product._meta.get_field("name").max_length
        self.assertEqual(max_length, 256)

    def test_count(self):
        product = Product.objects.get(id=1)
        # label
        field_label = product._meta.get_field("count").verbose_name
        self.assertEqual(field_label, "count")

    def test_image(self):
        product = Product.objects.get(id=1)
        # label
        field_label = product._meta.get_field("image").verbose_name
        self.assertEqual(field_label, "image")
        # upload to
        upload_to = product._meta.get_field("image").upload_to
        self.assertEqual(upload_to, "images/")

    def test_price(self):
        product = Product.objects.get(id=1)
        # label
        field_label = product._meta.get_field("price").verbose_name
        self.assertEqual(field_label, "price")
        # decimal places
        decimal_places = product._meta.get_field("price").decimal_places
        self.assertEqual(decimal_places, 2)
        # max digists
        max_digits = product._meta.get_field("price").max_digits
        self.assertEqual(max_digits, 12)

    def test_object_str(self):
        product = Product.objects.get(id=1)
        expected = f"{product.name}"
        self.assertEqual(str(product), expected)

    def test_increase_count(self):
        product = Product.objects.get(id=1)
        name = product.name
        image = product.image
        price = product.price

        # increase
        self.assertEqual(product.count, 0)
        product.increase_count(1)
        self.assertEqual(product.count, 1)
        product.increase_count(10)
        self.assertEqual(product.count, 11)

        # did not change other fields
        self.assertEqual(product.name, name)
        self.assertEqual(product.image, image)
        self.assertEqual(product.price, price)

    def test_decrease_count(self):
        product = Product.objects.get(id=1)
        name = product.name
        image = product.image
        price = product.price

        # no decrease that results in < 0
        self.assertEqual(product.count, 0)
        product.decrease_count(1)
        self.assertEqual(product.count, 0)

        # decrease
        product.increase_count(12)
        product.decrease_count(1)
        self.assertEqual(product.count, 11)
        product.decrease_count(10)
        self.assertEqual(product.count, 1)

        # check derease 1 with 2 results in no change
        product.decrease_count(2)
        self.assertEqual(product.count, 1)

        # did not change other fields
        self.assertEqual(product.name, name)
        self.assertEqual(product.image, image)
        self.assertEqual(product.price, price)


# todo: Transaction
