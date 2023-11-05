from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.signals import post_save
from customerApp.models import *
from storeApp.models import *
import datetime
import string
import random

statusOfOrder = [
    ('New', 'Newly Placed'),
    ('Pending', 'In discussion between Customer and Owner'),
    ('In Progress', 'Item is being created'),
    ('Order Items Created', 'All items in order have been created'),
    ('Shipped', 'Item has been shipped'),
    ('Delivered','Item has been delivered'),
    ('Rejected','Order was Rejected'),
    ('Returned', 'Order was Returned'),
    ('Archived', 'Order was archived')
]
statusOfPay = [
    ('New', 'New Order payment terms not set yet'),
    ('Paid', 'Order is fully Paid for'),
    ('Payment Plan', 'Order is on a payment plan that in still ongoing'),
    ('Billed', 'Final Price determined and sent to customer'),
    ('Unpaid', 'Order remains unpaid'),
    ('On Hold', 'Order is on hold awaiting terms')
]

def genOrderCode():
    N = 4
    res01 = ''.join(random.choices(string.ascii_letters, k=N))
    res02 = ''.join(random.choices(string.ascii_letters, k=N))
    stamp = datetime.date.today()
    orderCode = f'{stamp.year}-{res01}-{stamp.day}-{res02}-{stamp.month}'
    print(orderCode, stamp, res01, res02)
    return orderCode

class OrderManager(models.Manager):
    def validate(self):
        orderNum = genOrderCode()
        orderCheck = self.filter(orderNum = orderNum)
        if orderCheck:
            orderNum = genOrderCode()
        return orderNum
    
class Order(models.Model):
    orderNum = models.CharField(max_length=255, unique=True)
    customer = models.ForeignKey(Customer, related_name='theCustomer', on_delete=CASCADE)
    itemCount = models.IntegerField(blank=True, null=True, default=0)
    orderTotal = models.CharField(max_length=255, blank=True, null=True, default=0)
    orderStatus = models.CharField(max_length=255, choices=statusOfOrder, default='New')
    paymentStatus = models.CharField(max_length=255, choices=statusOfPay, default='New')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    objects = OrderManager()

    def __str__(self):
        return self.orderNum
        
class OrderItem(models.Model):
    orderNum = models.ForeignKey(Order, related_name='theOrder', on_delete=CASCADE)
    product = models.ForeignKey(Product, related_name='theProd', on_delete=CASCADE)
    quantity = models.IntegerField()
    total = models.CharField(max_length=255)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.orderNum.orderNum} {self.product.name}'
    

class Invoice(models.Model):
    theCustomer = models.ForeignKey(Customer, related_name='custOrder',on_delete=models.CASCADE)
    cart = models.OneToOneField(Order, on_delete=models.CASCADE)
    orderDate = models.DateField(default=datetime.datetime.today)
    pdf = models.FileField(upload_to='invoices')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f'{self.theCustomer.lastName} - {self.cart.orderNum}'