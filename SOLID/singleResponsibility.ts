// 単一責任の原則(Single Responsibility Principle)
// クラスはたった一つのアクターに対して責任を負うべきである

// 下記のEmployeeクラスのアクターは経理部門・人事部門・データベース管理者となっていて、
// getRegularHours()経理部門・人事部門共通のロジックとなっている
//
// class Employee {
//   constructor(public name: string, public department: string) {}
//   // 経理部門がアクター
//   calculatePay() {
//     this.getRegularHours();
//     console.log(`${this.name}の給与を計算しました`);
//   }
//   // 人事部門がアクター
//   reportHours() {
//     this.getRegularHours();
//     console.log(`${this.name}の労働時間をレポートしました`);
//   }
//   // データベース管理者がアクター
//   save() {
//     console.log(`${this.name}を保存しました`);
//   }
//   private getRegularHours() {
//     // 仕様変更前
//     console.log('経理部門・人事部門共通のロジック');
//     // 仕様変更後
//     // console.log('経理部門の仕様変更済み');
//   }
// }
//
// あるタイミングで経理部門から仕様変更の依頼を受けてgetRegularHours()をすると、
// 人事部門がgetRegularHours()を使った際にインシデントが発生する可能性がある。
// この様に3つのアクター向けにクラスを定義すると、1つのアクター向けに変更が加わると、
// 残りのアクターにも影響を受ける可能性が高まってしまう

// 解決策はアクター毎にクラスを作成する

export {};

type TDepartment = '人事' | '経理' | '開発';

class Employee {
  protected _name: string;
  protected _department?: TDepartment;

  constructor(name: string) {
    this._name = name;
  }

  get name() {
    return this._name;
  }
  get department() {
    return this._department;
  }
}

class HumanResources extends Employee {
  constructor(name: string) {
    super(name);
    super._department = '人事';
  }

  private getRegularHours() {
    console.log('人事部門共通のロジック');
  }

  reportHours(employee: Employee) {
    this.getRegularHours();
    console.log(
      `人事の${this.name}が${employee.department}:${employee.name}の労働時間をレポートしました`
    );
  }
}

class Accounting extends Employee {
  constructor(name: string) {
    super(name);
    super._department = '経理';
  }

  private getRegularHours() {
    console.log('経理部門の仕様変更済み');
  }
  calculatePay(employee: Employee) {
    this.getRegularHours();
    console.log(
      `経理の${this.name}が${employee.department}:${employee.name}の給与を計算しました`
    );
  }
}

class Engineer extends Employee {
  constructor(name: string) {
    super(name);
    super._department = '開発';
  }

  save() {
    console.log(`${this._name}がデータベースを保存しました`);
  }
}

function run() {
  const enginner = new Engineer('山田');
  const accounting = new Accounting('吉田');
  const humanResources = new HumanResources('伊藤');

  console.log('');
  console.log('開発');
  enginner.save();

  console.log('');
  console.log('経理部門');
  accounting.calculatePay(enginner);

  console.log('');
  console.log('人事部門');
  humanResources.reportHours(enginner);
}

run();
