/**
 * Stateパターン
 * Contextによるデータ保持
 * 
 * Stateにデータを持たせた場合、ステートを切り替える度に初期される。
 * データを保持したい場合はContextにフィールド変数を用意して、
 * ContextとState間で相互リンクした上でState側からContext側のフィールドにアクセスすることで
 * データ保持が実現できる
 */
class CounterContext {
  private _counterState: CounterState;
  constructor(initialState: CounterState) {
    this.setState(initialState);
  }
  setState(newState: CounterState) {
    this._counterState = newState;
    this._counterState.setContext(this);
  }

  private _counter1: number = 0;
  addCounter1() {
    this._counter1++;
  }

  private _counter2: number = 0;
  addCounter2() {
    this._counter2++;
  }

  private _counter3: number = 0;
  addCounter3() {
    this._counter3++;
  }

  getCounter() {
    console.log(`counter1: ${this._counter1}`);
    console.log(`counter2: ${this._counter2}`);
    console.log(`counter3: ${this._counter3}`);
  }

  countUp(): void {
    this._counterState.countUp();
  }
  next(): void {
    console.log('');
    this._counterState.next();
  }
  prev(): void {
    console.log('');
    this._counterState.prev();
  }
}

abstract class CounterState {
  protected _counterContext: CounterContext;
  constructor() {
    console.log(`現在のステート：${this.constructor.name}`);
  }
  setContext(newContext: CounterContext): void {
    this._counterContext = newContext;
  }

  abstract countUp(): void;
  abstract next(): void;
  abstract prev(): void;
}

class CounterState1 extends CounterState {
  countUp(): void {
    console.log('---------------------------');
    console.log('Counter1 Count Up!');
    this._counterContext.addCounter1();
    this._counterContext.getCounter();
  }
  next(): void {
    this._counterContext.setState(new CounterState2());
  }
  prev(): void {
    this._counterContext.setState(new CounterState3());
  }
}
class CounterState2 extends CounterState {
  countUp(): void {
    console.log('---------------------------');
    console.log('Counter2 Count Up!');
    this._counterContext.addCounter2();
    this._counterContext.getCounter();
  }
  next(): void {
    this._counterContext.setState(new CounterState3());
  }
  prev(): void {
    this._counterContext.setState(new CounterState1());
  }
}
class CounterState3 extends CounterState {
  countUp(): void {
    console.log('---------------------------');
    console.log('Counter3 Count Up!');
    this._counterContext.addCounter3();
    this._counterContext.getCounter();
  }
  next(): void {
    this._counterContext.setState(new CounterState1());
  }
  prev(): void {
    this._counterContext.setState(new CounterState2());
  }
}

(() => {
  const counterContext = new CounterContext(new CounterState1());
  // CounterState1
  counterContext.countUp();
  counterContext.countUp();
  counterContext.next();

  // CounterState2
  counterContext.countUp();
  counterContext.countUp();
  counterContext.next();

  // CounterState3
  counterContext.countUp();
  counterContext.countUp();
  counterContext.next();

  // CounterState1
  counterContext.countUp();
  counterContext.countUp();
  counterContext.prev();

  // CounterState3
  counterContext.countUp();
  counterContext.countUp();
  counterContext.prev();

  // CounterState2
  counterContext.countUp();
  counterContext.countUp();
  counterContext.prev();

  // CounterState1
  counterContext.countUp();
  counterContext.countUp();
  counterContext.prev();

  // CounterState3
  counterContext.countUp();
  counterContext.countUp();
})();


/**
実行結果

現在のステート：CounterState1
---------------------------
Counter1 Count Up!
counter1: 1
counter2: 0
counter3: 0
---------------------------
Counter1 Count Up!
counter1: 2
counter2: 0
counter3: 0

現在のステート：CounterState2
---------------------------
Counter2 Count Up!
counter1: 2
counter2: 1
counter3: 0
---------------------------
Counter2 Count Up!
counter1: 2
counter2: 2
counter3: 0

現在のステート：CounterState3
---------------------------
Counter3 Count Up!
counter1: 2
counter2: 2
counter3: 1
---------------------------
Counter3 Count Up!
counter1: 2
counter2: 2
counter3: 2

現在のステート：CounterState1
---------------------------
Counter1 Count Up!
counter1: 3
counter2: 2
counter3: 2
---------------------------
Counter1 Count Up!
counter1: 4
counter2: 2
counter3: 2

現在のステート：CounterState3
---------------------------
Counter3 Count Up!
counter1: 4
counter2: 2
counter3: 3
---------------------------
Counter3 Count Up!
counter1: 4
counter2: 2
counter3: 4

現在のステート：CounterState2
---------------------------
Counter2 Count Up!
counter1: 4
counter2: 3
counter3: 4
---------------------------
Counter2 Count Up!
counter1: 4
counter2: 4
counter3: 4

現在のステート：CounterState1
---------------------------
Counter1 Count Up!
counter1: 5
counter2: 4
counter3: 4
---------------------------
Counter1 Count Up!
counter1: 6
counter2: 4
counter3: 4

現在のステート：CounterState3
---------------------------
Counter3 Count Up!
counter1: 6
counter2: 4
counter3: 5
---------------------------
Counter3 Count Up!
counter1: 6
counter2: 4
counter3: 6

 */