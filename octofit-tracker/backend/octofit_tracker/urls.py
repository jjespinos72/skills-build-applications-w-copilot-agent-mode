"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
"""
import os
from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from octofit_tracker import views

# Get Codespace name from environment variable
CODESPACE_NAME = os.getenv('CODESPACE_NAME', 'localhost')

# Construct API base URL for Codespaces or localhost
if CODESPACE_NAME == 'localhost':
    API_URL = 'https://localhost:8000'
else:
    API_URL = f'https://{CODESPACE_NAME}-8000.app.github.dev'

# REST API endpoint format: https://$CODESPACE_NAME-8000.app.github.dev/api/[component]/
router = DefaultRouter()
router.register(r'teams', views.TeamViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'activities', views.ActivityViewSet)
router.register(r'leaderboard', views.LeaderboardEntryViewSet)
router.register(r'workouts', views.WorkoutViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.api_root, name='api-root'),
    path('api/', include(router.urls)),
]

