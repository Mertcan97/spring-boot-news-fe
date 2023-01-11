import {Component, OnInit, ViewChild} from '@angular/core';
import { Announcements } from 'src/app/models/announcements.model';
import {Activities} from "../../models/news.model";
import {NewsService} from "../../services/news.service";
import { AnnouncementsComponent } from '../announcements/announcements.component';
import { NewsComponent } from '../news/news.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  newsList: Array<Activities> = [];
  selectedNews: Activities = new Activities();
  errorMessage: string = "";
  
  @ViewChild(NewsComponent) child: NewsComponent | undefined;
  @ViewChild(AnnouncementsComponent) childAnnouncements: AnnouncementsComponent | undefined;
  constructor(private newsService: NewsService) { }

 

  ngOnInit(): void {
    this.newsService.getAllNews().subscribe(data => {
      this.newsList = data;
    });
  }
  createNewsRequest() {
    this.selectedNews = new Activities();
    this.child?.showNewsModal();
  }

  createAnnouncementsRequest() {
    this.selectedNews = new Activities();
    this.childAnnouncements?.showAnnouncementsModal();
  }

  editNewsRequest(item: Activities) {
    this.selectedNews = Object.assign({}, item);
    if(item.announcement.image.length>0){
      this.childAnnouncements?.showAnnouncementsModal();
    }
    else{
      this.child?.showNewsModal();
    }
  }
  saveNewsWatcher(news: Activities) {
    let itemIndex = this.newsList.findIndex(item => item.id === news.id);
    if (itemIndex !== -1) {
      this.newsList[itemIndex] = news;
    } else {
      this.newsList.push(news);
    }
    
  }
 
  deleteNews(item: Activities, ind: number) {
    this.newsService.deleteNews(item).subscribe(data => {
      this.newsList.splice(ind, 1);
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    })
  }

}