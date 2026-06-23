from django.db import models


class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'teams'

    def __str__(self):
        return self.name


class User(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=150)
    team = models.ForeignKey(Team, null=True, blank=True, on_delete=models.SET_NULL)
    role = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'users'

    def __str__(self):
        return f"{self.name} <{self.email}>"


class Activity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=100)
    duration_minutes = models.IntegerField()
    distance_km = models.FloatField(null=True, blank=True)
    timestamp = models.DateTimeField()

    class Meta:
        db_table = 'activities'

    def __str__(self):
        return f"{self.activity_type} by {self.user.name}"


class LeaderboardEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    rank = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = 'leaderboard'

    def __str__(self):
        return f"{self.user.name}: {self.score}"


class Workout(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    date = models.DateTimeField()
    duration_minutes = models.IntegerField()

    class Meta:
        db_table = 'workouts'

    def __str__(self):
        return f"{self.name} ({self.user.name})"
