const NotificationsParent = document.getElementById("notifications");

function AddNotification(notificationText) {
    const Notification = document.createElement("p");
    Notification.className = "notification";
    Notification.innerHTML = notificationText;

    NotificationsParent.appendChild(Notification);

    setInterval(() => {
        Notification.remove();
    }, 5000);
}