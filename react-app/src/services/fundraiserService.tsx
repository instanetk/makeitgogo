import http, { apiUrl } from './httpService';

export interface Campaign {
  title: string;
  story: string;
  image_url: string;
  category: string;
  goal_amount: number;
  owner: string;
}

export function postFundraiser(campaign: Campaign) {
  const apiEndpoint = apiUrl + '/fundraiser';
  return http.post(apiEndpoint, campaign);
}
