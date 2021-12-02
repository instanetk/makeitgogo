import http, { apiUrl } from './httpService';
import { ICampaign } from '../interfaces';

export function postFundraiser(campaign: ICampaign) {
  const apiEndpoint = apiUrl + '/fundraiser';
  return http.post(apiEndpoint, campaign);
}

export function getFundraisers() {
  const apiEndpoint = apiUrl + '/fundraiser';
  return http.get(apiEndpoint);
}

export function getFundraiseById(id: string) {
  const apiEndpoint = apiUrl + '/fundraiser/campaign/' + id;
  return http.get<ICampaign>(apiEndpoint);
}
