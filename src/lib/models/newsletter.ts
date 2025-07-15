import mongoose, { Document, Model, Schema } from 'mongoose';

export interface INewsletter extends Document {
  email: string;
}

const newsletterSchema: Schema<INewsletter> = new Schema({
  email: { type: String, required: true, unique: true },
});

export const Newsletter: Model<INewsletter> = mongoose.models.Newsletter || mongoose.model<INewsletter>("Newsletter", newsletterSchema); 