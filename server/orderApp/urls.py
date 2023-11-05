from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.apiGetOrders),
    path('orderItems/', views.apiGetOrderItems),
    path('createOrder/', views.apiCreateOrder),
    # path('invoices/', views.apiGetInvoices)
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)