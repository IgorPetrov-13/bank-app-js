import { redQuery } from '@/core/red-query/red-query.lib';

export class TransactionService {
  #BASE_URL = '/transactions';

  getAll(onSuccess) {
    const sortBy = new URLSearchParams({ orderBy: 'desc' });
    return redQuery({
      path: `${this.#BASE_URL}?${sortBy}`,
      onSuccess,
    });
  }
}
