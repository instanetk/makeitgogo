import http, { apiUrl } from './httpService';
import { ICampaign, ICampaignUpdate } from '../interfaces';

export function postFundraiser(campaign: ICampaign) {
  const apiEndpoint = apiUrl + '/fundraiser';
  return http.post(apiEndpoint, campaign);
}

export function getFundraisers() {
  const apiEndpoint = apiUrl + '/fundraiser';
  return http.get(apiEndpoint);
}

export function getFundraiserById(id: string) {
  const apiEndpoint = apiUrl + '/fundraiser/campaign/' + id;
  return http.get<ICampaign>(apiEndpoint);
}

export function postFaves(id: string) {
  const apiEndpoint = apiUrl + '/fundraiser/campaign/faves/' + id;
  return http.post(apiEndpoint);
}

export function updateFundraiser(id: string, input: ICampaignUpdate) {
  const apiEndpoint = apiUrl + '/fundraiser/campaign/' + id;
  return http.put(apiEndpoint, input);
}

export function unpublishFundraiser(id: string) {
  const apiEndpoint = apiUrl + '/fundraiser/campaign/' + id;
  return http.patch(apiEndpoint);
}

export function deleteFundraiser(id: string) {
  const apiEndpoint = apiUrl + '/fundraiser/campaign/' + id;
  return http.delete(apiEndpoint);
}
