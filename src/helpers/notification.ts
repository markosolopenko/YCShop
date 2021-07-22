import { notification } from "antd";

export const openNotificationWithIcon = (
  type: string,
  message: string,
  description: string
): void => {
  if (type === "success" || type === "info" || type === "error" || type === "warning") {
    notification[type]({
      message: message,
      description: description,
    });
  }
};
