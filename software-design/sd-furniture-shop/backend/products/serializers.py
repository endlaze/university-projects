from rest_framework import serializers
from .models import Material, FurnitureType, Furniture, FurnitureComboItem, FurnitureCombo, Promotion
from locations.models import Workplace
from locations.serializers import WorkplaceSerializer


class ProductSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Furniture
        fields = ['id', 'title', 'description', 'price', 'available_quantity', 'picture']


class MaterialSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Material
        fields = ['id', 'description']


class FurnitureTypeSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = FurnitureType
        fields = ['id', 'description']


class FurnitureSerializer(ProductSerializer):
    furn_type = FurnitureTypeSerializer(read_only=True)
    workshop = WorkplaceSerializer(read_only=True)
    materials = MaterialSerializer(read_only=True, many=True)

    furn_type_id = serializers.PrimaryKeyRelatedField(
        queryset=FurnitureType.objects.all(),
        write_only=True
    )

    workshop_id = serializers.PrimaryKeyRelatedField(
        queryset=Workplace.objects.all(),
        write_only=True
    )

    materials_ids = serializers.PrimaryKeyRelatedField(
        queryset=Material.objects.all(),
        write_only=True,
        many=True
    )

    class Meta:
        model = Furniture
        fields = ProductSerializer.Meta.fields + \
            ['furn_type', 'workshop', 'materials',
                'furn_type_id', 'workshop_id', 'materials_ids']

    def create(self, validated_data):
        furn_type_id = validated_data.pop('furn_type_id')
        workshop_id = validated_data.pop('workshop_id')
        materials_ids = validated_data.pop('materials_ids')

        furniture = Furniture.objects.create(
            furn_type=furn_type_id,
            workshop=workshop_id,
            **validated_data
        )

        furniture.save()
        furniture.materials.add(*materials_ids)
        furniture.save()
        return furniture


class FurnitureComboItemSerializer(serializers.ModelSerializer):
    materials = MaterialSerializer(read_only=True, many=True)
    materials_ids = serializers.PrimaryKeyRelatedField(
        queryset=Material.objects.all(),
        write_only=True,
        many=True
    )

    furn_type = FurnitureTypeSerializer(read_only=True)
    furn_type_id = serializers.PrimaryKeyRelatedField(
        queryset=FurnitureType.objects.all(),
        write_only=True
    )

    class Meta:
        model = FurnitureComboItem
        fields = ['quantity', 'materials', 'materials_ids', 'furn_type',
                  'furn_type_id']


class FurnitureComboSerializer(ProductSerializer):
    id = serializers.ReadOnlyField()
    combo_products = FurnitureComboItemSerializer(many=True)
    workshop = WorkplaceSerializer(read_only=True)

    workshop_id = serializers.PrimaryKeyRelatedField(
        queryset=Workplace.objects.all(),
        write_only=True
    )

    class Meta:
        model = FurnitureCombo
        fields = ProductSerializer.Meta.fields + \
            ['combo_products', 'workshop', 'workshop_id']

    def create(self, validated_data):
        combo_products = validated_data.pop('combo_products')

        furniture_combo = FurnitureCombo.objects.create(
            workshop=validated_data.pop('workshop_id'),
            **validated_data
        )

        for prod in combo_products:
            self.createComboItem(furniture_combo, **prod)

        return furniture_combo

    def createComboItem(self, furn_combo, materials_ids, furn_type_id, quantity):
        new_combo_item = FurnitureComboItem.objects.create(
            furn_combo=furn_combo,
            furn_type=furn_type_id,
            quantity=quantity
        )

        new_combo_item.materials.add(*materials_ids)
        new_combo_item.save()

        return new_combo_item

class PromotionSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Promotion
        fields = ['id', 'final_date', 'discount', 'product']