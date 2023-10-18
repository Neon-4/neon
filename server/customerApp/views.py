from customerApp.models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
import bcrypt

@api_view(['GET'])
def apiGetAllCustomers(request):
    try:
        customers = Customer.objects.all().values()
        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Customer.DoesNotExist:
        data = []
        return Response(data, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['POST'])
def apiCustomerRegistration(request):
    if request.method == 'POST':
        print("going into reg request.data", request.data)
        errors = Customer.objects.validate(request.data)
        if errors:
            print("in reg found errors")
            for err in errors.values(request.data):
                messages = messages.error(request, err)
                print('reg errors for looo', messages)
            return Response(messages, status=status.HTTP_404_NOT_FOUND)
        hashedPw = bcrypt.hashpw(request.data['password'].encode(), bcrypt.gensalt()).decode()
        request.data['password'] = hashedPw
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)