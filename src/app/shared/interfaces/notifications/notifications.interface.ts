export interface NotificationsInterface {
  id: number;
  title: string;
  message: string;
  type: string;
  status: number;
  created_at: string;
  user_id: number;
  url?: string;
}

export interface NotificationsUnread {
  success: boolean;
  unread: number;
}
