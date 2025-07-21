from django.core.management.base import BaseCommand
from admin_dashboard.models import Category  # replace with actual app name and path

class Command(BaseCommand):
    help = "Seed initial Category data"

    def handle(self, *args, **kwargs):
        categories = [
            ("Leadership", "Inspiring, guiding, and empowering others toward a common goal."),
            ("Mentoring & Support", "Actively coaching, guiding, or supporting peers in their growth."),
            ("Creativity & Innovation", "Bringing fresh ideas, creative solutions, or out-of-the-box thinking."),
            ("Collaboration & Teamwork", "Promoting a positive team environment and effective cooperation."),
            ("Accountability & Ownership", "Taking responsibility and consistently delivering quality work."),
            ("Customer Centricity", "Putting customer needs first and creating positive customer impact."),
            ("Problem Solving", "Tackling challenges with critical thinking and practical solutions."),
            ("Going the Extra Mile", "Exceeding expectations in effort, delivery, or impact."),
            ("Integrity & Trust", "Upholding honesty, transparency, and trustworthiness."),
            ("Continuous Learning & Growth", "Seeking out opportunities to learn and helping others do the same."),
        ]

        for name, desc in categories:
            obj, created = Category.objects.get_or_create(name=name, defaults={"description": desc})
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created category: {name}"))
            else:
                self.stdout.write(self.style.WARNING(f"Category already exists: {name}"))
