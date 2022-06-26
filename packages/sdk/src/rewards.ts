import { ErrorType } from './types';
import { fetcher } from './utils';

class Rewards {
  apikey: string;
  node: string;

  constructor(apikey: string, node: string) {
    this.apikey = apikey;
    this.node = node;
    return this;
  }

  send = async (
    signerAddress: string,
    token: string,
    address: string,
    amount: number
  ): Promise<any | ErrorType> => {
    return await fetcher('POST', `${this.node}/rewards`, this.apikey, {
      token,
      signerAddress,
      address,
      amount,
    });
  };
}
export default Rewards;
