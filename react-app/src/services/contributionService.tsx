import http, { apiUrl } from './httpService';
import { ITransaction } from '../interfaces';

export function stripeTokenHandler(transaction: ITransaction) {
  // we need to pass the "amount" from the input
  console.log(transaction);

  //   const paymentData = { token: token!.id };
  const apiEndpoint = apiUrl + '/fundraiser/campaign/contribution/';
  return http.post(apiEndpoint, transaction);
}
