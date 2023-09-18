from .views import OnlineOrderViewSet, OnSiteOrderViewSet, ReviewViewSet, DeliveryViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('online', OnlineOrderViewSet, 'online')
router.register('onsite', OnSiteOrderViewSet, 'onsite')
router.register('review', ReviewViewSet, 'review')
router.register('delivery', DeliveryViewSet, 'delivery')

urlpatterns = router.urls
