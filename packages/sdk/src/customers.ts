import { ErrorType } from './types';
import { fetcher } from './utils';

class Customers {
  apikey: string;
  node: string;

  constructor(apikey: string, node: string) {
    this.apikey = apikey;
    this.node = node;
    return this;
  }

  create = async (
    signerAddress: string,
    token: string,
    email: string
  ): Promise<any | ErrorType> => {
    return await fetcher('POST', `${this.node}/customers`, this.apikey, {
      token,
      signerAddress,
      email,
    });
  };
}
export default Customers;
