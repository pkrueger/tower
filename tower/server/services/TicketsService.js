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
    if (hasTicket.accountId) {
      throw new BadRequest("You already have a ticket for this event.");
    }

    const ticket = await dbContext.Tickets.create(data);
    await ticket.populate("profile");
    await ticket.populate("event");
    eventsService.decreaseCapacityByEventId(data.eventId);

    return ticket;
  }

  async checkIfTicketExists(eventId, accountId) {
    const ticket = await dbContext.Tickets.find({ eventId, accountId });

    if (!ticket) {
      throw new BadRequest("Bad Event or Account Id");
    }

    return ticket;
  }
  async getTicketsByAccountId(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId }).populate(
      "event"
    );

    if (!tickets.length) {
      throw new BadRequest("Bad Account Id");
    }

    return tickets;
  }
  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate(
      "profile"
    );

    if (!tickets.length) {
      throw new BadRequest("Bad Even Id");
    }

    return tickets;
  }
  async getTicketByTicketId(ticketId) {
    const ticket = await dbContext.Tickets.findById(ticketId).populate(
      "profile"
    );

    if (!ticket) {
      throw new BadRequest("Bad Ticket Id");
    }
    return ticket;
  }
  async deleteTicketById(ticketId, accountId) {
    const ticket = await this.getTicketByTicketId(ticketId);

    if (ticket.accountId != accountId) {
      throw new Forbidden("You cannot return a ticket you do not own.");
    }
    // const event = await eventsService.getEventById(ticket.eventId);

    await ticket.remove();
    await eventsService.increaseCapacityByEventId(ticket.eventId);
  }
}
export const ticketsService = new TicketsService();
