export {};

// インターフェース分離の原則(Interface Segregation Principle)
//
// interfaceからクラスを実装する際、interfeceで指定されているプロパティやメソッドの内、
// 不要なものが含まれていても実装しないとtypeエラー（ts(2420)）となる
// インターフェース分離の原則を遵守するには分割できるインターフェースはできるだけ分割する必要がある

// 悪い例
// interface Vehicle {
//   name: string;
//   color: string;
//   start(): void;
//   stop(): void;
//   fly(): void;
// }

// 改善策
interface Vehicle {
  name: string;
  color: string;
}

interface Movable {
  start(): void;
  stop(): void;
}

interface Flyable {
  fly(): void;
}

type A = Vehicle & Movable & Flyable;

class Airplane implements A {
  // class Airplane implements Vehicle, Movable, Flyable {
  constructor(public name: string, public color: string) {}
  start() {
    console.log(`${this.name} start!`);
  }
  stop() {
    console.log(`${this.name} stop!`);
  }
  fly() {
    console.log(`${this.name} fly!`);
  }
}

class Car implements Vehicle, Movable {
  constructor(public name: string, public color: string) {}

  start() {
    console.log(`${this.name} start!`);
  }
  stop() {
    console.log(`${this.name} stop!`);
  }
}

(() => {
  const v1 = new Airplane('AirBus', 'white');
  const v2 = new Car('Prius', 'black');

  v1.start();
  v1.fly();
  v1.start();
  v2.start();
  v2.stop();
})();

// Dependency Inversion Principleと併せて考えると、
// 下位クラスの抽象クラスもInterface Segregation Principleに遵守すべきである
