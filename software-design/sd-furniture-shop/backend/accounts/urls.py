from .views import EmployeeTypeViewSet, EmployeeViewSet, ClientViewSet, AddressViewSet, AuthViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('employee_type', EmployeeTypeViewSet, 'employee_type')
router.register('employee', EmployeeViewSet, 'employee')
router.register('client', ClientViewSet, 'client')
router.register('address', AddressViewSet, 'client-address')
router.register('auth', AuthViewSet, 'auth')

urlpatterns = router.urls
