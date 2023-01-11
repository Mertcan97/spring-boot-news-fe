import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Activities } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';
declare var $: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  @Input() activities: Activities = new Activities();
  @Output() save = new EventEmitter<any>();

  constructor(private newsService: NewsService) { console.log("console constructor")+this.activities.description};
  saveNews() {
    console.log("save news");
    this.newsService.saveNews(this.activities).subscribe(data => {
      this.save.emit(data);
      $('#newsModal').modal('hide');
    })
  }
  showDetailModal() {
    console.log("show model"+this.activities.description);
    $('#detailModal').modal('show');
  }

}
