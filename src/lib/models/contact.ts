import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  mobile: string;
  city: string;
}

const contactSchema: Schema<IContact> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  city: { type: String, required: true },
});

export const Contact: Model<IContact> = mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);
  