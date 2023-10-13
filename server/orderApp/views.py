from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.core.serializers import serialize
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from orderApp.models import *
import os
import json

# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework import viewsets
# from .models import *
# from .serializers import*

from rest_framework.decorators import api_view
from rest_framework.response import Response



@api_view(['GET'])
def apiGetOrders(request):
    orders = list(Order.objects.all().values())
    return JsonResponse(orders, content_type="application.json")

@api_view(['GET'])
def apiGetOrderItems(request):
    orderItems = list(OrderItems.objects.all().values())
    return JsonResponse(orderItems, content_type="application.json")

@api_view(['GET'])
def apiGetInvoices(request):
    invoices = list(Invoice.objects.all().values())
    return JsonResponse(invoices, content_type="application.json")