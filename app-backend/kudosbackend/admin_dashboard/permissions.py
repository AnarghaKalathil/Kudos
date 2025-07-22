from rest_framework import permissions


class IsAdminUser(permissions.BasePermission):
    """
    Custom permission to only allow admin users to access admin dashboard.
    """
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_superuser