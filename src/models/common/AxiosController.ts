import axios from 'axios';
import HttpStatusCodes from 'http-status-codes';

import AxiosEither from '../../service/AxiosEither';
import { ILunaRequest } from './interfaces/ILunaRequest';

export default class AxiosController {
  private isClientError(status: number) {
    return (
      status >= HttpStatusCodes.BAD_REQUEST &&
      status < HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  protected async get<T>(config: ILunaRequest) {
    const { url = '' } = config;

    try {
      const res = await axios.get<T>(url, config);

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
