from .views import ReportViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('all', ReportViewSet, 'all')


urlpatterns = router.urls
