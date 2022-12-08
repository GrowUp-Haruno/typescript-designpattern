// Iteratorパターン
// コレクション（連想配列や配列などのデータがまとまって格納されたもの）の内部構造をClientに見せずに、その要素を順番にアクセスする方法を提供する
// 振る舞いに関するデザインパターン
// Iterator Interface: コレクションを探索するために必要な機能（hasNext()とNext()）を定義
// ConcreteIterator Class: Iteratorインタフェース（hasNext()とNext()）を実装、コレクションはaggregate
// Aggreagate Interface: 探索を行うコレクションを表すインターフェース、Iteratorを生成するためのメソッドを定義
// ConcreteAggregate: Aggreagateインターフェースを実装

export {};

class Patient {
  constructor(public id: number, public name: string) {}
}

interface IITerator {
  hasNext(): boolean;
  next(): void;
}

interface IAgregate {
  getIterator(): IITerator;
}
class WaitingLoom implements IAgregate {
  private patients: Patient[] = [];

  getPatients(): Patient[] {
    return this.patients;
  }

  getCount(): number {
    return this.patients.length;
  }

  checkIn(patient: Patient): void {
    this.patients.push(patient);
  }

  getIterator(): IITerator {
    return new WaitingLoomIterator(this);
  }
}

class WaitingLoomIterator implements IITerator {
  private positon: number = 0;

  constructor(private aggregate: WaitingLoom) {}

  hasNext() {
    return this.positon < this.aggregate.getCount();
  }

  next() {
    if (!this.hasNext()) {
      console.log('患者がいません');
      return;
    }
    const patient = this.aggregate.getPatients()[this.positon];
    this.positon++;
    return patient;
  }
}

(() => {
  const waitingLoom = new WaitingLoom()
  waitingLoom.checkIn(new Patient(1, '山田'));
  waitingLoom.checkIn(new Patient(2, '鈴木'));
  waitingLoom.checkIn(new Patient(3, '犬山'));
  
  const waitingLoomIterator = waitingLoom.getIterator();
  console.log(waitingLoomIterator.next());
  console.log(waitingLoomIterator.next());
  console.log(waitingLoomIterator.next());
  // 後から患者を追加しても動作する
  waitingLoom.checkIn(new Patient(4, '和田'));
  console.log(waitingLoomIterator.next());
  console.log(waitingLoomIterator.next());
  
})();
