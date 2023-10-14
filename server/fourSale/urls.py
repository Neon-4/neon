"""
URL configuration for fourSale project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_swagger.views import get_swagger_view
from storeApp import views as app_views
from orderApp import views as app_views
from themesApp import views as app_views
from customerApp import views as app_views

schema_view = get_schema_view(
    openapi.Info(
        title="Neon4 - 4Sale API",
        default_version='v1',
        description="Welcome to the world of Neon4",
        terms_of_service="https://www.neon4.com",
        contact=openapi.Contact(email="neon4@neon4.com"),
        license=openapi.License(name="Awesome IP"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    re_path(r'^doc(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'), 
    path('admin/', admin.site.urls),
    path('', include('themesApp.urls')),
    path('api/store/', include('storeApp.urls')),
    path('api/customer', include('customerApp.urls')),
    path('api/order/', include('orderApp.urls')),
]
