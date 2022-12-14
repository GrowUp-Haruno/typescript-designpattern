/**
 * Decoratorパターン
 * 別名：Wrapperパターン
 * 振る舞い関連パターン
 * 
 * 検証済みクラスに対して変更を加えたり、
 * 継承を使わずに機能を追加したい場合に用いる手法
 */

interface Component {
  getLogMessage(msg: string): string;
}

class Logger implements Component {
  getLogMessage(msg: string): string {
    return msg;
  }
}

abstract class Decorator implements Component {
  protected component: Component;
  constructor(component: Component) {
    this.component = component;
  }

  abstract getLogMessage(msg: string): string;
}

class TimestampDecorator extends Decorator {
  getLogMessage(msg: string): string {
    const date = new Date();
    const timeStamp = date.toLocaleString('ja-JP');
    return this.component.getLogMessage(`${timeStamp} ${msg}`);
  }
}
class LogLevelDecorator extends Decorator {
  private logLevel: string;
  constructor(component: Component, logLevel: string) {
    super(component);
    this.logLevel = logLevel;
  }
  getLogMessage(msg: string): string {
    return this.component.getLogMessage(`${this.logLevel} ${msg}`);
  }
}

(() => {
  const logger = new Logger();
  const logLever = new LogLevelDecorator(logger, 'Info');
  const timeStamp = new TimestampDecorator(logLever);

  // Design pattern
  // 等価関数：logger.getLogMessage(msg)
  console.log(logger.getLogMessage('Design pattern'));

  // Info Design pattern
  // 等価関数：logger.getLogMessage(logLevel + msg)
  console.log(logLever.getLogMessage('Design pattern'));

  // Info 2022/12/13 16:32:31 Design pattern
  // 等価関数：logger.getLogMessage(logLevel + logLevel.getLogMessage(timeStamp + msg))
  console.log(timeStamp.getLogMessage('Design pattern'));
})();
