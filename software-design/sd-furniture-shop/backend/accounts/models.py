from django.db import models
from django.contrib.auth.models import User
from locations.models import State, Workplace


class EmployeeType(models.Model):
    desc = models.CharField(max_length=50)
    min_salary = models.DecimalField(max_digits=19, decimal_places=2)
    max_salary = models.DecimalField(max_digits=19, decimal_places=2)

class Commission(models.Model):
    emp_type = models.ForeignKey(EmployeeType, related_name='commission', on_delete=models.CASCADE)
    percentage = models.FloatField()


class Employee(User):
    emp_type = models.ForeignKey(EmployeeType, on_delete=models.CASCADE)
    salary = models.DecimalField(max_digits=19, decimal_places=2)
    workplace = models.ForeignKey(Workplace, on_delete=models.CASCADE)


class Client(User):
    birthdate = models.DateField()


class Address(models.Model):
    client = models.ForeignKey(
        Client, on_delete=models.CASCADE,
        related_name='addresses'
    )
    state = models.ForeignKey(State, on_delete=models.CASCADE)
    zip_code = models.IntegerField()
    address_line = models.CharField(max_length=100)
