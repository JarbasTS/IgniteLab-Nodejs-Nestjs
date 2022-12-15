import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './erros/notification-not-found';
import { UnreadNotification } from './unread-notifications';

describe('Unread notificaion', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotificaion = new UnreadNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await unreadNotificaion.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotificaion = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unreadNotificaion.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
