import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";

export class CommentsController extends BaseController {
  constructor() {
    super("/api/comments");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createComment)
      .delete("/:commentId", this.deleteCommentById);
  }
  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;
      const comment = await commentsService.createComment(req.body);
      res.send(comment);
    } catch (error) {
      next(error);
    }
  }
  async deleteCommentById(req, res, next) {
    try {
      await commentsService.deleteCommentById(
        req.params.commentId,
        req.userInfo.id
      );
      res.send("Comment has been deleted");
    } catch (error) {
      next(error);
    }
  }
}
