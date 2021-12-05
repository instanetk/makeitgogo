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

export async function postFaves(id: string) {
  try {
    const fundraiser = await Fundraiser.findById(id);

    fundraiser.faves = fundraiser.faves + 1;

    fundraiser.save();

    return fundraiser;
  } catch (ex: any) {
    throw new Error(ex);
  }
}

export async function updateFundraiser(id: string, input: DocumentDefinition<FundraiserDocument>) {
  try {
    const fundraiser = await Fundraiser.findById(id);

    fundraiser.title = input.title;
    fundraiser.story = input.story;
    fundraiser.image_url = input.image_url;
    fundraiser.category = input.category;
    fundraiser.goal_amount = input.goal_amount;

    fundraiser.save();
    return fundraiser;
  } catch (ex: any) {
    throw new Error(ex);
  }
}

export async function unpublishFundraiser(id: string) {
  try {
    const fundraiser = await Fundraiser.findById(id);

    fundraiser.published = !fundraiser.published;

    fundraiser.save();
    return fundraiser;
  } catch (ex: any) {
    throw new Error(ex);
  }
}

export async function deleteFundraiser(id: string) {
  try {
    await Fundraiser.findByIdAndDelete(id);

    return 'deleted';
  } catch (ex: any) {
    throw new Error(ex);
  }
}
