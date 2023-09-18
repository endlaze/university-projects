from .views import CountryViewSet, WorkplaceViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('country', CountryViewSet, 'country')
router.register('workplace', WorkplaceViewSet, 'workplace')
urlpatterns = router.urls
