import Rewards from './rewards';
import Customers from './customers';
import Auth from './auth';
import ConvoBase from './base';

class Convo extends ConvoBase {
  rewards: Rewards;
  customers: Customers;
  auth: Auth;

  constructor(apikey: string, node = 'https://rward.xyz/api') {
    super(apikey, node);
    this.rewards = new Rewards(apikey, this.node);
    this.customers = new Customers(apikey, this.node);
    this.auth = new Auth(apikey, this.node);
    return this;
  }
}

export { Convo };
