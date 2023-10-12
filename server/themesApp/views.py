from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.core.serializers import serialize
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
import os
import json

@api_view(['GET'])
def apiLastStoreInfo(request):
    storeInfo = list(StoreInfo.objects.latest().values())
    return JsonResponse(storeInfo, content_type="application.json")

@api_view(['POST'])
def apiAddStoreInfo(request):
    if request.method == 'POST':
        serializer = StoreInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    




    # storeInfo = StoreInfo.objects.create(
    #     storeName = request.post['storeName'],
    #     storeTagLine = request.post['storeTagLine'],
    #     contactEmail = request.post['contactEmail'],
    #     contactPhone = request.post['contactPhone'],
    #     contactName = request.post['contactName'],
    #     ownerName = request.post['ownerName'],
    #     address01 = request.post['address01'],
    #     address02 = request.post['address02'],
    #     city = request.post['city'],
    #     zip = request.post['zip']
    # )
    # if storeInfo:
    #     message = f"Store Information Recorded"
    # else:
    #     message = f"An Error Ocurred please try again"
    # return JsonResponse(message, content_type="application.json")