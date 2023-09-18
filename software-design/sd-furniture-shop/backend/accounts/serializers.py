

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import EmployeeType, Employee, Client, Address, Commission
from locations.serializers import WorkplaceSerializer, StateSerializer
from locations.models import Workplace, State


class UserSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name',
                  'last_name', 'email', 'password']

class CommissionSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Commission
        fields = ['id', 'percentage' ]

class EmployeeTypeSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    commission = CommissionSerializer(many=True)
    #percentage = serializers.FloatField(source='commission.percentage')
    #tracks = serializers.RelatedField(many=True)


    class Meta:
        model = EmployeeType
        fields = ['id', 'desc', 'min_salary', 'max_salary', 'commission'] 

    
    def create(self, validated_data):
        commission_data=validated_data.pop('commission')[0]
        desc=validated_data.pop('desc')
        max_salary=validated_data.pop('max_salary')
        min_salary=validated_data.pop('min_salary')

        employeeType = EmployeeType.objects.create(desc=desc, min_salary=min_salary, max_salary=max_salary)
        if commission_data['percentage'] != 0:
            Commission.objects.create(emp_type=employeeType, percentage=commission_data['percentage'] )

        return employeeType




class EmployeeSerializer(UserSerializer):
    emp_type = EmployeeTypeSerializer(read_only=True)
    emp_type_id = serializers.PrimaryKeyRelatedField(
        queryset=EmployeeType.objects.all(),
        write_only=True
    )
    workplace = WorkplaceSerializer(read_only=True)
    workplace_id = serializers.PrimaryKeyRelatedField(
        queryset=Workplace.objects.all(),
        write_only=True
    )

    class Meta:
        model = Employee
        fields = UserSerializer.Meta.fields + \
            ['salary', 'emp_type', 'emp_type_id', 'workplace', 'workplace_id']

    def create(self, validated_data):
        employee = Employee.objects.create(
            emp_type=validated_data.pop('emp_type_id'),
            workplace=validated_data.pop('workplace_id'),
            **validated_data
        )
        employee.set_password(validated_data.pop('password'))
        employee.save()

        return employee


class AddressSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    state = StateSerializer(read_only=True)
    state_id = serializers.PrimaryKeyRelatedField(
        queryset=State.objects.all(),
        write_only=True
    )
    client_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Address
        fields = ['id', 'state', 'state_id',
                  'zip_code', 'address_line', 'client_id']

    def create(self, validated_data):
        client = Client.objects.get(id=validated_data.pop('client_id'))
        address = Address.objects.create(
            client=client,
            state=validated_data.pop('state_id'),
            **validated_data
        )
        return address


class ClientSerializer(UserSerializer):
    id = serializers.ReadOnlyField()
    addresses = AddressSerializer(many=True, read_only=True)

    def create(self, validated_data):
        client = Client.objects.create(
            **validated_data
        )
        client.set_password(validated_data.pop('password'))
        client.save()

        return client

    class Meta:
        model = Client
        fields = UserSerializer.Meta.fields + ['birthdate', 'addresses']
