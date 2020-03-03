import url from 'url';

import qs from 'qs';

interface IAPIPathParams {
  search?: string;
}

export default class BaseQuery {
  constructor(private path: string) {}

  protected getAPIPath(params: IAPIPathParams): string {
    return url.format({
      protocol: 'https',
      hostname: 'www.googleapis.com',
      pathname: this.path,
      search: `?${params.search}&key=`
    });
  }
}
