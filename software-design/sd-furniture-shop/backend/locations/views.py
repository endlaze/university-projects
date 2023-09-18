
from rest_framework import viewsets
from .models import Country, Workplace, State
from .serializers import CountrySerializer, WorkplaceSerializer


class CountryViewSet(viewsets.ModelViewSet):
    serializer_class = CountrySerializer
    queryset = Country.objects.all()


class WorkplaceViewSet(viewsets.ModelViewSet):
    serializer_class = WorkplaceSerializer
    queryset = Workplace.objects.all()
