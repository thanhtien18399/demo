import { Router } from '@angular/router';
import { ServerHttpService } from './../Services/server-http.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';
import { Watch } from '../models/Watch';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public watches: Watch[] = [];

  constructor(private common: CommonService,
    private serverHttp: ServerHttpService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loadData()
  }
  private loadData() {
    this.serverHttp.getWatches().subscribe((data) => {
      this.watches = data;
    });
  }

}
