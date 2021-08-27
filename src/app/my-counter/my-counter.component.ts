import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, skip, startWith, take } from 'rxjs/operators';
import { increment, decrement, reset } from '../counter.actions';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.css']
})
export class MyCounterComponent {
  count$: Observable<number>;
  // operations$: BehaviorSubject<string>;

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');

    // square ap emiited
    this.count$
      .pipe(map(res => res * res))
      .subscribe(value => console.log('map', value));

    //first 3 values
    this.count$.pipe(take(3)).subscribe(value => console.log('Take', value));

    // filteer for even
    this.count$
      .pipe(filter(result => result % 2 === 0))
      .subscribe(value => console.log('even values', value));

    //skip
    this.count$
      .pipe(skip(3))
      .subscribe(value => console.log(' fisrt 3 values skipped', value));

    //start with operator
    this.count$
      .pipe(startWith(100))
      .subscribe(value => console.log(' startwith', value));
  }

  calculate(value: string) {
    let operations$ = new BehaviorSubject<string>('');
    operations$.next(value);
    combineLatest(this.count$, operations$).subscribe(res => {
      console.log('add n mul', res);
      if (res[1] == 'add') {
        console.log('Addition ' + (res[0] + res[0]));
      } else if (res[1] == 'multiply') {
        console.log('Multiplication ' + res[0] * res[0]);
      }
    });
  }

  increment() {
    this.store.dispatch(increment());
    this.calculate('this.count$');
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  emitSquared(): Observable<number> {
    return this.count$.pipe(map(count => Math.pow(count, 2)));
  }

  reset() {
    this.store.dispatch(reset());
  }
}
