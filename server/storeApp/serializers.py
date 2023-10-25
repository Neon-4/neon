from rest_framework import serializers
from .models import *


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):

    image_name = serializers.SerializerMethodField()

    def get_image_name(self, obj):
        if obj.image:
            return f"https://ecomm-back.thehive-services.com/media/{obj.image}"


    class Meta:
        model = Product
        fields = '__all__'

class ProductImagesSerializer(serializers.ModelSerializer):
    image_name = serializers.SerializerMethodField()

    def get_image_name(self, obj):
        if obj.image:
            return f"https://ecomm-back.thehive-services.com/media/{obj.image}"

    class Meta:
        model = ProductImages
        fields = '__all__'