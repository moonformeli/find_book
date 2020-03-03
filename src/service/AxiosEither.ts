import { ILunaResponse } from '../models/common/interfaces/ILunaResponse';

type Maybe = 'Just' | 'Nothing';
interface ICaseOf<L, R> {
  left: (l: ILunaResponse<L>) => L;
  right: (r: ILunaResponse<R>) => R;
}

export default class AxiosEither<T> {
  constructor(private v: ILunaResponse<T>, private type: Maybe) {}

  static right<R>(r: ILunaResponse<R>) {
    return new AxiosEither<R>(r, 'Just');
  }

  static left<L>(l: ILunaResponse<L>) {
    return new AxiosEither<L>(l, 'Nothing');
  }

  caseOf<L, R>({ left, right }: ICaseOf<L, R>) {
    if (this.type === 'Just') {
      return right((this.v as unknown) as ILunaResponse<R>);
    }
    if (this.type === 'Nothing') {
      return left((this.v as unknown) as ILunaResponse<L>);
    }
  }
}
