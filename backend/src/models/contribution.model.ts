import mongoose from 'mongoose';

export interface ContributionDocument extends mongoose.Document {
  userId?: string;
  amount: number;
  fundraiserId: string;
  date: Date;
}

export const contributionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false,
  },
  amount: {
    type: Number,
    required: true,
  },
  fundraiserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fundraiser',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Contribution = mongoose.model('Contribution', contributionSchema);

export default Contribution;
