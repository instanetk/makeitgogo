import mongoose from 'mongoose';

export interface FundraiserDocument extends mongoose.Document {
  title: string;
  story: string;
  image_url: string;
  category: string;
  goal_amount: number;
  current_amount: number;
  date: Date;
  published: boolean;
  owner: string;
}

const fundraiserSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 255,
  },
  story: {
    type: String,
    required: true,
    minLength: 100,
    maxLength: 9999,
  },
  image_url: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  goal_amount: {
    type: Number,
    required: true,
  },
  current_amount: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  published: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: String,
    required: true,
  },
  faves: {
    type: Number,
    default: 1,
  },
});

const Fundraiser = mongoose.model('Fundraiser', fundraiserSchema);

export default Fundraiser;
