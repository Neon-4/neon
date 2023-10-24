from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.core.serializers import serialize
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from storeApp.models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *


@api_view(['GET'])
def apiGetAllCategories(request):
    try:
        categories = Category.objects.all().values()
        serializer = CategorySerializer(categories,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Category.DoesNotExist:
        data = []
        return Response(data, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def apiGetAllProducts(request):
    try:
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        data = []
        return Response(data, status=status.HTTP_404_NOT_FOUND)
    # try:
    #     products = list(Product.objects.all().values())
    #     return JsonResponse(products, status=status.HTTP_200_OK, safe=False, content_type="application.json")
    # except Product.DoesNotExist:
    #     data = []
    #     return Response(data, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def apiGetAllProdByCat(request, category_id):
    try:
        products = Product.objects.filter(category_id=category_id)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        data = []
        return Response(data, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def apiGetOneProd(request, prod_id):
    try:
        product = Product.objects.get(id=prod_id)
        product_serializer = ProductSerializer(product)
        
        prodImages = ProductImages.objects.filter(prod_id=prod_id)
        prodImages_serializer = ProductImagesSerializer(prodImages, many=True)
        
        response_data = {
            'product': product_serializer.data,
            'productImages': prodImages_serializer.data
        }
        
        return Response(response_data, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        data = []
        return Response(data, status=status.HTTP_404_NOT_FOUND)