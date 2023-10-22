from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import *


@receiver(post_save, sender=Customer)
def createProfile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(customer=instance)

@receiver(post_save, sender=Customer)
def saveProfile(sender, instance, **kwargs):
    instance.profile.save()