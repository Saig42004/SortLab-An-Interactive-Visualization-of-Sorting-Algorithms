from django.shortcuts import render


def home(request):
    return render(request, "lab/index.html")


def about(request):
    return render(request, "lab/about.html")
