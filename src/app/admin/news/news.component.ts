import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Activities } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';

declare var $: any;

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {

  errorMessage: string = "";

  @Input() news: Activities = new Activities();
  @Output() save = new EventEmitter<any>();
  constructor(private newsService: NewsService) { console.log("const model")}

  saveNews() {
    console.log("save news");
    this.newsService.saveNews(this.news).subscribe(data => {
      this.save.emit(data);
      $('#newsModal').modal('hide');
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    })
  }
  showNewsModal() {
    console.log("show model")
    $('#newsModal').modal('show');
  }

}
