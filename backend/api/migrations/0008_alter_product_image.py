# Generated by Django 3.2.5 on 2022-05-24 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.FileField(default='images/no_photo.jpeg', upload_to='images/'),
        ),
    ]
