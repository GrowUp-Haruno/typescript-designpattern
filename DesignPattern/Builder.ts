/**
 * Builder
 * 生成関連パターン
 * 
 * class Product {
 *   // プロダクトクラス
 *   // trdl: 具象ビルダーから生成される結果のオブジェクト
 *   // ToDo: 具象ビルダー内でインスタンス化して結果を受け取るため、ここではフィールドと型を定義してください
 * }
 * interface Builder {
 *   // ビルダーインターフェース
 *   // trdl: プロダクトを構築する共通のステップを宣言
 *   // ToDo: 構築ステップを宣言してください
 *   // ToDo: 成果物を出力するステップを宣言してください
 * }
 * class ConcreteBuilder implements Builder {
 *   // 具象ビルダークラス
 *   // trdl: ビルダーインターフェースで宣言された各種ステップを実装
 *   // trdl: クラスのバリエーションは増やすことが可能
 *   private product: Product;
 * }
 * class Director {
 *   // ディレクタークラス
 *   // trdl: ビルダーの構築ステップを適宜並べた組み立て手順を管理
 *   constructor(public builder: Builder) {}
 * }
 */

export {};
import _ from 'lodash';

class ComputerProduct {
  motherBoard: string;
  cpu: string;
  gpu: string;
  memory: string;
  strage: string;
  os: string;
  type: 'Desktop' | 'Laptop';
}

interface ComputerBuilder {
  setMotherBoard(motherBoard: string): void;
  setCpu(cpu: string): void;
  setGpu(gpu: string): void;
  setMemory(memory: string): void;
  setStrage(strage: string): void;
  setOs(os: string): void;
  resetBuilder(): void;
}

class LaptopBuilder implements ComputerBuilder {
  private computerProduct: ComputerProduct;
  constructor() {
    this.resetBuilder();
  }
  setMotherBoard(motherBoard: string): void {
    this.computerProduct.motherBoard = motherBoard;
    console.log(`${motherBoard}を用意しました`);
  }
  setCpu(cpu: string): void {
    this.computerProduct.cpu = cpu;
    console.log(`${cpu}を装着しました`);
  }
  setGpu(gpu: string): void {
    this.computerProduct.gpu = gpu;
    console.log(`${gpu}を装着しました`);
  }
  setMemory(memory: string): void {
    this.computerProduct.memory = memory;
    console.log(`${memory}を装着しました`);
  }
  setStrage(strage: string): void {
    this.computerProduct.strage = strage;
    console.log(`${strage}を装着しました`);
  }
  setOs(os: string): void {
    this.computerProduct.os = os;
    console.log(`${os}をインストールしました`);
  }
  resetBuilder(): void {
    this.computerProduct = new ComputerProduct();
    this.computerProduct.type = 'Laptop';
    console.log('パーツ構成をクリアしました');
  }
  getComputer(): ComputerProduct {
    return _.cloneDeep(this.computerProduct);
  }
}

class DesktopBuilder implements ComputerBuilder {
  private computerProduct: ComputerProduct;
  constructor() {
    this.resetBuilder();
  }
  setMotherBoard(motherBoard: string): void {
    this.computerProduct.motherBoard = motherBoard;
    console.log(`${motherBoard}を用意しました`);
  }
  setCpu(cpu: string): void {
    this.computerProduct.cpu = cpu;
    console.log(`${cpu}を装着しました`);
  }
  setGpu(gpu: string): void {
    this.computerProduct.gpu = gpu;
    console.log(`${gpu}を装着しました`);
  }
  setMemory(memory: string): void {
    this.computerProduct.memory = memory;
    console.log(`${memory}を装着しました`);
  }
  setStrage(strage: string): void {
    this.computerProduct.strage = strage;
    console.log(`${strage}を装着しました`);
  }
  setOs(os: string): void {
    this.computerProduct.os = os;
    console.log(`${os}をインストールしました`);
  }
  resetBuilder(): void {
    this.computerProduct = new ComputerProduct();
    this.computerProduct.type = 'Desktop';
    console.log('パーツ構成をクリアしました');
  }
  getComputer(): ComputerProduct {
    return _.cloneDeep(this.computerProduct);
  }
}

class ComputerDirector {
  constructor(public computerbuilder: ComputerBuilder) {}

  highSpecBuild() {
    this.computerbuilder.resetBuilder();
    this.computerbuilder.setMotherBoard('ASRock Z790 PG Lightning/D4');
    this.computerbuilder.setCpu('Intel Core i9-13900K');
    this.computerbuilder.setGpu('Asus RTX3090');
    this.computerbuilder.setMemory('CORSAIR DDR4 32GB 3000MHz');
    this.computerbuilder.setStrage('WD BLAK SN850X');
    this.computerbuilder.setOs('Microsoft Windows 11 Pro');
  }

  lowSpecBuild() {
    this.computerbuilder.resetBuilder();
    this.computerbuilder.setMotherBoard('Asus PRIME B660M-A D4');
    this.computerbuilder.setCpu('Intel Core i3-12100');
    // オンボードGPUのためGPUは不要
    this.computerbuilder.setMemory('CORSAIR DDR4 8GB 3000MHz');
    this.computerbuilder.setStrage('SEAGATE ST1000DM010');
    this.computerbuilder.setOs('Microsoft Windows 11 Home');
  }
}

(() => {
  const laptopBuilder = new LaptopBuilder();
  const laptopDirector = new ComputerDirector(laptopBuilder);
  laptopDirector.highSpecBuild();
  console.log(laptopBuilder.getComputer());
  laptopDirector.lowSpecBuild();
  console.log(laptopBuilder.getComputer());

  const desktopBuilder = new DesktopBuilder();
  const desktopDirector = new ComputerDirector(desktopBuilder);
  desktopDirector.highSpecBuild();
  console.log(desktopBuilder.getComputer());
  desktopDirector.lowSpecBuild();
  console.log(desktopBuilder.getComputer());
})();

// class Computer {
//   type: string;
//   cpu: string;
//   ram: number;
// }

// interface ComputerBUilder {
//   addCpu(cpu: string): void;
//   addRam(ram: number): void;
// }

// class DesktopBuilder implements ComputerBUilder {
//   private computer: Computer;
//   constructor() {
//     this.computer = new Computer();
//     this.computer.type = 'Desktop';
//   }
//   addCpu(cpu: string): void {
//     this.computer.cpu = cpu;
//   }
//   addRam(ram: number): void {
//     this.computer.ram = ram;
//   }
//   getResult() {
//     return this.computer;
//   }
// }

// class LaptopBuilder implements ComputerBUilder {
//   private computer: Computer;
//   constructor() {
//     this.computer = new Computer();
//     this.computer.type = 'Laptop';
//   }
//   addCpu(cpu: string): void {
//     this.computer.cpu = cpu;
//   }
//   addRam(ram: number): void {
//     this.computer.ram = ram;
//   }
//   getResult(): Computer {
//     return this.computer;
//   }
// }

// class Director {
//   constructor(public builder: ComputerBUilder) {}
//   Construct() {
//     this.builder.addCpu('Core i5');
//     this.builder.addRam(16);
//   }
//   highSpecConstruct() {
//     this.builder.addCpu('Core i9');
//     this.builder.addRam(64);
//   }
// }

// (() => {
//   const desktopBuilder = new DesktopBuilder();
//   const desktopDirector = new Director(desktopBuilder);
//   desktopDirector.Construct();
//   const desktopComputer = desktopBuilder.getResult();
//   console.log(desktopComputer);

//   const laptopBuilder = new LaptopBuilder();
//   const laptopDirector = new Director(laptopBuilder);
//   laptopDirector.highSpecConstruct();
//   const laptopComputer = laptopBuilder.getResult();
//   console.log(laptopComputer);
// })();
