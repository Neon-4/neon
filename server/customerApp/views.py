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
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)  # Return validation errors

        print('passed validate')
        hashedPw = bcrypt.hashpw(request.data['password'].encode(), bcrypt.gensalt()).decode()
        request.data['password'] = hashedPw
        print('hashed pass', hashedPw)
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            print('in serializer valid', serializer.validated_data)
            serializer.save()
            customer = Customer.objects.get(email=request.data['email'])
            profile, created = Profile.objects.get_or_create(user=customer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def apiCustomerLogin(request):
    if request.method == 'POST':
        customer = Customer.objects.filter(email = request.data['email'])
        if customer:
            custLogin = customer[0]
            if bcrypt.checkpw(request.data['password'].encode(), custLogin.password.encode()):
                req = {
                    'response': f"{custLogin.firstName} is now logged in"
                }
                return Response(req, status=status.HTTP_202_ACCEPTED)
            req = {
                'response': "Invalid Credentials"
            }
            return Response(req, status=status.HTTP_401_UNAUTHORIZED)
        req = {
            'response': "Email not in system"
        }
        return Response(req, status=status.HTTP_401_UNAUTHORIZED)