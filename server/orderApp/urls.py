from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.apiGetOrders),
    # path('test/', views.apiTestCart),
    path('orderItems/', views.apiGetOrderItems),
    path('createOrder/', views.apiCreateOrder),
    path('addItem/', views.apiAddOrderItems),
    path('updateOrder/', views.apiUpdateOrder)
    # path('invoices/', views.apiGetInvoices)
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)