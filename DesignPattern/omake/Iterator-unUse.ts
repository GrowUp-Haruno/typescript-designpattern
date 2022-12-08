// Iteratorパターンを使わなかった場合
export {};

class Patient {
  constructor(public id: number, public name: string) {}
}

class WaitingLoom {
  private patients: Patient[] = [];
  private positon: number = 0;

  getPatients(): Patient[] {
    return this.patients;
  }

  getCount(): number {
    return this.patients.length;
  }

  checkIn(patient: Patient): void {
    this.patients.push(patient);
  }

  hasNext() {
    return this.positon < this.getCount();
  }

  next() {
    if (!this.hasNext()) {
      console.log('患者がいません');
      return;
    }
    const patient = this.getPatients()[this.positon];
    this.positon++;
    return patient;
  }
}

(() => {
  const waitingLoom = new WaitingLoom();
  waitingLoom.checkIn(new Patient(1, '山田'));
  waitingLoom.checkIn(new Patient(2, '鈴木'));
  waitingLoom.checkIn(new Patient(3, '犬山'));

  console.log(waitingLoom.next());
  console.log(waitingLoom.next());
  console.log(waitingLoom.next());
  // 後から患者を追加しても動作する
  waitingLoom.checkIn(new Patient(4, '和田'));
  console.log(waitingLoom.next());
  console.log(waitingLoom.next());
})();
