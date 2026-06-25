import admin from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import serviceAccount from "./service-account.json" with { type: "json" };

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
      },
      android: {
        notification: {
          imageUrl: "https://www.pngitem.com/pimgs/m/523-5236058_nh-icon-hot-hnh-hd-png-download.png",
          notificationCount: 1,
        },
      },
      apns: {
        payload: {
          aps: {
            badge: 1,
          },
        },
        fcmOptions: {
          imageUrl: "https://www.pngitem.com/pimgs/m/523-5236058_nh-icon-hot-hnh-hd-png-download.png",
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

// --- Ví dụ chạy thử ---
// Thay thế bằng FCM registration token thực tế của thiết bị của bạn
const YOUR_DEVICE_TOKEN =
  "fLmNjuQVS_6Q6UhQ2wQRNM:APA91bEjqaceWAMZDSsy3fJtGFVF1DuP1mHZiD2s73ac7CM0Lh8qyvvi1eqLz5Q_l3dTJm7mHKs7PMNE9QLfvs8K3HEcVWf4-JYvAWhvjhxZ4_5eS8FPZKU";

if (YOUR_DEVICE_TOKEN === "YOUR_FCM_DEVICE_TOKEN_HERE") {
  console.log('Vui lòng thay thế "YOUR_FCM_DEVICE_TOKEN_HERE" bằng token thiết bị thực tế của bạn.');
} else {
  sendNotificationToToken(YOUR_DEVICE_TOKEN);
}
