from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from .serializers import *
from .models import *
# import os
# import json


# Base

@api_view(['GET'])
def apiBase(request):
    try:
        apiStatus = {
            "API Status": "Running"
        }
        return Response(apiStatus, status=status.HTTP_200_OK)
    except:
        apiStatus = {
            "API Status": "Error"
        }
        return Response(apiStatus, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def apiFun(request):
    try:
        apiFun = {
            "EasterEgg Fun": "I am a teapot"
        }
        return Response(apiFun, status=status.HTTP_418_IM_A_TEAPOT)
    except:
        apiStatus = {
            "API Status": "Error"
        }
        return Response(apiStatus, status=status.HTTP_404_NOT_FOUND)


# themes/

@api_view(['GET'])
def fullInfo(request):
    try:
        storeInfo = StoreInfo.objects.order_by('-id').last()
        storeColors = StoreColors.objects.order_by('-id').last()
        if storeInfo and storeColors:
            infoSerializer = StoreInfoSerializer(storeInfo)
            theInfo = Response(infoSerializer.data)
            colorsSerializer = StoreColorsSerializer(StoreColors)
            theColors = Response(colorsSerializer.data) 
            theStore = (theInfo, theColors)
            return theStore
        if not storeInfo and not storeColors:
            return Response(status=404)
    except StoreInfo.DoesNotExist and StoreColors.DoesNotExist:
        return Response(status=404)

@api_view(['POST'])
def addStoreInfo(request):
    if request.method == 'POST':
        serializer = StoreInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def addStoreColors(request):
    if request.method == 'POST':
        serializer = StoreColorsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# api/user/

@api_view(['GET'])
def apiGetUsers(request):
    users = User.objects.all().values()
    return JsonResponse(users, content_type="application.json")