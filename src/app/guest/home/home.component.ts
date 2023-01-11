import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsComponent } from 'src/app/admin/news/news.component';
import {Activities} from "../../models/news.model";
import {NewsService} from "../../services/news.service";
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  activitiesList: Array<Activities> = [];
  errorMessage: string = "";
  infoMessage: string = "";
  selectedActivities: Activities = new Activities();

  @ViewChild(DetailComponent) child: DetailComponent | undefined;
  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getAllNews().subscribe(data => {
      this.activitiesList = data;
    })
  }

  DetailRequest(item: Activities) {
    this.selectedActivities = Object.assign({}, item);
        console.log("read..."+this.selectedActivities.description);

    this.child?.showDetailModal();
  }
  saveNewsWatcher(news: Activities) {
    console.log("deneme detay");
    let itemIndex = this.activitiesList.findIndex(item => item.id === news.id);
    if (itemIndex !== -1) {
      this.activitiesList[itemIndex] = news;
    } else {
      this.activitiesList.push(news);
    }
    
  }

}
