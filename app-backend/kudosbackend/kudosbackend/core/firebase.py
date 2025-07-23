import firebase_admin
from firebase_admin import credentials

from kudosbackend.utils.env import get_env_value


def initialize_firebase():
    if not firebase_admin._apps:  # ensures it's initialized only once
        cred_data = {
            "type": "service_account",
            "project_id":get_env_value("FIREBASE_PROJECT_ID"),
            "private_key_id":get_env_value("FIREBASE_PRIVATE_KEY_ID"),
            "private_key":get_env_value("FIREBASE_PRIVATE_KEY").replace("\\n", "\n"),
            "client_email":get_env_value("FIREBASE_CLIENT_EMAIL"),
            "client_id":get_env_value("FIREBASE_CLIENT_ID"),
            "auth_uri":get_env_value("FIREBASE_AUTH_URI"),
            "token_uri":get_env_value("FIREBASE_TOKEN_URI"),
            "auth_provider_x509_cert_url":get_env_value("FIREBASE_AUTH_PROVIDER_X509_CERT_URL"),
            "client_x509_cert_url":get_env_value("FIREBASE_CLIENT_X509_CERT_URL"),
        }
        cred = credentials.Certificate(cred_data)
        firebase_admin.initialize_app(cred)