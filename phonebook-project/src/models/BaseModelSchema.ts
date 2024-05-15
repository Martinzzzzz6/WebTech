import { Schema, model } from 'mongoose';

const BaseSchema = new Schema(
    {
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export const BaseModel = model('Base', BaseSchema);
