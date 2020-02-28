import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ルート管理画面';

  text = 'Angular 5\nfoo';
  enabled = false;
}
