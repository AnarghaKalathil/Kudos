from django.core.management.base import BaseCommand
from admin_dashboard.models import Skills  # replace with your actual app name

class Command(BaseCommand):
    help = "Seed initial Skills data"

    def handle(self, *args, **kwargs):
        skills = [
            # Programming Languages
            "Python", "JavaScript", "Java", "C", "C++", "C#", "Go", "Rust", "Ruby", "PHP", "Kotlin", "Swift", "TypeScript", "Perl", "Scala", "Dart",

            # Web Development
            "HTML", "CSS", "Sass", "Tailwind CSS", "Bootstrap", "React", "Angular", "Vue.js", "Next.js", "Nuxt.js", "jQuery",

            # Backend Frameworks
            "Django", "Flask", "FastAPI", "Spring Boot", "Express.js", "NestJS", ".NET Core", "Rails", "Laravel", "Phoenix",

            # Databases
            "PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis", "Elasticsearch", "Cassandra", "Firebase", "DynamoDB", "Oracle", "SQL Server",

            # DevOps & Tools
            "Docker", "Kubernetes", "Git", "GitHub Actions", "GitLab CI", "Jenkins", "Terraform", "Ansible", "AWS", "GCP", "Azure", "Nginx",

            # Testing
            "Pytest", "Jest", "Mocha", "JUnit", "Selenium", "Cypress", "Postman", "TestNG",

            # Mobile Development
            "Flutter", "React Native", "SwiftUI", "Android SDK", "Xcode", "Ionic",

            # Other Skills
            "GraphQL", "REST API", "gRPC", "WebSockets", "OAuth", "JWT", "Linux", "Agile", "Scrum", "TDD", "Clean Architecture"
        ]

        for skill in skills:
            obj, created = Skills.objects.get_or_create(name=skill)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created skill: {skill}"))
            else:
                self.stdout.write(self.style.WARNING(f"Skill already exists: {skill}"))
