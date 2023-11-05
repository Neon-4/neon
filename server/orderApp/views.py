from django.http import JsonResponse, HttpResponse, HttpRequest
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
        orders = Order.objects.all()
        print('************the orders', orders)
        serializer = OrderSerializer(orders, many=True)
        print('=============the serializer', serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        data = []
        return Response(data, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def apiCreateOrder(request):
    if request.method == 'POST':
        print('incoming request.data', request.data)
        orderNum = Order.objects.validate()
        request.data['orderNum'] = orderNum
        print('updated request.data', request.data)
        serializer = OrderCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print('saved data', serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def apiTestCart(request):
    if request.method == 'POST':
        print('incoming request.data', request.data)
        print('items list', request.data['theItems']['items'])
        theItems = request.data['theItems']['items']
        itemCount = 0
        orderTotal = 0
        for item in theItems:
            itemTotal = item['price'] * item['quantity']
            itemCount += item['quantity']
            orderTotal += itemTotal
        patchData = {
            'orderNum': request.data['newOrder'],
            'itemCount': itemCount,
            'orderTotal': orderTotal
        }
        return Response(patchData, status=status.HTTP_200_OK)

@api_view(['PATCH'])
def apiUpdateOrder(request):
    try:
        if request.method == 'PATCH':
            order = Order.objects.get(orderNum=request.data['newOrder'])
            aOrder = request.data['newOrder']
            theItems = request.data['theItems']['items']
            itemCount = 0
            orderTotal = 0
            for item in theItems:
                itemTotal = item['price'] * item['quantity']
                itemCount += item['quantity']
                orderTotal += itemTotal
            if not aOrder or not itemCount or not orderTotal:
                return Response({"error": "Missing required data"}, status=status.HTTP_400_BAD_REQUEST)
            patchData = {
                'itemCount': itemCount,
                'orderTotal': orderTotal
            }
            serializer = OrderSerializer(order, data=patchData, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def apiGetOrderItems(request):
    try:
        orderItems = OrderItem.objects.all().values()
        serializer = OrderItemSerializer(orderItems, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except OrderItem.DoesNotExist:
        data = []
        return Response(data, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def apiAddItemToOrder(request):
    if request.method == 'POST':
        theOrder = Order.objects.filter(orderNum=request.data['orderNum']).values()
        print('**** the Order', theOrder[0])
        theNum = request.data['orderNum']
        theCount = int(request.data['quantity'])
        theTotal = int(request.data['total'] )
        if theOrder[0]['itemCount'] == None:
            itemCount = 0
        else:
            itemCount = theOrder[0]['itemCount']
        if theOrder[0]['orderTotal'] == None:
            orderTotal = 0
        else:
            orderTotal = theOrder[0]['orderTotal']
        itemCount = itemCount + theCount
        orderTotal = int(orderTotal) + theTotal
        patchData = {
            "orderNum": theNum,
            "itemCount": itemCount,
            "orderTotal": orderTotal
        }
        request_for_patch = HttpRequest()
        request_for_patch.data = patchData
        print('patch data', patchData, 'reqforpath', request_for_patch.data, request_for_patch)
        patching = apiUpdateOrder(request_for_patch)
        print('patching result',patching)
        if patching.status == 200:
            serializer = OrderItemSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return patching


@api_view(['GET'])
def apiGetInvoices(request):
    invoices = list(Invoice.objects.all().values())
    return JsonResponse(invoices, content_type="application.json")


