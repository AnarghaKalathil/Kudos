from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from django.shortcuts import get_object_or_404
from django.db import IntegrityError

from accounts.models import KudosUser
from admin_dashboard.models import Skills
from .models import Category
from .serializers import (
    UserSerializer, CreateUserSerializer, SkillsSerializer, CategorySerializer
)
from .permissions import IsAdminUser


@extend_schema(
    summary="Get all users",
    tags=["Admin Dashboard"]
)
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def user_list(request):
    """Get all users (admin only)"""
    users = KudosUser.objects.all().order_by('-date_joined')
    serializer = UserSerializer(users, many=True)
    return Response({
        "data": serializer.data,
        "message": "Users retrieved successfully",
        "status": True
    }, status=status.HTTP_200_OK)


@extend_schema(
    summary="Create new user",
    tags=["Admin Dashboard"],
    request=CreateUserSerializer,
    responses={201: UserSerializer}
)
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def create_user(request):
    """Create a new user (admin only)"""
    serializer = CreateUserSerializer(data=request.data)
    if serializer.is_valid():
        try:
            user = serializer.save()
            return Response({
                "data": UserSerializer(user).data,
                "message": "User created successfully",
                "status": True
            }, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({
                "data": "",
                "message": "User with this email or username already exists",
                "status": False
            }, status=status.HTTP_400_BAD_REQUEST)
    return Response({
        "data": "",
        "message": serializer.errors,
        "status": False
    }, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    summary="Delete user",
    tags=["Admin Dashboard"],
    parameters=[
        {"name": "user_id", "in": "path", "required": True, "schema": {"type": "integer"}}
    ]
)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdminUser])
def delete_user(request, user_id):
    """Delete a user (admin only)"""
    try:
        user = get_object_or_404(KudosUser, id=user_id)
        if user.is_admin:
            return Response({
                "data": "",
                "message": "Cannot delete admin user",
                "status": False
            }, status=status.HTTP_400_BAD_REQUEST)
        
        user.delete()
        return Response({
            "data": "",
            "message": "User deleted successfully",
            "status": True
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            "data": "",
            "message": f"Error deleting user: {str(e)}",
            "status": False
        }, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    summary="Get all skills",
    tags=["Admin Dashboard"]
)
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def skills_list(request):
    """Get all skills (admin only)"""
    skills = Skills.objects.all().order_by('name')
    serializer = SkillsSerializer(skills, many=True)
    return Response({
        "data": serializer.data,
        "message": "Skills retrieved successfully",
        "status": True
    }, status=status.HTTP_200_OK)


@extend_schema(
    summary="Create new skill",
    tags=["Admin Dashboard"],
    request=SkillsSerializer,
    responses={201: SkillsSerializer}
)
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def create_skill(request):
    """Create a new skill (admin only)"""
    serializer = SkillsSerializer(data=request.data)
    if serializer.is_valid():
        try:
            skill = serializer.save()
            return Response({
                "data": serializer.data,
                "message": "Skill created successfully",
                "status": True
            }, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({
                "data": "",
                "message": "Skill with this name already exists",
                "status": False
            }, status=status.HTTP_400_BAD_REQUEST)
    return Response({
        "data": "",
        "message": serializer.errors,
        "status": False
    }, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    summary="Delete skill",
    tags=["Admin Dashboard"],
    parameters=[
        {"name": "skill_id", "in": "path", "required": True, "schema": {"type": "integer"}}
    ]
)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdminUser])
def delete_skill(request, skill_id):
    """Delete a skill (admin only)"""
    try:
        skill = get_object_or_404(Skills, id=skill_id)
        skill.delete()
        return Response({
            "data": "",
            "message": "Skill deleted successfully",
            "status": True
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            "data": "",
            "message": f"Error deleting skill: {str(e)}",
            "status": False
        }, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    summary="Get all categories",
    tags=["Admin Dashboard"]
)
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def categories_list(request):
    """Get all categories (admin only)"""
    categories = Category.objects.all().order_by('name')
    serializer = CategorySerializer(categories, many=True)
    return Response({
        "data": serializer.data,
        "message": "Categories retrieved successfully",
        "status": True
    }, status=status.HTTP_200_OK)


@extend_schema(
    summary="Create new category",
    tags=["Admin Dashboard"],
    request=CategorySerializer,
    responses={201: CategorySerializer}
)
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def create_category(request):
    """Create a new category (admin only)"""
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        try:
            category = serializer.save()
            return Response({
                "data": serializer.data,
                "message": "Category created successfully",
                "status": True
            }, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({
                "data": "",
                "message": "Category with this name already exists",
                "status": False
            }, status=status.HTTP_400_BAD_REQUEST)
    return Response({
        "data": "",
        "message": serializer.errors,
        "status": False
    }, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    summary="Delete category",
    tags=["Admin Dashboard"],
    parameters=[
        {"name": "category_id", "in": "path", "required": True, "schema": {"type": "integer"}}
    ]
)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdminUser])
def delete_category(request, category_id):
    """Delete a category (admin only)"""
    try:
        category = get_object_or_404(Category, id=category_id)
        category.delete()
        return Response({
            "data": "",
            "message": "Category deleted successfully",
            "status": True
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            "data": "",
            "message": f"Error deleting category: {str(e)}",
            "status": False
        }, status=status.HTTP_400_BAD_REQUEST)
