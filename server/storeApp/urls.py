from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('categories/', views.apiGetCategory),
    path('products/', views.apiGetProduct),
    path('product/<int:prod_id>/view/', views.apiGetOneProd),
    path('category/<int:category_id>/products/', views.apiGetProdByCat)
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)