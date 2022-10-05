import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId;

export const EventSchema = new Schema(
  {
    creatorId: {
      type: ObjectId,
      required: true,
      ref: "Account",
    },
    name: { type: String, required: true, minlength: 1, maxlength: 100 },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },
    coverImg: { type: String, required: true, maxlength: 500 },
    location: { type: String, required: true, maxlength: 500 },
    capacity: { type: Number, required: true },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, default: false },
    type: { type: String, enum: ["concert", "convention", "sport", "digital"] },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

EventSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});
