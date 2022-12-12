/**
 * Abstract Factory
 * 生成関連パターン
 */

interface AbstractProduct {
  /**
   * 抽象製品
   * 製品の種類（家具で例えると、机・椅子・テーブルなど）
   */
  createProduct(): string;
}
class Desk implements AbstractProduct {
  /**
   * 具象製品
   * AbstractProductを実装する
   * 製品の種類毎を作成する
   */
  private product = '机';
  constructor(private styleName: string) {}
  createProduct() {
    return `${this.styleName}調の${this.product}`;
  }
}
class Chair implements AbstractProduct {
  private product = 'イス';
  constructor(private styleName: string) {}
  createProduct() {
    return `${this.styleName}調の${this.product}`;
  }
}
class Table implements AbstractProduct {
  private product = 'テーブル';
  constructor(private styleName: string) {}
  createProduct() {
    return `${this.styleName}調の${this.product}`;
  }
}

interface AbstractStyleFactory {
  /**
   * 抽象ファクトリー
   * 製品の様式（家具で例える現代風、中世風など）
   */
  createDesk(): AbstractProduct;
  createChair(): AbstractProduct;
  createTable(): AbstractProduct;
}

class VictoriaStyle implements AbstractStyleFactory {
  /**
   * 具象ファクトリー
   * AbstractFactoryを実装する
   * 製品の様式毎にクラスを作成する
   */
  private styleName = 'ビクトリア';
  createDesk() {
    return new Desk(this.styleName);
  }
  createChair() {
    return new Chair(this.styleName);
  }
  createTable() {
    return new Table(this.styleName);
  }
}

class NeogothicStyle implements AbstractStyleFactory {
  private styleName = 'ネオゴシック';
  createDesk() {
    return new Desk(this.styleName);
  }
  createChair() {
    return new Chair(this.styleName);
  }
  createTable() {
    return new Table(this.styleName);
  }
}

class ChicagoStyle implements AbstractStyleFactory {
  private styleName = 'シカゴ';
  createDesk() {
    return new Desk(this.styleName);
  }
  createChair() {
    return new Chair(this.styleName);
  }
  createTable() {
    return new Table(this.styleName);
  }
}

const test = (StyleFactory: AbstractStyleFactory) => {
  const desk = StyleFactory.createDesk();
  const chari = StyleFactory.createChair();
  const table = StyleFactory.createTable();

  console.log('------------------------------------');
  console.log(`${desk.createProduct()}を製作しました。`);
  console.log(`${chari.createProduct()}を製作しました。`);
  console.log(`${table.createProduct()}を製作しました。`);
};

test(new VictoriaStyle());
test(new NeogothicStyle());
test(new ChicagoStyle());
