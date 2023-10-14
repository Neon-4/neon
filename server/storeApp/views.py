from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.core.serializers import serialize
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from storeApp.models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def apiGetCategory(request):
    categories = list(Category.objects.all().values())
    return JsonResponse(categories, safe=False, content_type="application.json")

@api_view(['GET'])
def apiGetProduct(request):
    products = list(Product.objects.all().values())
    return JsonResponse(products, safe=False, content_type="application.json")

@api_view(['GET'])
def apiGetProdByCat(request, category_id):
    prodByCat = list(Product.objects.filter(category_id=category_id))
    return JsonResponse(prodByCat, safe=False, content_type="application.json")

@api_view(['GET'])
def apiGetOneProd(request, prod_id):
    product = Product.objects.get(id=prod_id)
    prodImages = ProductImages.objects.filter(prod_id=prod_id)
    data = [product, prodImages]
    return JsonResponse(data, safe=False, content_type="application.json")

@api_view(['GET'])
def apiGetProdImages(request):
    prodImages = list(ProductImages.objects.all().values())
    return JsonResponse(prodImages, safe=False, content_type="application.json")