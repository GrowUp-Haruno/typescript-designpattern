// Factory Methodパターン
// 継承を利用した生成に関するデザインパターン
// Abstract Create Class: Product Abstract Classを生成するcreateメソッドと生成方法を実装するための機能を提供
// Concrete Create Class: Abstract Create Class継承したクラス、どのように生成するかをfactoryMethodで実装して、
// 最終的にConcrete Productクラスを返却する
// Abstract Product Class: 生成される製品の機能を定義
// Concrete Product class: Abstract Product Classを実装したクラス、また機能を実装

export {};

abstract class CreditCard {
  constructor(public owner: string) {}
  getOwner() {
    return this.owner;
  }
  abstract getCardType(): string;
  abstract getAnnualChage(): number;
}

class Platinum extends CreditCard {
  getCardType(): string {
    return 'Platinum';
  }
  getAnnualChage(): number {
    return 30000;
  }
}
class Gold extends CreditCard {
  getCardType(): string {
    return 'Gold';
  }
  getAnnualChage(): number {
    return 20000;
  }
}
class Silver extends CreditCard {
  getCardType(): string {
    return 'Silver';
  }
  getAnnualChage(): number {
    return 5000;
  }
}

abstract class CreditCardFactory {
  protected abstract createCreditCard(owner: string): CreditCard;
  protected abstract registerCreditCard(creditCard: CreditCard): void;
  create(owner: string): CreditCard {
    const creditCard = this.createCreditCard(owner);
    this.registerCreditCard(creditCard);
    return creditCard;
  }
}

const creditCardDB: CreditCard[] = [];

class PlutinumCardFactory extends CreditCardFactory {
  protected createCreditCard(owner: string): CreditCard {
    return new Platinum(owner);
  }
  protected registerCreditCard(creditCard: CreditCard): void {
    creditCardDB.push(creditCard);
  }
}
class GoldCardFactory extends CreditCardFactory {
  protected createCreditCard(owner: string): CreditCard {
    return new Gold(owner);
  }
  protected registerCreditCard(creditCard: CreditCard): void {
    creditCardDB.push(creditCard);
  }
}

class SilverCardFactory extends CreditCardFactory {
  protected createCreditCard(owner: string): CreditCard {
    return new Silver(owner);
  }
  protected registerCreditCard(creditCard: CreditCard): void {
    creditCardDB.push(creditCard);
  }
}

(() => {
  const plutinumCardFactory = new PlutinumCardFactory();
  const plutinumCard = plutinumCardFactory.create('山田');
  console.log(plutinumCard);
  
  const goldCardFactory = new GoldCardFactory();
  const goldCard = goldCardFactory.create('鈴木');
  console.log(goldCard);
  
  const silverCardFactory = new SilverCardFactory();
  const silverCard = silverCardFactory.create('辰木');
  console.log(silverCard);
})();
