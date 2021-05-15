import { Router } from '@angular/router';
import { ServerHttpService } from './../Services/server-http.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';
import { Watch } from '../models/Watch';

@Component({
  selector: 'app-watches',
  templateUrl: './watches.component.html',
  styleUrls: ['./watches.component.scss']
})
export class WatchesComponent implements OnInit {
  public watches: Watch[] = [];

  constructor(
    private common: CommonService,
    private serverHttp: ServerHttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData()
  }
  private loadData() {
    this.serverHttp.getWatches().subscribe((data) => {
      this.watches = data;
    });
  }

  public addWatch() {
    this.router.navigate(['watch-form', 0]);
  }

  public deleteWatch(Id) {
    this.serverHttp.deleteWatch(Id).subscribe((data) => {
      this.watches = this.watches.filter(item => Id !== item._id)

    });
  }

  public editWatch(Id) {
    this.router.navigate(['watch-form', Id]);
  }
}
