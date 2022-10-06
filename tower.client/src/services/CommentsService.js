import { AppState } from "../AppState.js";
import { Comment } from "../models/Comment.js";
import { api } from "./AxiosService.js";

class CommentsService {
  async getEventComments(eventId) {
    const res = await api.get(`/api/events/${eventId}/comments`);
    AppState.comments = res.data.map((c) => new Comment(c));
  }
  async addComment(data) {
    const res = await api.post("/api/comments", data);
    AppState.comments.push(new Comment(res.data));
  }
}
export const commentsService = new CommentsService();
