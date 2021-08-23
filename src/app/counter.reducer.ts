import { createReducer, on } from '@ngrx/store';
import { decrement, reset, increment } from './counter.actions';

export const initialState = 0;

const _counterReducer = createReducer(
  initialState,
  on(increment, (state, payload) => {
    return state + 1;
  }),
  on(decrement, (state, payload) => {
    return state - 1;
  }),
  on(reset, state => 0)
);

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}

/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/
