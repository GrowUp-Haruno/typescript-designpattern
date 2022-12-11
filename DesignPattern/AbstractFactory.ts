/**
 * Abstract Factory
 * 生成関連パターン
 *
 *
 */

interface AbstractProduct {
  /**
   * 抽象製品
   * 製品の種類（家具で例えると、机・椅子・テーブルなど）
   */
}
class ConcreteProductA implements AbstractProduct {
  /**
   * 具象製品
   * AbstractProductを実装する
   * 製品の種類毎を作成する
   */
}
class ConcreteProductB implements AbstractProduct {}
class ConcreteProductC implements AbstractProduct {}

interface AbstractFactory {
  /**
   * 抽象ファクトリー
   * 製品の様式（家具で例える現代風、中世風など）
   *
   */
  createProductA(): ConcreteFactoryA;
  createProductB(): ConcreteFactoryB;
  createProductC(): ConcreteFactoryC;
}
class ConcreteFactoryA implements AbstractFactory {
  /**
   * 具象ファクトリー
   * AbstractFactoryを実装する
   * 製品の様式毎にクラスを作成する
   */
  createProductA(): ConcreteFactoryA {
    return new ConcreteFactoryA();
  }
  createProductB(): ConcreteFactoryB {
    return new ConcreteFactoryB();
  }
  createProductC(): ConcreteFactoryC {
    return new ConcreteFactoryC();
  }
}
class ConcreteFactoryB implements AbstractFactory {
  createProductA(): ConcreteFactoryA {
    return new ConcreteFactoryA();
  }
  createProductB(): ConcreteFactoryB {
    return new ConcreteFactoryB();
  }
  createProductC(): ConcreteFactoryC {
    return new ConcreteFactoryC();
  }
}
class ConcreteFactoryC implements AbstractFactory {
  createProductA(): ConcreteFactoryA {
    return new ConcreteFactoryA();
  }
  createProductB(): ConcreteFactoryB {
    return new ConcreteFactoryB();
  }
  createProductC(): ConcreteFactoryC {
    return new ConcreteFactoryC();
  }
}
