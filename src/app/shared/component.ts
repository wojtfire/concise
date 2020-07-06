import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

export abstract class BaseComponent implements OnDestroy {
  destroy$ = new Subject<any>();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
