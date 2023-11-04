from django.http import JsonResponse, HttpResponse
from django.core.serializers import serialize
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from orderApp.models import *
from storeApp.models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from storeApp.serializers import *



@api_view(['GET'])
def apiGetOrders(request):
    try:
        orders = Order.objects.all().values()
        serializer = OrderItemSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        data = []
        return Response(data, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def apiGetOrderItems(request):
    orderItems = list(OrderItems.objects.all().values())
    return JsonResponse(orderItems, content_type="application.json")

@api_view(['GET'])
def apiGetInvoices(request):
    invoices = list(Invoice.objects.all().values())
    return JsonResponse(invoices, content_type="application.json")