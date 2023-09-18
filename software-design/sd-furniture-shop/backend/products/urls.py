from .views import MaterialViewSet, FurnitureTypeViewSet, FurnitureViewSet, FurnitureComboViewSet, PromotionViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('material', MaterialViewSet, 'material')
router.register('furniture_type', FurnitureTypeViewSet, 'furniture_type')
router.register('furniture', FurnitureViewSet, 'furniture')
router.register('furniture_combo', FurnitureComboViewSet, 'furniture_combo')
router.register('promotion', PromotionViewSet, 'promotion')

urlpatterns = router.urls
