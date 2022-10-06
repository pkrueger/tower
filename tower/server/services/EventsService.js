import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden, NotFound } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";

class EventsService {
  async getAllEvents(query) {
    const events = await dbContext.Events.find({
      isCancelled: false,
      ...query,
    }).populate("creator");
    return events;
  }
  async getEventById(eventId) {
    const event = await dbContext.Events.findById(eventId).populate("creator");
    if (!event) {
      throw new BadRequest("Bad Event Id");
    }

    return event;
  }
  async createEvent(data) {
    const event = await dbContext.Events.create(data);
    event.populate("creator");
    return event;
  }
  async doesAccountOwnEvent(eventId, userInfo) {
    const event = await this.getEventById(eventId);

    if (event.creatorId != userInfo.id) {
      throw new Forbidden("You do not own this event");
    }
    return event;
  }
  async editEvent(eventId, data, userInfo) {
    const eventObj = await this.doesAccountOwnEvent(eventId, userInfo);

    if (eventObj.isCanceled) {
      throw new BadRequest(
        "You are trying to edit an event that has already been cancelled."
      );
    }

    if (data.isCanceled) {
      data.isCanceled = !data.isCanceled;
      logger.error("You cannot cancel an event through a put request.");
    }

    const event = await dbContext.Events.findByIdAndUpdate(eventId, data);
    return event;
  }
  async cancelEvent(eventId, userInfo) {
    const event = await this.doesAccountOwnEvent(eventId, userInfo);
    event.isCanceled = true;
    event.save();
  }
  async decreaseCapacityByEventId(eventId) {
    const event = await this.getEventById(eventId);
    // @ts-ignore
    event.capacity--;
    event.save();
  }
  async increaseCapacityByEventId(eventId) {
    const event = await this.getEventById(eventId);
    // @ts-ignore
    event.capacity++;
    event.save();
  }
}

export const eventsService = new EventsService();
