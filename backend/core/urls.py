from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, RegionViewSet, MOUViewSet,
    CSRProjectViewSet, ReportViewSet, SurveyViewSet,
    SurveyQuestionViewSet, SurveyResponseViewSet,
    NotificationViewSet, RequestViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'regions', RegionViewSet)
router.register(r'mous', MOUViewSet)
router.register(r'projects', CSRProjectViewSet)
router.register(r'reports', ReportViewSet)
router.register(r'surveys', SurveyViewSet)
router.register(r'survey-questions', SurveyQuestionViewSet)
router.register(r'survey-responses', SurveyResponseViewSet)
router.register(r'notifications', NotificationViewSet)
router.register(r'requests', RequestViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 