# serializers.py
from rest_framework import serializers
from .models import *

class StoreInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreInfo
        fields = '__all__'

class StoreColorsSerializer(serializers.ModelSerializer):
    class Meta:
        model =  StoreColors
        fields = '__all__'

class FullStoreInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreInfo
        fields = '__all__'

    headerBG = serializers.CharField(source='storeColors.headerBG')