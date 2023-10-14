from django.db import models
from django.db.models.deletion import CASCADE


class UserManager(models.Manager):
    def validate(self, form):
        errors = {}
        emailCheck = self.filter(email=form['email'])
        if emailCheck:
            errors['email'] = 'Email already in use'
        if form['password'] != form['confirm']:
            errors['password'] = 'Passwords do not match'
        return errors
    
class User(models.Model):
    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

    objects = UserManager()

    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def register(self):
        self.save()

    def __str__(self):
        return self.firstName
    def fullName(self):
        return f'{self.firstName} {self.lastName}'


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