import admin from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import serviceAccount from "./serviceAccountKey.json" with { type: "json" };
import { DEVICE_TOKEN } from "./config.js";

// Khởi tạo Firebase Admin SDK
const app = admin.initializeApp({
  credential: admin.cert(serviceAccount),
});

const messaging = getMessaging(app);

// Hàm gửi notification tới một thiết bị cụ thể (qua Token)
async function sendNotificationToToken(registrationToken) {
  try {
    const response = await messaging.send({
      android: {
        priority: "high",
      },
      apns: {
        payload: {
          aps: {
            contentAvailable: true, // Bắt buộc cho iOS chạy ngầm
          },
        },
        headers: {
          "apns-push-type": "background", // Bắt buộc cho iOS background push
          "apns-priority": "5", // Bắt buộc cho iOS background push
        },
      },
      data: {
        action: "cancel_notification",
        notification_id: "123456",
      },
      token: registrationToken,
    });
    console.log("Gửi tin nhắn thành công:", response);
  } catch (error) {
    console.error("Lỗi khi gửi tin nhắn:", error);
  }
}

sendNotificationToToken(DEVICE_TOKEN);
