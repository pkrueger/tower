import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

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
  async getCommentByCommentId(commentId) {
    const comment = await dbContext.Comments.findById(commentId).populate(
      "creator"
    );

    if (!comment) {
      throw new BadRequest("Bad Comment Id");
    }
    return comment;
  }
  async deleteCommentById(commentId, accountId) {
    const comment = await this.getCommentByCommentId(commentId);

    if (comment.creatorId != accountId) {
      throw new Forbidden("You cannot delete a comment that is not your own.");
    }
    await comment.remove();
  }
}
export const commentsService = new CommentsService();
