# from django.conf import settings
# from django.http import JsonResponse, HttpResponse
# from django.core.serializers import serialize
# from django.shortcuts import render, redirect
# from django.contrib.auth.decorators import login_required
# from django.contrib import messages
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
# import os
# import json

@api_view(['GET'])
def apiLastStoreInfo(request):
    try:
        storeInfo = StoreInfo.objects.order_by('-id').last()
        if storeInfo:
            serializer = StoreInfoSerializer(storeInfo)
            return Response(serializer.data)
        return Response(status=404)
    except StoreInfo.DoesNotExist:
        return Response(status=404)

@api_view(['POST'])
def apiAddStoreInfo(request):
    if request.method == 'POST':
        serializer = StoreInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
