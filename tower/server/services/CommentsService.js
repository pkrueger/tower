import { dbContext } from "../db/DbContext.js";

class CommentsService {
  async createComment(data) {
    const comment = await dbContext.Comments.create(data);
    await comment.populate("creator");
    return comment;
  }
}
export const commentsService = new CommentsService();
