from django.contrib import admin

# Register your models here.
from django.apps import apps
from django.contrib import admin
from django.contrib.admin.sites import AlreadyRegistered

app_models = apps.get_app_config(__name__.split(".")[-2]).get_models()

for model in app_models:
    try:
        # Dynamically generate list_display from model fields
        field_names = [field.name for field in model._meta.fields]

        # Create a dynamic ModelAdmin
        admin_class = type(
            f'{model.__name__}Admin',
            (admin.ModelAdmin,),
            {'list_display': field_names}
        )

        # Register with the dynamic admin class
        admin.site.register(model, admin_class)

    except AlreadyRegistered:
        pass
