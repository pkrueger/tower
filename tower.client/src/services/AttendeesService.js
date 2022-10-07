import { AppState } from "../AppState.js";
import { Attendee } from "../models/Attendee.js";
import { api } from "./AxiosService.js";

class AttendeesService {
  async getAttendeesByEventId(eventId) {
    const res = await api.get(`/api/events/${eventId}/tickets`);
    AppState.attendees = res.data.map((a) => new Attendee(a));
  }
  async getAttendeesByAccountId() {
    const res = await api.get("/account/tickets");
    AppState.attendees = res.data.map((a) => new Attendee(a));
  }
  async becomeAttendee(eventId) {
    const res = await api.post("/api/tickets", { eventId });
    AppState.attendees.push(new Attendee(res.data));
    AppState.activeEvent.capacity--;
  }
  async returnTicket(ticketId) {
    await api.delete(`/api/tickets/${ticketId}`);
    const ticket = AppState.attendees.find((t) => t.id == ticketId);
    const event = AppState.events.find((e) => e.id == ticket.eventId);
    AppState.attendees = AppState.attendees.filter((a) => a.id != ticketId);

    if (event) {
      event.capacity++;
    }
  }
}
export const attendeesService = new AttendeesService();
