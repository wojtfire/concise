import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {CreditCard} from '../../store/state/credit-card.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  orderPayment(selectedCard: CreditCard, summaryPrice: number): Observable<HttpResponse<any>> {
    return fakeObservable(1500);
  }

  addCreditCard(card: CreditCard) {
    return fakeObservable(1000, card);
  }
}

export function fakeObservable(time: number, data?: any): Observable<HttpResponse<any>> {
  return new Observable(observer => {
    setTimeout(() => {
      const res: HttpResponse<any> = new HttpResponse().clone({status: 200, body: data ? data : null});
      observer.next(res);
      observer.complete();
    }, time);
  });
}
