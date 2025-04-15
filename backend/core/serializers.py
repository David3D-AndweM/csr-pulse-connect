from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    User, Region, MOU, CSRProject, Report, Survey,
    SurveyQuestion, SurveyResponse, Notification, Request
)

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'avatar', 'first_name', 'last_name']
        read_only_fields = ['id']

class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = '__all__'

class MOUSerializer(serializers.ModelSerializer):
    class Meta:
        model = MOU
        fields = '__all__'

class CSRProjectSerializer(serializers.ModelSerializer):
    assigned_users = UserSerializer(many=True, read_only=True)
    recipient = UserSerializer(read_only=True)
    mou = MOUSerializer(read_only=True)
    region = RegionSerializer(read_only=True)

    class Meta:
        model = CSRProject
        fields = '__all__'

class ReportSerializer(serializers.ModelSerializer):
    project = CSRProjectSerializer(read_only=True)
    recipient = UserSerializer(read_only=True)

    class Meta:
        model = Report
        fields = '__all__'

class SurveyQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyQuestion
        fields = '__all__'

class SurveySerializer(serializers.ModelSerializer):
    questions = SurveyQuestionSerializer(many=True, read_only=True)
    project = CSRProjectSerializer(read_only=True)

    class Meta:
        model = Survey
        fields = '__all__'

class SurveyResponseSerializer(serializers.ModelSerializer):
    survey = SurveySerializer(read_only=True)
    respondent = UserSerializer(read_only=True)

    class Meta:
        model = SurveyResponse
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = '__all__'

class RequestSerializer(serializers.ModelSerializer):
    requester = UserSerializer(read_only=True)

    class Meta:
        model = Request
        fields = '__all__' 