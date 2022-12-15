import { Notification } from '@application/entities/notification';

export class NotificationViewModel {
  static toHTTP(notificaion: Notification) {
    return {
      id: notificaion.id,
      content: notificaion.content.value,
      category: notificaion.category,
      recipientId: notificaion.recipientId,
    };
  }
}
