import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";

export class TicketsController extends BaseController {
  constructor() {
    super("/api/tickets");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.purchaseTicket)
      .delete("/:ticketId", this.returnTicket);
  }
  async purchaseTicket(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id;
      const ticket = await ticketsService.purchaseTicket(req.body);
      res.send(ticket);
    } catch (error) {
      next(error);
    }
  }
  async returnTicket(req, res, next) {
    try {
      await ticketsService.deleteTicketById(
        req.params.ticketId,
        req.userInfo.id
      );
      res.send("Ticket was returned.");
    } catch (error) {
      next(error);
    }
  }
}
