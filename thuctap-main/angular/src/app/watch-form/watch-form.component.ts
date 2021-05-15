import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerHttpService } from './../Services/server-http.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';
import { Watch } from '../models/Watch';

@Component({
  selector: 'app-watch-form',
  templateUrl: './watch-form.component.html',
  styleUrls: ['./watch-form.component.scss']
})
export class WatchFormComponent implements OnInit {
  public id;
  public watchForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    price: new FormControl(''),
    img: new FormControl(''),
  });
  constructor(
    private common: CommonService,
    private serverHttp: ServerHttpService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id').length > 2) {
      this.id = this.route.snapshot.paramMap.get('id')
      this.loadData(this.route.snapshot.paramMap.get('id'));


    }
    this.id = this.route.snapshot.paramMap.get('id')
  }

  private loadData(id) {
    this.serverHttp.getWatch(id).subscribe((data) => {
      console.log('getWatch', data);
      console.log(this.watchForm.controls);

      for (const controlName in this.watchForm.controls) {
        console.log(controlName);

        if (controlName) {
          this.watchForm.controls[controlName].setValue(data[0][controlName]);
        }
      }
    });
  }

  private createNewData() {
    const newWatch = {};
    for (const controlName in this.watchForm.controls) {
      if (controlName) {
        newWatch[controlName] = this.watchForm.controls[controlName].value;
      }
    }
    console.log(newWatch);

    return newWatch as Watch;
  }
  public saveAndGotoList() {
    console.log(this.id);

    if (this.id.length > 2) {
      this.serverHttp
        .modifyWatch(this.id, this.createNewData())
        .subscribe((data) => {
          this.router.navigate(['watches']);

        });

    } else {
      this.serverHttp.addWatch(this.createNewData()).subscribe((data) => {
        this.router.navigate(['watches']);

      });

    }
  }

  public save() {
    if (this.id > 2) {
      this.serverHttp
        .modifyWatch(this.id, this.createNewData())
        .subscribe((data) => {
          //
        });
    } else {
      this.serverHttp.addWatch(this.createNewData()).subscribe((data) => {
        // this.common.increamentWatch();
        this.watchForm.reset();
      });
    }
  }
}
