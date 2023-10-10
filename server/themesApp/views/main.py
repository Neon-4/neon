from django.shortcuts import render, redirect
from django.contrib import messages



def themesDash(request):
    return render(request, 'themeDash.html')