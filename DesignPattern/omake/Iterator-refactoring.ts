// Iteratorパターンを使わなかった場合からリファクタリングしてIteratorパターンの形に変える方法
export {};

class Patient {
  constructor(public id: number, public name: string) {}
}

// 1. WatingLoomからのクラスメソッドを抽出したインタフェースを作成
// interface IWatingLoom {
//   getPatients(): Patient[];
//   getCount(): number;
//   checkIn(patient: Patient): void;
//   hasNext(): boolean;
//   next(): Patient;
// }

// 2. Iteratorに関するメソッドを分離したインタフェースを作成
// interface IWatingLoom {
//   getPatients(): Patient[];
//   getCount(): number;
//   checkIn(patient: Patient): void;
// }
// interface IWaitingLoomIterator {
//   hasNext(): boolean;
//   next(): Patient;
// }

// 3. 分離したインタフェースを関数として接続
// この時Iterator部分は別のクラスを返す形にする
// interface IWatingLoom {
//   getPatients(): Patient[];
//   getCount(): number;
//   checkIn(patient: Patient): void;
//   getIterator(): IWatingLoomIterator;
// }
// interface IWaitingLoomIterator {
//   hasNext(): boolean;
//   next(): Patient;
// }

// 4. インタフェースを実装する
interface IWatingLoom {
  getPatients(): Patient[];
  getCount(): number;
  checkIn(patient: Patient): void;
  getIterator(): IWaitingLoomIterator;
}
class WaitingLoom implements IWatingLoom {
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

  getIterator(): IWaitingLoomIterator {
    return new WaitingLoomIterator(this);
  }
}

interface IWaitingLoomIterator {
  hasNext(): boolean;
  next(): Patient | undefined;
}
class WaitingLoomIterator implements IWaitingLoomIterator {
  private positon: number = 0;
  constructor(private waitingLoom: IWatingLoom) {}
  hasNext() {
    return this.positon < this.waitingLoom.getCount();
  }

  next() {
    if (!this.hasNext()) {
      console.log('患者がいません');
      return;
    }
    const patient = this.waitingLoom.getPatients()[this.positon];
    this.positon++;
    return patient;
  }
}

(() => {
  const waitingLoom = new WaitingLoom();
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
