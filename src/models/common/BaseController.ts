import AxiosController from './AxiosController';
import BaseQuery from './BaseQuery';
import { ILunaRequest } from './interfaces/ILunaRequest';

export default class BaseController<
  Q extends BaseQuery
> extends AxiosController {
  constructor(protected query: Q) {
    super();
  }

  protected async call<T>(JSC: Record<string, any>, config: ILunaRequest) {
    const method = config.method?.toUpperCase() || '';

    if (method === 'GET') {
      return await this.get<T>(JSC, { ...config });
    }
    return Promise.reject();
  }
}
