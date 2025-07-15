import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IClient extends Document {
  name: string;
  description: string;
  image: string;
  designation: string;
}

const clientSchema: Schema<IClient> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  designation: { type: String, required: true },
});

export const Client: Model<IClient> = mongoose.models.Client || mongoose.model<IClient>("Client", clientSchema);
  