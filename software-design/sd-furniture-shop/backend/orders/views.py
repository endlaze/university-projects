from rest_framework import viewsets
from .models import OnlineOrder, OnSiteOrder, Delivery, Review
from .serializers import OnlineOrderSerializer, OnSiteOrderSerializer, DeliverySerializer, ReviewSerializer


class OnlineOrderViewSet(viewsets.ModelViewSet):
    serializer_class = OnlineOrderSerializer
    queryset = OnlineOrder.objects.all()

class OnSiteOrderViewSet(viewsets.ModelViewSet):
    serializer_class = OnSiteOrderSerializer
    queryset = OnSiteOrder.objects.all()


class DeliveryViewSet(viewsets.ModelViewSet):
    serializer_class = DeliverySerializer
    queryset = Delivery.objects.all()


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()
