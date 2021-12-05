import http, { apiUrl } from './httpService';
import { ITransaction } from '../interfaces';

export function stripeTokenHandler(transaction: ITransaction) {
  const apiEndpoint = apiUrl + '/fundraiser/campaign/contribution/';
  return http.post(apiEndpoint, transaction);
}
