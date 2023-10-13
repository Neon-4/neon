from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.core.serializers import serialize
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from userApp.models import *
import os
import json

# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework import viewsets
# from .models import *
# from .serializers import*

from rest_framework.decorators import api_view
from rest_framework.response import Response



apiStatus = {
    "API Status": "Running"
}
@api_view(['GET'])
def apiBase(request):
    return JsonResponse(apiStatus, content_type="application.json")

@api_view(['GET'])
def apiGetUsers(request):
    users = list(User.objects.all().values())
    return JsonResponse(users, content_type="application.json")

@api_view(['GET'])
def adminAuthUsers(request):
    users = list(User.objects.all().values())
    return JsonResponse(users, content_type="application.json")