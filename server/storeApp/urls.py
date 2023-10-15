from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('categories/', views.apiGetAllCategories),
    path('products/', views.apiGetAllProducts),
    path('product/<int:prod_id>/view/', views.apiGetOneProd),
    path('category/<int:category_id>/products/', views.apiGetAllProdByCat)
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)