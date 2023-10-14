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