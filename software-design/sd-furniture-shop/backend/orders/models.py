from django.db import models
from products.models import Product
from accounts.models import Client, Employee
from locations.models import Workplace


class Order(models.Model):
    date = models.DateTimeField(editable=False)
    delivered = models.BooleanField()
    final_selling = models.DecimalField(max_digits=19, decimal_places=2)


class OnlineOrder(Order):
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name='orders'
    )


class OnSiteOrder(Order):
    client_id = models.TextField()
    client_email = models.TextField()
    client_name = models.TextField()
    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name='orders'
    )
    branch = models.ForeignKey(
        Workplace, on_delete=models.CASCADE, related_name='brach_orders')


class OrderProduct (models.Model):
    order = models.ForeignKey(
        Order,
        related_name='ord_products',
        on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )
    quantity = models.IntegerField()
    backorder_quantity = models.IntegerField()
    discount = models.FloatField()
    selling_price = models.DecimalField(max_digits=19, decimal_places=2)


class Delivery(models.Model):
    order = models.OneToOneField(
        Order,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='delivery'
    )

    delivery_date = models.DateField()

    ORDER_STATUSES = (
        (1, 'En proceso'),
        (2, 'En camino'),
        (3, 'Entregada')
    )

    status = models.IntegerField(choices=ORDER_STATUSES)


class Review(models.Model):
    order = models.ForeignKey(
        Order,
        related_name='reviews',
        on_delete=models.CASCADE
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='reviews'
    )

    rating = models.FloatField()
    comment = models.TextField()
