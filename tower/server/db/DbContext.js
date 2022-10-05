import mongoose from "mongoose";
import { AccountSchema } from "../models/Account";
import { CommentSchema } from "../models/Comment.js";
import { EventSchema } from "../models/Event.js";
import { TicketSchema } from "../models/Ticket.js";

class DbContext {
  Account = mongoose.model("Account", AccountSchema);
  Events = mongoose.model("Event", EventSchema);
  Tickets = mongoose.model("Ticket", TicketSchema);
  Comments = mongoose.model("Comment", CommentSchema);
}

export const dbContext = new DbContext();
