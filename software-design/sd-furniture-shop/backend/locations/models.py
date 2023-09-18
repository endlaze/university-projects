from django.db import models


class Country(models.Model):
    iso3 = models.CharField(max_length=3, unique=True)
    name = models.CharField(max_length=50)
    phone_code = models.IntegerField()


class State(models.Model):
    name = models.CharField(max_length=50)
    country = models.ForeignKey(
        Country, related_name='states', on_delete=models.CASCADE)


class Workplace(models.Model):
    state = models.ForeignKey(
        State, related_name='workplaces',
        on_delete=models.CASCADE
    )
    BRANCH_OFFICE = 1
    WORKSHOP = 2
    WP_TYPES = (
        (BRANCH_OFFICE, 'Sucursal'),
        (WORKSHOP, 'Taller')
    )
    wp_type = models.IntegerField(choices=WP_TYPES)
