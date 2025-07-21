from django.urls import path
from . import views

urlpatterns = [
    # User management
    path('users/', views.user_list, name='user_list'),
    path('users/create/', views.create_user, name='create_user'),
    path('users/<int:user_id>/delete/', views.delete_user, name='delete_user'),
    
    # Skills management
    path('skills/', views.skills_list, name='skills_list'),
    path('skills/create/', views.create_skill, name='create_skill'),
    path('skills/<int:skill_id>/delete/', views.delete_skill, name='delete_skill'),
    
    # Categories management
    path('categories/', views.categories_list, name='categories_list'),
    path('categories/create/', views.create_category, name='create_category'),
    path('categories/<int:category_id>/delete/', views.delete_category, name='delete_category'),
] 