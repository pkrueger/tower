import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId;

export const CommentSchema = new Schema(
  {
    creatorId: { type: ObjectId, required: true, ref: "Account" },
    eventId: { type: ObjectId, required: true, ref: "Event" },
    body: { type: String, required: true, minlength: 1, maxlength: 1000 },
    isAttending: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

CommentSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});
