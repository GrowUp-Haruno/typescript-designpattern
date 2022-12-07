// オープンクローズドの原則(Open Closed Principle)
//
// 拡張に対して開かれており（オープン）、修正に対して閉じている（クローズド）
// ソフトウェアの拡張は既存の成果物を変更を与えずに実装すべきである
//
// 例えば下記のクラスメソッドに対して、後から条件式を追加して処理を拡張すると
// 既存の成果物であるgetBonusメソッドに変更を加えていることになるため、この原則に違反してしまう。
// また拡張した場合はクラスに対して再テストが必要になる。
// getBonus(employee: Employee): number {
//     if (employee.grade === "junior") {
//         return Math.floor(this.base * 1.1);
//     } else if (employee.grade === "middle") {
//         return Math.floor(this.base * 1.5);
//     } else if (employee.grade === "senior") {
//         return Math.floor(this.base * 2);
//     } else {
//         return Math.floor(this.base * 3);
//     }
// }

// 改善策
// getBounus()は条件式で会員別の処理を行なっているが、クリーンコードの観点から見ると、
// 例えば、new Employee('Yamada', 'junior')の場合、getBounus()の
//  if (employee.grade === 'junior') {
//    return Math.floor(this.base * 1.1);
//  }
//　以外の条件式は絶対に実行されないため全て無駄な処理となる
// そこで各会員ランク別にクラスを定義するとことで、後から別の会員ランクの実装が楽になる

export {};

interface IEmployee {
  name: string;
  getBonus(base: number): number;
}

class JuniorEmployee implements IEmployee {
  constructor(public name: string) {}
  getBonus(base: number) {
    return Math.floor(base * 1.1);
  }
}
class MiddleEmployee implements IEmployee {
  constructor(public name: string) {}
  getBonus(base: number) {
    return Math.floor(base * 1.5);
  }
}
class SeniorEmployee implements IEmployee {
  constructor(public name: string) {}
  getBonus(base: number) {
    return Math.floor(base * 2);
  }
}

class ExpartEmployee implements IEmployee {
  constructor(public name: string) {}
  getBonus(base: number) {
    return Math.floor(base * 3);
  }
}

function run() {
  const emp1 = new JuniorEmployee('Yamada');
  const emp2 = new SeniorEmployee('Suzuki');
  const emp3 = new ExpartEmployee('Tanaka');

  const base = 100;

  console.log(emp1.getBonus(base));
  console.log(emp2.getBonus(base));
  console.log(emp3.getBonus(base));
}

run();
