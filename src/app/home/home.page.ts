import { Component, OnInit } from '@angular/core';
import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  isDevMode: boolean;

  constructor() {}

  ngOnInit() {
    this.isDevMode = isDevMode();
  }

}
