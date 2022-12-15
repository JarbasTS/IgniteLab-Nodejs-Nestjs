import { Notification as RawNotification } from '@prisma/client';
import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/content';

export class PrismaNotificationMapper {
  static toPrisma(notificaion: Notification) {
    return {
      id: notificaion.id,
      category: notificaion.category,
      content: notificaion.content.value,
      recipientId: notificaion.recipientId,
      readAt: notificaion.readAt,
      createdAt: notificaion.createdAt,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        readAt: raw.readAt,
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
