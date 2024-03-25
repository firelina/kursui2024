import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Модель';
  cookieEnabled: boolean | undefined;
  constructor() { }

  ngOnInit(): void {
    document.cookie = 'testCookie';
    this.cookieEnabled = document.cookie.indexOf('testCookie') !== -1;
  }
}
