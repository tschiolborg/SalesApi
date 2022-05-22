# Generated by Django 4.0.3 on 2022-03-26 20:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Transaction",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("amount", models.PositiveIntegerField(default=0)),
                ("total_price", models.DecimalField(decimal_places=2, max_digits=12)),
                (
                    "product",
                    models.ForeignKey(
                        default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to="api.product"
                    ),
                ),
            ],
        ),
    ]
