import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { eventsService } from "./EventsService.js";

class TicketsService {
  async purchaseTicket(data) {
    const hasTicket = await this.checkIfTicketExists(
      data.eventId,
      data.accountId
    );
    // @ts-ignore
    if (hasTicket?.id) {
      throw new BadRequest("You already have a ticket for this event.");
    }

    const ticket = await dbContext.Tickets.create(data);
    await ticket.populate("profile");
    await ticket.populate("event");
    eventsService.decreaseCapacityByEventId(data.eventId);

    return ticket;
  }

  async checkIfTicketExists(eventId, accountId) {
    const ticket = await dbContext.Tickets.find({ eventId, accountId })
      .populate("profile")
      .populate("event");

    return ticket;
  }
  async getTicketsByAccountId(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId }).populate(
      "event"
    );

    if (!tickets) {
      throw new BadRequest("Bad Account Id");
    }

    return tickets;
  }
  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate(
      "profile"
    );

    if (!tickets) {
      throw new BadRequest("Bad Even Id");
    }

    return tickets;
  }
  async getTicketByTicketId(ticketId) {
    const ticket = await dbContext.Tickets.findById(ticketId).populate(
      "profile"
    );

    // @ts-ignore
    if (!ticket.id) {
      throw new BadRequest("Bad Ticket Id");
    }
    return ticket;
  }
  async removeTicket(ticketId, accountId) {
    const ticket = await this.getTicketByTicketId(ticketId);

    // @ts-ignore
    if (ticket.accountId != accountId) {
      throw new Forbidden("You cannot return a ticket you do not own.");
    }

    // @ts-ignore
    await ticket.remove();
  }
}
export const ticketsService = new TicketsService();
