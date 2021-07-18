export type Notification = {
  text: string;
  type: "info" | "error";
  id?: string;
  duration?: number;
};
