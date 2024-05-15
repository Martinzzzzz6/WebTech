import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  phone1: string;
  phone2?: string;
  address: {
    country: string;
    city: string;
    street: string;
    zip: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    name: { type: String, required: true },
    phone1: { type: String, required: true },
    phone2: { type: String },
    address: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      street: { type: String, required: true },
      zip: { type: String, required: true },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

UserSchema.pre("save", function (this: IUser, next) {
  this.updatedAt = new Date();
  next();
});

export const User = mongoose.model<IUser>("User", UserSchema);
