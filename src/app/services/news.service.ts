import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {RequestBaseService} from "./request-base.service";
import {AuthenticationService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";
import {Activities} from "../models/news.model";
import {Observable} from "rxjs";
import { Announcements } from '../models/announcements.model';

const API_URL = `${environment.BASE_URL}/api/news`;
const API_URL_ANNOUNCEMENTS = `${environment.BASE_URL}/api/news/announcements`;

@Injectable({
  providedIn: 'root'
})
export class NewsService extends RequestBaseService{

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  saveNews(news: Activities): Observable<any> {
    return this.http.post(API_URL, news, {headers: this.getHeaders});
  }

  deleteNews(news: Activities): Observable<any> {
    return this.http.delete( `${API_URL}/${news.id}`, {headers: this.getHeaders});
  }

  getAllNews(): Observable<any> {
    return this.http.get(API_URL);
  }
}