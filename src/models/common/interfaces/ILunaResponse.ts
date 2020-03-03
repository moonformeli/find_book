import { AxiosResponse } from 'axios';

export interface ILunaResponse<T>
  extends Omit<AxiosResponse<T>, 'headers' | 'config' | 'request'> {}
