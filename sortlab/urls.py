"""URL routes for the SortLab application."""
from django.urls import path
from .views import home

app_name = "sortlab"
urlpatterns = [path("", home, name="home")]
