export class Attendee {
  constructor(data) {
    this.id = data.id;
    this.eventId = data.eventId;
    this.accountId = data.accountId;
    this.profile = data.profile;
    this.event = data.event;
  }
}
