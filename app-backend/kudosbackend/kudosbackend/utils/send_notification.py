from firebase_admin import messaging

def send_push_notification(token, title, body, data=None):
    message = messaging.Message(
        notification=messaging.Notification(
            title=title,
            body=body,
        ),
        token=token,
        data=data or {},
    )
    try:
        response = messaging.send(message)
        print(f"Done | Message send")
        return {"success": True, "response": response}
    except Exception as e:
        print(f"Error - {str(e)}")
        return {"success": False, "error": str(e)}


def send_bulk_notification(tokens, title, body, data=None):
    message = messaging.MulticastMessage(
        notification=messaging.Notification(title=title, body=body),
        tokens=tokens,
        data=data or {},
    )
    response = messaging.send_multicast(message)
    return {
        "success_count": response.success_count,
        "failure_count": response.failure_count,
        "responses": [resp for resp in response.responses]
    }

from accounts.models import DeviceToken

def notify_user(user, title, body, data=None):
    tokens = DeviceToken.objects.filter(user=user).values_list("token", flat=True)
    print(f"TOKEN -{tokens}")
    for token in tokens:
        print("Hoo! Push Notification Hit")
        send_push_notification(token, title, body, data)