from django.urls import path
from . import views

urlpatterns = [
    # User management
    path('api/users/', views.user_list, name='user_list'),
    path('api/users/create/', views.create_user, name='create_user'),
    path('api/users/<int:user_id>/delete/', views.delete_user, name='delete_user'),
    
    # Skills management
    path('api/skills/', views.skills_list, name='skills_list'),
    path('api/skills/create/', views.create_skill, name='create_skill'),
    path('api/skills/<int:skill_id>/delete/', views.delete_skill, name='delete_skill'),
    
    # Categories management
    path('api/categories/', views.categories_list, name='categories_list'),
    path('api/categories/create/', views.create_category, name='create_category'),
    path('api/categories/<int:category_id>/delete/', views.delete_category, name='delete_category'),
] 