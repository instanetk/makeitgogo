import { DocumentDefinition } from 'mongoose';
import Contribution, { ContributionDocument } from '../models/contribution.model';

export async function processContribution(input: DocumentDefinition<ContributionDocument>) {
  try {
    const contribution = await Contribution.create(input);
    return contribution;
  } catch (ex: any) {
    throw new Error(ex);
  }
}
