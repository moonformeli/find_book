import axios from 'axios';
import HttpStatusCodes from 'http-status-codes';

import AxiosEither from '../../service/AxiosEither';
import { validate } from '../../utils/validate';
import { ILunaRequest } from './interfaces/ILunaRequest';

export default class AxiosController {
  private isClientError(status: number) {
    return (
      status >= HttpStatusCodes.BAD_REQUEST &&
      status < HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  protected async get<T>(JSC: Record<string, any>, config: ILunaRequest) {
    const { url = '' } = config;

    try {
      const res = await axios.get<T>(url, config);
      const valid = validate(JSC, res.data);

      if (!res) {
        throw new Error('Unknown Error');
      }
      if (this.isClientError(res.status)) {
        return AxiosEither.right<null>({
          data: null,
          status: res.status,
          statusText: res.statusText
        });
      }
      if (!!valid.error) {
        throw new Error(JSON.stringify(valid.error, null, 2));
      }

      return AxiosEither.right<T>({
        data: res.data,
        status: res.status,
        statusText: res.statusText
      });
    } catch (e) {
      console.error(e);

      return AxiosEither.left<null>({
        data: null,
        status: 400,
        statusText: JSON.stringify(e, null, 2)
      });
    }
  }
}
