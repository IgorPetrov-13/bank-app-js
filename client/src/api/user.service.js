import { redQuery } from '@/core/red-query/red-query.lib';
import { NotificationService } from '@/core/services/notification.service';

export class UserService {
  #BASE_URL = '/users';
  getAll(searchTerm, onSuccess) {
    const params = searchTerm ? new URLSearchParams(searchTerm) : '';
    return redQuery({
      path: `${this.#BASE_URL}?${params}`,
      onSuccess,
    });
  }
}
