from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import *


@receiver(post_save, sender=Customer)
def createCustomerProfile(sender, instance, created, **kwargs):
    if created:
        CustomerProfile.objects.create(customer=instance)

@receiver(post_save, sender=Customer)
def saveCustomerProfile(sender, instance, **kwargs):
    instance.customer_profile.save()