from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Team, User


class ApiRootTests(APITestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Marvel', description='Team Marvel')
        self.user = User.objects.create(
            name='Iron Man', email='ironman@marvel.example', team=self.team, role='Hero'
        )

    def test_api_root_returns_endpoints(self):
        url = reverse('api-root')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('teams', response.data)
        self.assertIn('users', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)

    def test_user_list_endpoint(self):
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['email'], 'ironman@marvel.example')
