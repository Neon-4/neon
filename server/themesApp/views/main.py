from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse, HttpResponse
from django.core.serializers import serialize

status = {
    "API Status": "Running"
}

def themesDash(request):
    return render(request, 'themeDash.html')

def apiBase(request):
    return JsonResponse(status, content_type="application.json")