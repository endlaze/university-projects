from rest_framework import viewsets, response
from rest_framework.decorators import action
from .models import EmployeeType, Employee, Client, Address
from .serializers import EmployeeTypeSerializer, EmployeeSerializer, ClientSerializer, AddressSerializer

class EmployeeTypeViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeTypeSerializer
    queryset = EmployeeType.objects.all()


class EmployeeViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()


class ClientViewSet(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()
    
    @action(detail=False, methods=['post'])
    def login(self, request):
        user = Client.objects.get(username = request.data.pop('username'))
        if user.check_password(request.data.pop('password')):
            serializer = ClientSerializer(user)
            return response.Response(serializer.data)
        else:
            return response.Response({})

class AuthViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def login(self, request):
        login_type = request.data.pop('login_type')
        user = 'client'
        if login_type == 'client':
           user = Client.objects.get(username = request.data.pop('username'))
           if user.check_password(request.data.pop('password')):
                serializer = ClientSerializer(user)
                return response.Response(serializer.data)
        elif login_type == 'employee':
            user = Employee.objects.get(username = request.data.pop('username') , emp_type__id=1)
            if user.check_password(request.data.pop('password')):
                serializer = EmployeeSerializer(user)
                return response.Response(serializer.data)
        elif login_type == 'manager':
            user = Employee.objects.get(username = request.data.pop('username'), emp_type__id= 2)
            if user.check_password(request.data.pop('password')):
                serializer = EmployeeSerializer(user)
                return response.Response(serializer.data)

        return response.Response({})


class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    queryset = Address.objects.all()
