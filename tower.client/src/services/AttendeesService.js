import { AppState } from "../AppState.js";
import { Attendee } from "../models/Attendee.js";
import { api } from "./AxiosService.js";

class AttendeesService {
  async getAttendeesByEventId(eventId) {
    const res = await api.get(`/api/events/${eventId}/tickets`);
    AppState.attendees = res.data.map((a) => new Attendee(a));
  }
}
export const attendeesService = new AttendeesService();
