import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  image: string;
}

const projectSchema: Schema<IProject> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

export const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);
