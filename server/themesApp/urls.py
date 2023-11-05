from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

# Base /
# User /api/user/
# Theme /theme

urlpatterns = [
    path('', views.apiBase),
    path('testMe/', views.apiFun),
    path('theme/', views.apiStoreFullInfo),
    path('theme/storeInfo/', views.apiStoreInfo),
    path('theme/storeColors/', views.apiStoreColors),
    path('theme/addStoreInfo/', views.addStoreInfo),
    path('theme/addStoreColors/', views.addStoreColors),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)