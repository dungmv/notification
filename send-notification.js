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
      // notification: {
      //   title: "Nguyễn Hải An",
      //   body: "An vừa gửi cho bạn đơn nghỉ phép 2 ngày cần phê duyệt",
      //   imageUrl: "https://www.google.com/s2/favicons?sz=256&domain=getmedis.com",
      // },
      android: {
        priority: "high",
        notification: {
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
        },
      },
      data: {
        notification_id: "123",
        action: "display_notification",
        title: "Nguyễn Hải An",
        body: "An vừa gửi cho bạn đơn nghỉ phép 2 ngày cần phê duyệt",
        avatar_url: "https://www.google.com/s2/favicons?sz=256&domain=getmedis.com",
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
