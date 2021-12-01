import { DocumentDefinition } from 'mongoose';
import Fundraiser, { FundraiserDocument } from '../models/fundraiser.model';

export async function createFundraiser(input: DocumentDefinition<FundraiserDocument>) {
  try {
    const fundraiser = await Fundraiser.create(input);
    return fundraiser;
  } catch (ex: any) {
    throw new Error(ex);
  }
}

export async function getFundraisers() {
  try {
    const fundraisers = await Fundraiser.find();
    return fundraisers;
  } catch (ex: any) {
    throw new Error(ex);
  }
}

export async function getFundraiserById(id: string) {
  try {
    const fundraiser = await Fundraiser.findById(id);
    return fundraiser;
  } catch (ex: any) {
    throw new Error(ex);
  }
}
