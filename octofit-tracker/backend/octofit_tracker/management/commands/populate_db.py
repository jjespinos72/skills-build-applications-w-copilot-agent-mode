from django.core.management.base import BaseCommand
from django.utils import timezone

from octofit_tracker.models import Team, User, Activity, LeaderboardEntry, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write('Clearing existing data...')
        LeaderboardEntry.objects.all().delete()
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        self.stdout.write('Creating teams...')
        marvel = Team.objects.create(name='Marvel', description='Team Marvel')
        dc = Team.objects.create(name='DC', description='Team DC')

        self.stdout.write('Creating users...')
        marvel_users = [
            {'name': 'Iron Man', 'email': 'ironman@marvel.example'},
            {'name': 'Spider-Man', 'email': 'spiderman@marvel.example'},
            {'name': 'Captain Marvel', 'email': 'captainmarvel@marvel.example'},
        ]
        dc_users = [
            {'name': 'Batman', 'email': 'batman@dc.example'},
            {'name': 'Superman', 'email': 'superman@dc.example'},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.example'},
        ]

        created_users = []
        for u in marvel_users:
            created_users.append(User.objects.create(name=u['name'], email=u['email'], team=marvel))
        for u in dc_users:
            created_users.append(User.objects.create(name=u['name'], email=u['email'], team=dc))

        self.stdout.write('Creating activities and workouts...')
        now = timezone.now()
        for user in created_users:
            Activity.objects.create(
                user=user,
                activity_type='run',
                duration_minutes=30,
                distance_km=5.0,
                timestamp=now,
            )
            Workout.objects.create(
                user=user,
                name='Full Body Blast',
                description='Sample workout',
                date=now,
                duration_minutes=45,
            )

        self.stdout.write('Creating leaderboard entries...')
        rank = 1
        for user in created_users:
            LeaderboardEntry.objects.create(user=user, score=1000 - rank * 10, rank=rank)
            rank += 1

        self.stdout.write(self.style.SUCCESS('Database populated with sample data.'))
