/**
 * State
 * 振る舞い関連パターン
 * バグ再現
 */

export {};

class CounterContext {
  constructor(private state: State) {}

  button1Click() {
    this.state = this.state.onClick1();
  }
  button2Click() {
    this.state = this.state.onClick2();
  }
  button3Click() {
    this.state = this.state.onClick3();
  }
}
interface State {
  onClick1(): State;
  onClick2(): State;
  onClick3(): State;
}
class CounterState implements State {
  private count: number = 0;

  // typeエラーが出ない形で実装
  // いずれも同じステートに留まる動作
  // return this
  onClick1(): State {
    this.count++;
    console.log(`count: ${this.count}`);
    return this;
  }

  // return new CounterState()
  onClick2(): State {
    this.count++;
    console.log(`count: ${this.count}`);
    return new CounterState();
  }

  // return void
  // これもtypeエラーは出ない
  onClick3(): State {
    this.count++;
    console.log(`count: ${this.count}`);
    return;
  }
}

// onClick1の戻り値はthis
(() => {
  const userContext = new CounterContext(new CounterState());
  userContext.button1Click();
  userContext.button1Click();
  userContext.button1Click();
  userContext.button1Click();
  userContext.button1Click();
})();
/**
 * 実行結果
 * count: 1
 * count: 2
 * count: 3
 * count: 4
 * count: 5
 */

// onClick2の戻り値はnew CounterState();
(() => {
  const userContext = new CounterContext(new CounterState());
  userContext.button2Click();
  userContext.button2Click();
  userContext.button2Click();
  userContext.button2Click();
  userContext.button2Click();
})();
/**
 * 実行結果
 * count: 1
 * count: 1
 * count: 1
 * count: 1
 * count: 1
 * 
 * button2Clickを実行する度にcountが0に初期化されるため、
 * 何度button2Clickを実行してもカウントアップの結果が保持されない
 */

// onClick3の戻り値はvoid
// 注意：バグが発生するコードです。
(() => {
  const userContext = new CounterContext(new CounterState());
  userContext.button3Click();
  userContext.button3Click();
  userContext.button3Click();
  userContext.button3Click();
  userContext.button3Click();
})();
/**
 * 実行結果
 * count: 1
 * ...
 * TypeError: Cannot read properties of undefined (reading 'onClick3')
    at CounterContext.button3Click
 * 
 * 1回目のbutton3Clickは実行されるが、Context側のthis.state = voidとなってしまうため、
 * 2回目のbutton3Clickでバグが発生する。
 * このバグはtypeエラーが出ないため気づきにくい。
 */