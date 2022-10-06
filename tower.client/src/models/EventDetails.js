export class EventDetails {
  constructor(data) {
    this.id = data.id;
    this.creatorId = data.creatorId;
    this.name = data.name;
    this.description = data.description;
    this.coverImg = data.coverImg;
    this.location = data.location;
    this.capacity = data.capacity;
    this.startDate = data.startDate;
    this.isCanceled = data.isCanceled;
    this.type = data.type;
    this.creator = data.creator;
  }
}
