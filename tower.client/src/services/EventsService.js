import { AppState } from "../AppState.js";
import { EventDetails } from "../models/EventDetails.js";
import { api } from "./AxiosService.js";

class EventsService {
  async getEvents(type = "") {
    let res;
    if (type) {
      res = await api.get("/api/events", { params: { type } });
    } else {
      res = await api.get("/api/events");
    }
    AppState.events = res.data.map((e) => new EventDetails(e));
  }
  async getEventById(eventId) {
    const res = await api.get("/api/events/" + eventId);
    AppState.activeEvent = new EventDetails(res.data);
  }
  async cancelEvent(eventId) {
    const res = await api.delete("/api/events/" + eventId);
    AppState.activeEvent.isCanceled = true;
  }
}
export const eventsService = new EventsService();
