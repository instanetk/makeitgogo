import http, { apiUrl } from './httpService';

export interface Campaign {
  title: string;
  story: string;
  image_url: string;
  category: string;
  goal_amount: number;
  published?: boolean;
  owner: string;
  _id?: string;
  date?: Date;
}

export function postFundraiser(campaign: Campaign) {
  const apiEndpoint = apiUrl + '/fundraiser';
  return http.post(apiEndpoint, campaign);
}
