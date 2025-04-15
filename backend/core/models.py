from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('csr_manager', 'CSR Manager'),
        ('editor', 'Editor'),
        ('recipient', 'Recipient'),
        ('public', 'Public'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)

class Region(models.Model):
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    project_count = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.name}, {self.country}"

class MOU(models.Model):
    title = models.CharField(max_length=255)
    organization_name = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20)
    description = models.TextField()
    document_url = models.URLField()

    def __str__(self):
        return self.title

class CSRProject(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('pending', 'Pending'),
    ]
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    progress = models.FloatField()
    location = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    assigned_users = models.ManyToManyField(User, related_name='projects')
    project_type = models.CharField(max_length=255)
    mou = models.ForeignKey(MOU, on_delete=models.SET_NULL, null=True, blank=True)
    recipient = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='received_projects')
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.title

class Report(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('submitted', 'Submitted'),
        ('approved', 'Approved'),
    ]
    project = models.ForeignKey(CSRProject, on_delete=models.CASCADE, related_name='reports')
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reports')
    summary = models.TextField()
    document_url = models.URLField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    submitted_at = models.DateTimeField(auto_now_add=True)
    feedback = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Report for {self.project.title}"

class Survey(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('expired', 'Expired'),
    ]
    title = models.CharField(max_length=255)
    description = models.TextField()
    project = models.ForeignKey(CSRProject, on_delete=models.CASCADE, related_name='surveys')
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    def __str__(self):
        return self.title

class SurveyQuestion(models.Model):
    QUESTION_TYPE_CHOICES = [
        ('text', 'Text'),
        ('multiple_choice', 'Multiple Choice'),
        ('checkbox', 'Checkbox'),
    ]
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name='questions')
    question = models.TextField()
    type = models.CharField(max_length=20, choices=QUESTION_TYPE_CHOICES)
    options = models.JSONField(null=True, blank=True)
    required = models.BooleanField(default=True)

    def __str__(self):
        return self.question

class SurveyResponse(models.Model):
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name='responses')
    respondent = models.ForeignKey(User, on_delete=models.CASCADE, related_name='responses')
    responses = models.JSONField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Response for {self.survey.title} by {self.respondent.username}"

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    message = models.TextField()
    type = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification for {self.user.username}"

class Request(models.Model):
    TYPE_CHOICES = [
        ('funding', 'Funding'),
        ('resource', 'Resource'),
    ]
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    requester = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requests')
    facility = models.CharField(max_length=255)
    status = models.CharField(max_length=20)
    submitted_at = models.DateTimeField(auto_now_add=True)
    description = models.TextField()

    def __str__(self):
        return f"{self.type} request by {self.requester.username}" 