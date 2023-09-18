from .models import Country, State, Workplace
from rest_framework import serializers


class StateSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = State
        fields = ['id', 'name']


class CountrySerializer(serializers.ModelSerializer):
    states = StateSerializer(many=True)

    class Meta:
        model = Country
        fields = ['id', 'iso3', 'name', 'phone_code', 'states']

    def create(self, validated_data):
        states_data = validated_data.pop('states')
        country = Country.objects.create(**validated_data)
        for state_data in states_data:
            State.objects.create(country=country, **state_data)
        return country


class WorkplaceSerializer(serializers.ModelSerializer):
    state = StateSerializer(read_only=True)
    state_id = serializers.PrimaryKeyRelatedField(
        queryset=State.objects.all(),
        write_only=True
    )
    wp_type = serializers.ChoiceField(choices=Workplace.WP_TYPES)

    class Meta:
        model = Workplace
        fields = ['id', 'state', 'wp_type', 'state_id']

    def create(self, validated_data):
        workplace = Workplace.objects.create(
            state=validated_data.pop('state_id'),
            **validated_data
        )

        return workplace
