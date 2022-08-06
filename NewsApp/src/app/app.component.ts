import { NewsService } from './service/news.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'NewsApp';
  public sources: any = [];
  public articles: any = [];
  selectedNewsChannel: string = "Top 10 Trending News!";

  @ViewChild(MatSidenav) sideNav!: MatSidenav
  constructor(private observer: BreakpointObserver,
    private cdr: ChangeDetectorRef, private newsApi: NewsService) {

  }

  ngOnInit(): void {
    this.newsApi.initArticles().subscribe((res: any) => {
      console.log(res);
      this.articles = res.articles;
    })
    this.newsApi.initSources().subscribe((res: any) => {
      console.log(res);
      this.sources = res.sources;
    })


  }

  ngAfterViewInit(): void {
    this.sideNav.opened = true;
    this.observer.observe(['(max-width:787px)']).subscribe((res) => {
      if (res?.matches) {
        this.sideNav.mode = "over"
        this.sideNav.close();
      } else {
        this.sideNav.mode = "side"
        this.sideNav.open();
      }
    });
    this.cdr.detectChanges();
  }

  searchSource(source: any) {
    this.newsApi.getArticlesByID(source.id)
      .subscribe((res: any) => {
        this.selectedNewsChannel = source.name
        this.articles = res.articles;
      })
  }


}
