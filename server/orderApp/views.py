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
from customerApp.models import *
from customerApp.serializers import *



@api_view(['GET'])
def apiGetOrders(request):
    try:
        orders = Order.objects.all().values()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        data = []
        return Response(data, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def apiCreateOrder(request):
    if request.method == 'POST':
        # cust_id = request.data['customer_id']
        # customer = Customer.objects.get(id=cust_id)
        # profile = Profile.objects.get(user_id=cust_id)
        print('incoming request.data', request.data)
        orderNum = Order.objects.validate()
        request.data['orderNum'] = orderNum
        print('updated request.data', request.data)
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        

@api_view(['GET'])
def apiGetOrderItems(request):
    try:
        orderItems = OrderItem.objects.all().values()
        serializer = OrderItemSerializer(orderItems, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except OrderItem.DoesNotExist:
        data = []
        return Response(data, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def apiGetInvoices(request):
    invoices = list(Invoice.objects.all().values())
    return JsonResponse(invoices, content_type="application.json")