import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Announcements } from 'src/app/models/announcements.model';
import { Activities } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';
declare var $: any;

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})

export class AnnouncementsComponent {
  errorMessage: string = "";
  @Input() activities: Activities = new Activities();
  @Output() save = new EventEmitter<any>();
  constructor(private newsService: NewsService) {     console.log("const model")
}

  saveAnnouncements() {
    console.log("save news");
    this.newsService.saveNews(this.activities).subscribe(data => {
      this.save.emit(data);
      $('#announcementModal').modal('hide');
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    })
  }
  showAnnouncementsModal() {
    console.log("show model")
    $('#announcementModal').modal('show');
  }
}
