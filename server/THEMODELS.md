# THE MODELS

## Customer
```python
class CustomerManager(models.Manager):
    def validate(self, form):
        errors = {}
        emailCheck = self.filter(email=form['email'])
        if emailCheck:
            errors['email'] = 'Email already in use'
        if form['password'] != form['confirm']:
            errors['password'] = 'Passwords do not match'
        return errors
    
class Customer(models.Model):
    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

    objects = CustomerManager()

    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def register(self):
        self.save()

    def __str__(self):
        return self.firstName
    def fullName(self):
        return f'{self.firstName} {self.lastName}'
    

class CustomerProfile(models.Model):
    user = models.OneToOneField(Customer, unique=True, on_delete=models.CASCADE)
    address01 = models.CharField(max_length=255, blank=True)
    address02 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    state = models.CharField(max_length=255, blank=True)
    zip = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=255, blank=True)
    age = models.DateField(blank=True, null=True)
    def __str__(self):
        return f'{self.user.firstName} CustomerProfile'
    def address(self):
        return f'{self.address01} {self.address02} {self.city} {self.state} {self.zip}'
    def tel(self):
        return self.phone

```

## Store
```python

class Category(models.Model):
    name= models.CharField(max_length=255)
    adultOnly = models.BooleanField(default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    @staticmethod
    def getAllCategories():
        return Category.objects.all().values()

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.IntegerField(default=0, blank=True, null=True)
    madeToOrder = models.BooleanField(default=0)
    description= models.TextField(max_length=255, default='', blank=True, null= True)
    adultOnly = models.BooleanField(default=0)
    image= models.ImageField(upload_to='products')
    category= models.ForeignKey(Category, related_name='theCategory',on_delete=CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    @staticmethod
    def getAllProds():
        return Product.objects.all().values()
    
    @staticmethod
    def getAllByCatId(category_id):
        if category_id:
            return Product.objects.filter(category=category_id)
        else:
            return Product.getAllProds()
    
    def __str__(self):
        return self.name


# Extra images outside of main
class ProductImages(models.Model):
    image= models.ImageField(upload_to='products')
    prod = models.ForeignKey(Product, related_name='theProduct', on_delete=CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

```
## Order
```python

statusOfOrder = [
    ('New', 'Newly Placed'),
    ('Pending', 'In discussion between Customer and Owner'),
    ('In Progress', 'Item is being created'),
    ('Order Items Created', 'All items in order have been created'),
    ('Shipped', 'Item has been shipped'),
    ('Delivered','Item has been delivered'),
    ('Rejected','Order was Rejected'),
    ('Returned', 'Order was Returned'),
    ('Archived', 'Order was archived')
]
statusOfPay = [
    ('New', 'New Order payment terms not set yet'),
    ('Paid', 'Order is fully Paid for'),
    ('Payment Plan', 'Order is on a payment plan that in still ongoing'),
    ('Billed', 'Final Price determined and sent to customer'),
    ('Unpaid', 'Order remains unpaid'),
    ('On Hold', 'Order is on hold awaiting terms')
]

def genOrderCode():
    N = 4
    res01 = ''.join(random.choices(string.ascii_letters, k=N))
    res02 = ''.join(random.choices(string.ascii_letters, k=N))
    stamp = datetime.date.today()
    orderCode = f'{stamp.year}-{res01}-{stamp.day}-{res02}-{stamp.month}'
    print(orderCode, stamp, res01, res02)
    return orderCode

class OrderManager(models.Manager):
    def validate(self):
        orderNum = genOrderCode()
        orderCheck = self.filter(orderNum = orderNum)
        if orderCheck:
            orderNum = genOrderCode()
        return orderNum
    
class Order(models.Model):
    orderNum = models.CharField(max_length=255, unique=True)
    customer = models.ForeignKey(User, related_name='theCustomer', on_delete=CASCADE)
    itemCount = models.IntegerField(blank=True, null=True)
    orderTotal = models.CharField(max_length=255, blank=True, null=True)
    orderStatus = models.CharField(max_length=255, choices=statusOfOrder, default='New')
    paymentStatus = models.CharField(max_length=255, choices=statusOfPay, default='New')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    objects = OrderManager()

    def __str__(self):
        return self.orderNum
        
class OrderItem(models.Model):
    orderNum = models.ForeignKey(Order, related_name='theOrder', on_delete=CASCADE)
    product = models.ForeignKey(Product, related_name='theProd', on_delete=CASCADE)
    quantity = models.IntegerField()
    total = models.CharField(max_length=255)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.orderNum.orderNum} {self.product.name}'
    

class Invoice(models.Model):
    theCustomer = models.ForeignKey(User, related_name='custOrder',on_delete=models.CASCADE)
    cart = models.OneToOneField(Order, on_delete=models.CASCADE)
    orderDate = models.DateField(default=datetime.datetime.today)
    pdf = models.FileField(upload_to='invoices')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f'{self.theCustomer.lastName} - {self.cart.orderNum}'
```

## Themes

```python
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
```