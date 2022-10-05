import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";

export class EventsController extends BaseController {
  constructor() {
    super("/api/events");
    this.router
      .get("", this.getAllEvents)
      .get("/:eventId", this.getEventById)
      .get("/:eventId/tickets", this.getTicketsByEventId)
      .get("/:eventId/comments", this.getCommentsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createEvent)
      .put("/:eventId", this.editEvent)
      .delete("/:eventId", this.cancelEvent);
  }
  async getAllEvents(req, res, next) {
    try {
      const events = await eventsService.getAllEvents(req.query);
      res.send(events);
    } catch (error) {
      next(error);
    }
  }
  async getEventById(req, res, next) {
    try {
      const event = await eventsService.getEventById(req.params.eventId);
      res.send(event);
    } catch (error) {
      next(error);
    }
  }
  async getTicketsByEventId(req, res, next) {
    try {
      const tickets = await ticketsService.getTicketsByEventId(
        req.params.eventId
      );
      res.send(tickets);
    } catch (error) {
      next(error);
    }
  }
  async getCommentsByEventId(req, res, next) {
    try {
      const comments = await commentsService.getCommentsByEventId(
        req.params.eventId
      );
      res.send(comments);
    } catch (error) {
      next(error);
    }
  }
  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;
      const event = await eventsService.createEvent(req.body);
      res.send(event);
    } catch (error) {
      next(error);
    }
  }
  async editEvent(req, res, next) {
    try {
      const event = await eventsService.editEvent(
        req.params.eventId,
        req.body,
        req.userInfo
      );
      res.send(event);
    } catch (error) {
      next(error);
    }
  }
  async cancelEvent(req, res, next) {
    try {
      await eventsService.cancelEvent(req.params.eventId, req.userInfo);
      res.send("Your event was cancelled.");
    } catch (error) {
      next(error);
    }
  }
}
