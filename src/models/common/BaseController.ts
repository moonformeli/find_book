import AxiosController from './AxiosController';
import BaseQuery from './BaseQuery';
import { ILunaRequest } from './interfaces/ILunaRequest';

export default class BaseController<
  Q extends BaseQuery
> extends AxiosController {
  constructor(protected query: Q) {
    super();
  }

  protected async call<T>(config: ILunaRequest) {
    const method = config.method?.toUpperCase() || '';

    if (method === 'GET') {
      return await this.get<T>({ ...config });
    }
    return Promise.reject();
  }
}
