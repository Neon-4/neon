from rest_framework import serializers
from .models import *

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    image_name = serializers.SerializerMethodField()

    def get_image_name(self, obj):
        if obj.image:
            return f"https://ecom-back.thehive-services.com/media/{obj.image}"

    class Meta:
        model = Profile
        fields = '__all__'

class CustomerWithProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'
    
    # Add custom fields from the Profile model
    image = serializers.ImageField(source='profile.image')
    address01 = serializers.CharField(source='profile.address01')
    address02 = serializers.CharField(source='profile.address02')
    city = serializers.CharField(source='profile.city')
    state = serializers.CharField(source='profile.state')
    zip = serializers.CharField(source='profile.zip')
    phone = serializers.CharField(source='profile.phone')
    age = serializers.DateField(source='profile.age')