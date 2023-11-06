from django.http import HttpResponse, FileResponse
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
import io
import os
from storeApp.models import *
from customerApp.models import *
from themesApp.models import *
from orderApp.models import *



def generateInvoice(user_id, order_id):
    responseIncoming = {
        'user_id': user_id,
        'order_id': order_id
    }
    print('invoiceutil res', responseIncoming)
    company = {
        'name': '4Sale'
    }
    buffer = io.BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    p.drawString(60,750, f"{company['name']}")
    p.save()
    buffer.seek(0)
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'inline; filename="invoice.pdf"'
    response.write(buffer.read())
    return response