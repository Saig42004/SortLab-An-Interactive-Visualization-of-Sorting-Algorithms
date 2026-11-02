from django.contrib import admin
from django.urls import path
from lab import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.home, name="home"),
    path("lab/", views.workbench, name="workbench"),
    path("algorithms/", views.algorithms_index, name="algorithms"),
    path("algorithms/<slug:slug>/", views.algorithm_detail, name="algorithm_detail"),
    path("complexity/", views.complexity, name="complexity"),
    path("compare/", views.compare, name="compare"),
    path("about/", views.about, name="about"),
    path("health/", views.health, name="health"),
]
