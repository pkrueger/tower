import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";

class CommentsService {
  async createComment(data) {
    const comment = await dbContext.Comments.create(data);
    await comment.populate("creator");
    return comment;
  }
  async getCommentsByEventId(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate(
      "creator"
    );

    if (!comments) {
      throw new BadRequest("Invalid Event Id");
    }
    return comments;
  }
}
export const commentsService = new CommentsService();
