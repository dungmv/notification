import admin from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import serviceAccount from "./service-account.json" with { type: "json" };
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
      notification: {
        title: "Nguyễn Hải An",
        body: "An vừa gửi cho bạn đơn nghỉ phép 2 ngày cần phê duyệt",
        imageUrl: "https://sineksekiz.com/wp-content/uploads/2025/02/anh-gai-xinh-11aY6mVg.jpg",
      },
      android: {
        notification: {
          // imageUrl: "https://www.pngitem.com/pimgs/m/523-5236058_nh-icon-hot-hnh-hd-png-download.png",
          notificationCount: 2,
        },
      },
      apns: {
        payload: {
          aps: {
            badge: 2,
          },
        },
        fcmOptions: {
          // imageUrl: "https://www.pngitem.com/pimgs/m/523-5236058_nh-icon-hot-hnh-hd-png-download.png",
        },
      },
      data: {
        action: "display_notification",
        notification_id: "123",
        badge_count: "9",
        deeplink: "supi://https://trial.supi.vn/time/leave-request/123",
      },
      token: registrationToken,
    });
    console.log("Gửi tin nhắn thành công:", response);
  } catch (error) {
    console.error("Lỗi khi gửi tin nhắn:", error);
  }
}

sendNotificationToToken(DEVICE_TOKEN);
