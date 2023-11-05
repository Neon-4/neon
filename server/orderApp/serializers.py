from rest_framework import serializers
from .models import *
from customerApp.serializers import *
from customerApp.models import *


class OrderSerializer(serializers.ModelSerializer):
    # customer = CustomerSerializer()
    # customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all(), source='customer_id')
    class Meta:
        model = Order
        fields = '__all__'

class OrderCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields = '__all__'

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'