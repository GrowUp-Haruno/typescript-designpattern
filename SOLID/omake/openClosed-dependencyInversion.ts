// おまけ
// openClosed.tsの書き方だとランクアップ処理の実装が難しくなる
// この場合は従業員ランク別のクラスをやめて、メンバークラスと従業員クラスを用意して
// 依存性逆転の原則を遵守して実装を行った方が良い

export { };

type TBonusRate = { [rank in TMembershipRank]: number };

// 上位クラス
class Employee {
  constructor(public member: IMember) {}
  getBonus(base: number, bonusRate: TBonusRate): number {
    return Math.floor(base * bonusRate[this.member.membershipRank]);
  }
  changeMembershipRank(membershipRank: TMembershipRank): void {
    this.member.membershipRank = membershipRank;
  }
}

type TMembershipRank = 'Junior' | 'Middle' | 'Senior' | 'Expart';
interface IMember {
  name: string;
  membershipRank: TMembershipRank;
  changeMembershipRank(membershipRank: TMembershipRank): void;
}

// 下位クラス
class Member implements IMember {
  constructor(public name: string, public membershipRank: TMembershipRank) {}
  changeMembershipRank(membershipRank: TMembershipRank): void {
    this.membershipRank = membershipRank;
  }
}

function run() {
  const bonusRate: TBonusRate = {
    Junior: 1.1,
    Middle: 1.5,
    Senior: 2,
    Expart: 3,
  };
  const base = 100;

  const emp1 = new Employee(new Member('Yamada', 'Junior'));
  const emp2 = new Employee(new Member('Suzuki', 'Middle'));
  const emp3 = new Employee(new Member('Tanaka', 'Senior'));

  console.log(`${emp1.member.name}: ${emp1.getBonus(base, bonusRate)}`);
  console.log(`${emp2.member.name}: ${emp2.getBonus(base, bonusRate)}`);
  console.log(`${emp3.member.name}: ${emp3.getBonus(base, bonusRate)}`);

  console.log('Rank Change');

  emp1.changeMembershipRank('Expart');
  emp2.changeMembershipRank('Expart');
  emp3.changeMembershipRank('Expart');

  console.log(`${emp1.member.name}: ${emp1.getBonus(base, bonusRate)}`);
  console.log(`${emp2.member.name}: ${emp2.getBonus(base, bonusRate)}`);
  console.log(`${emp3.member.name}: ${emp3.getBonus(base, bonusRate)}`);
}

run();

// どの原則にも言えることだが、無理やり原則に当て嵌める必要は無い