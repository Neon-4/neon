from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Base Route
    path('', views.apiGetAllCustomers),
    path('fullCustomerInfo/', views.apiGetFullAllCustomers),
    path('registration/', views.apiCustomerRegistration),
    path('login/', views.apiCustomerLogin),
    path('updateProfile/<int:customer_id>/', views.apiUpdateProfile),
    path('testEmail/<int:customer_id>/', views.testEmailSending),
    path('fullCustomer/<int:customer_id>/view/', views.apiGetOneFullCustomer),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)