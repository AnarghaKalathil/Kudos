from django.core.management.base import BaseCommand
from accounts.models import KudosUser


class Command(BaseCommand):
    help = 'Creates the admin user for the Kudos system'

    def handle(self, *args, **options):
        try:
            # Check if admin user already exists
            if KudosUser.objects.filter(email='kudosadmin@terrificminds.com').exists():
                admin_user = KudosUser.objects.get(email='kudosadmin@terrificminds.com')
                
                # Update existing user to ensure correct settings
                admin_user.username = 'kudosadmin'
                admin_user.is_superuser = True
                admin_user.is_staff = True
                admin_user.is_active = True
                admin_user.is_admin = True
                admin_user.first_name = 'Admin'
                admin_user.last_name = 'User'
                admin_user.designation = 'admin'
                admin_user.set_password('password')
                admin_user.save()
                
                self.stdout.write(
                    self.style.SUCCESS(
                        f'Admin user updated successfully: {admin_user.email}'
                    )
                )
                return

            # Create new admin user
            admin_user = KudosUser.objects.create_user(
                username='kudosadmin',
                email='kudosadmin@terrificminds.com',
                password='password',
                first_name='Admin',
                last_name='User',
                designation='admin',
                is_superuser=True,
                is_staff=True,
                is_active=True,
                is_admin=True
            )

            self.stdout.write(
                self.style.SUCCESS(
                    f'Successfully created admin user: {admin_user.email}'
                )
            )

        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error creating admin user: {str(e)}')
            ) 