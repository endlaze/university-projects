from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('location/', include('locations.urls')),
    path('account/', include('accounts.urls')),
    path('product/', include('products.urls')),
    path('order/', include('orders.urls')),
    path('report/', include('reports.urls')),
]
