from rest_framework import serializers
from django.utils import timezone
from .models import OrderProduct, Order, Delivery, Review, OnlineOrder, OnSiteOrder
from products.models import Product
from products.serializers import ProductSerializer
import logging


class DeliverySerializer(serializers.ModelSerializer):
    status_caption = serializers.CharField(
        source='get_status_display', read_only=True)

    class Meta:
        model = Delivery
        fields = ['order', 'delivery_date', 'status', 'status_caption']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['order', 'product', 'rating', 'comment']


class OrderProductSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    product = ProductSerializer(read_only=True)
    product_obj = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        write_only=True
    )
    backorder_quantity = serializers.ReadOnlyField()

    class Meta:
        model = OrderProduct
        fields = ['id', 'product', 'product_obj',
                  'backorder_quantity', 'quantity', 'discount', 'selling_price']


class OnlineOrderSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    date = serializers.DateTimeField(read_only=True)
    ord_products = OrderProductSerializer(many=True)
    delivery = DeliverySerializer(read_only=True)

    class Meta:
        model = OnlineOrder
        fields = ['id', 'date', 'delivered', 'ord_products', 'client', 'final_selling', 'delivery']

    def create(self, validated_data):

        ord_products = validated_data.pop('ord_products')

        order = OnlineOrder.objects.create(
            date=timezone.now(),
            delivered=validated_data.pop('delivered'),
            client=validated_data.pop('client'),
            final_selling=validated_data.pop('final_selling')
        )

        for prod in ord_products:
            self.createOrderProduct(order, **prod)

        return order

    def createOrderProduct(self, order, product_obj, quantity, discount, selling_price):
        rem_prod_quant = product_obj.available_quantity - quantity

        product_obj.available_quantity = 0 if (
            rem_prod_quant <= 0
        ) else rem_prod_quant

        product_obj.save()

        backord_quant = 0 if (rem_prod_quant >= 0) else rem_prod_quant

        new_order_product = OrderProduct.objects.create(
            order=order,
            product=product_obj,
            quantity=quantity,
            backorder_quantity=backord_quant,
            discount=discount,
            selling_price=selling_price
        )

        return new_order_product


class OnSiteOrderSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    date = serializers.DateTimeField(read_only=True)
    ord_products = OrderProductSerializer(many=True)

    class Meta:
        model = OnSiteOrder
        fields = ['id', 'date', 'delivered', 'ord_products','employee', 'client_id', 'client_email', 'branch', 'final_selling']

    def create(self, validated_data):

        ord_products = validated_data.pop('ord_products')

        order = OnSiteOrder.objects.create(
            date=timezone.now(),
            delivered=validated_data.pop('delivered'),
            employee=validated_data.pop('employee'),
            client_email=validated_data.pop('client_email'),
            client_id=validated_data.pop('client_id'),
            branch=validated_data.pop('branch'),
            final_selling=validated_data.pop('final_selling')
        )

        for prod in ord_products:
            self.createOrderProduct(order, **prod)

        return order

    def createOrderProduct(self, order, product_obj, quantity, discount, selling_price):
        rem_prod_quant = product_obj.available_quantity - quantity

        product_obj.available_quantity = 0 if (
            rem_prod_quant <= 0
        ) else rem_prod_quant

        product_obj.save()

        backord_quant = 0 if (rem_prod_quant >= 0) else rem_prod_quant

        new_order_product = OrderProduct.objects.create(
            order=order,
            product=product_obj,
            quantity=quantity,
            backorder_quantity=backord_quant,
            discount=discount,
            selling_price=selling_price
        )

        return new_order_product
