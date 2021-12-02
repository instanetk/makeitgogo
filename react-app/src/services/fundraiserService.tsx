import http, { apiUrl } from './httpService';

export interface Campaign {
  title: string;
  story: string;
  image_url: string;
  category: string;
  goal_amount: number;
  current_amount: number;
  published?: boolean;
  owner: string;
  _id?: string;
  date?: Date;
}

export function postFundraiser(campaign: Campaign) {
  const apiEndpoint = apiUrl + '/fundraiser';
  return http.post(apiEndpoint, campaign);
}

export function getFundraisers() {
  const apiEndpoint = apiUrl + '/fundraiser';
  return http.get(apiEndpoint);
}

export function getFundraiseById(id: string) {
  const apiEndpoint = apiUrl + '/fundraiser/campaign/' + id;
  return http.get<Campaign>(apiEndpoint);
}
