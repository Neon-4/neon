from django.db import models
from django.db.models.deletion import CASCADE

class StoreInfo(models.Model):
    storeName = models.CharField(max_length=255)
    storeTagLine = models.CharField(max_length=255, blank=True, null=True)
    contactEmail = models.CharField(max_length=255)
    contactPhone = models.CharField(max_length=255)
    contactName = models.CharField(max_length=255, blank=True, null=True)
    ownerName = models.CharField(max_length=255)
    address01 = models.CharField(max_length=255, blank=True)
    address02 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    state = models.CharField(max_length=255, blank=True)
    zip = models.CharField(max_length=255, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.storeName


class StoreColors(models.Model):
    headerBG = models.CharField(max_length=255, blank=True, null=True)
    navBG = models.CharField(max_length=255, blank=True, null=True)
    navFont = models.CharField(max_length=255, blank=True, null=True)
    mainBG = models.CharField(max_length=255, blank=True, null=True)
    mainFont = models.CharField(max_length=255, blank=True, null=True)
    productBG = models.CharField(max_length=255, blank=True, null=True)
    productFont = models.CharField(max_length=255, blank=True, null=True)
    store = models.ForeignKey(StoreInfo, related_name="theStore", on_delete=CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.store.storeName