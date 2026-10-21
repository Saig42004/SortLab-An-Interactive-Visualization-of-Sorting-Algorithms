"""Root URL configuration for SortLab."""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("sortlab.urls")),
]
