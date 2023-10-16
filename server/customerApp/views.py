from customerApp.models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *

@api_view(['GET'])
def apiGetAllCustomers(request):
    try:
        customers = Customer.objects.all().values()
        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Customer.DoesNotExist:
        data = []
        return Response(data, status=status.HTTP_404_NOT_FOUND)