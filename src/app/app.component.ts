import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {setTheme} from "ngx-bootstrap/utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Project';

  constructor(private router: Router) {
    setTheme('bs4');
  }
  ngOnInit() {
    this.router.navigate(['auth']);
  }
}
