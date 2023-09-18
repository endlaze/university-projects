from rest_framework import viewsets
from .models import Material, FurnitureType, Furniture, FurnitureCombo, Promotion
from .serializers import MaterialSerializer, FurnitureTypeSerializer, FurnitureSerializer, FurnitureComboSerializer, PromotionSerializer


class MaterialViewSet(viewsets.ModelViewSet):
    serializer_class = MaterialSerializer
    queryset = Material.objects.all()


class FurnitureTypeViewSet(viewsets.ModelViewSet):
    serializer_class = FurnitureTypeSerializer
    queryset = FurnitureType.objects.all()


class FurnitureViewSet(viewsets.ModelViewSet):
    serializer_class = FurnitureSerializer
    queryset = Furniture.objects.all()


class FurnitureComboViewSet(viewsets.ModelViewSet):
    serializer_class = FurnitureComboSerializer
    queryset = FurnitureCombo.objects.all()

class PromotionViewSet(viewsets.ModelViewSet):
    serializer_class = PromotionSerializer
    queryset = Promotion.objects.all()
