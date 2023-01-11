import { Announcements } from "./announcements.model";

export class Activities {
    id: number | undefined;
    subject: string = "";
    description: string = "";
    validityDate: Date = new Date();
    announcement : Announcements = new Announcements();
  
    constructor(id?: number, title: string = "") {
      this.id = id;
      this.subject = title;
    }
  }