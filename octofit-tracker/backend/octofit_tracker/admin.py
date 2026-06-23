from django.contrib import admin

from .models import Activity, LeaderboardEntry, Team, User, Workout


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at')
    search_fields = ('name',)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'team', 'role', 'created_at')
    search_fields = ('name', 'email')
    list_filter = ('team',)


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('activity_type', 'user', 'duration_minutes', 'distance_km', 'timestamp')
    search_fields = ('activity_type', 'user__name')
    list_filter = ('activity_type',)


@admin.register(LeaderboardEntry)
class LeaderboardEntryAdmin(admin.ModelAdmin):
    list_display = ('user', 'score', 'rank')
    search_fields = ('user__name',)
    ordering = ('rank',)


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'date', 'duration_minutes')
    search_fields = ('name', 'user__name')
    list_filter = ('date',)
