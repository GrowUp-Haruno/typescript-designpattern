export {};
/**
 * Decoratorパターン
 * 実装手順
 * LoggerクラスのgetLogMessageメソッドに対して拡張行う
 */

/* 
 * 拡張元のクラス
  class Logger {
    getLogMessage(msg: string): string {
      return msg;
    }
  }
 */

// 1. Loggerクラスで拡張を行うメソッド（今回はgetLogMessage()）を抽出して、
// Componentインターフェースを作成する。
interface Component {
  getLogMessage(msg: string): string;
}

// 2. Componentインターフェースを実装したLoggerクラスに書き換える。
class Logger implements Component {
  getLogMessage(msg: string): string {
    return msg;
  }
}

// 3. Componentインターフェースを実装したDecorator抽象クラスを作成する。
//コンストラクタはComponent型を持つインスタンスを受け取れるようにする。
abstract class Decorator implements Component {
  protected component: Component;
  constructor(component: Component) {
    this.component = component;
  }
  abstract getLogMessage(msg: string): string;
}

// 4. Decoratorを実装した拡張用のクラスを作成する。
class TimestampDecorator extends Decorator {
  getLogMessage(msg: string): string {
    const date = new Date();
    const timeStamp = date.toLocaleString('ja-JP');
    // 5. 拡張元の同メソッドを呼び出して処理内容を拡張する
    return this.component.getLogMessage(`${timeStamp} ${msg}`);
  }
}

// 使い方
// 拡張クラスのコンストラクタに拡張元のインスタンスを渡してインスタンス化する。
const timestamp = new TimestampDecorator(new Logger());

