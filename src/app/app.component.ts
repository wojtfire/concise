import {Component} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {LoaderService} from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({opacity: 0}),
        animate(1000, style({opacity: 1}))
      ]),
      transition('* => void', [
        animate(1000, style({opacity: 0}))
      ])
    ])
  ]
})

export class AppComponent {
  title = 'concise';

  constructor(public loader: LoaderService) {
  }
}
