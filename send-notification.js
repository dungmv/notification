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
      data: {
        notification_id: "123456",
        action: "display_notification",
        title: "Nguyễn Hải An, tin nhắn cần xoá",
        body: "An vừa gửi cho bạn đơn nghỉ phép 2 ngày cần phê duyệt",
        avatar_url: "https://avatars.githubusercontent.com/dungmv?s=128&v=4",
        deeplink: "supi://https://awesome-native-macos-apps.pages.dev",
      },
      token: registrationToken,
    });
    console.log("Gửi tin nhắn thành công:", response);
  } catch (error) {
    console.error("Lỗi khi gửi tin nhắn:", error);
  }
}

sendNotificationToToken(DEVICE_TOKEN);
