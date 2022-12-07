// Template Method
//
// 実装クラスによってはリスコフの置換原則を違反する可能性があTemplate Method
// これを回避するには親クラスを直接継承するのではなく、依存性逆転の原則を遵守したほうが良いと思う
// ITestMethodから各サービスクラスを実装できるのでオープンクローズドの原則を自動的に遵守でき、
// 直接継承の形ではなくなったので、リスコフの置換原則も自動的に遵守できる。

export {};

class ServiceTestTemplate {
  constructor(private testMethod: ITestMethod) {}

  protected teardown() {
    console.log('終了処理');
  }

  test() {
    this.testMethod.setup();
    this.testMethod.execute();
    this.teardown();
  }
}

interface ITestMethod {
  setup(): void;
  execute(): void;
}

class ItemService implements ITestMethod {
  setup(): void {
    console.log('ItemServiceのテスト準備');
  }
  execute(): void {
    console.log('ItemServiceのテスト終了処理');
  }
}

class UserService implements ITestMethod {
  setup(): void {
    console.log('UserServiceのテスト準備');
  }
  execute(): void {
    console.log('UserServiceのテスト終了処理');
  }
}

const itemService = new ItemService();
const itemServiceTest = new ServiceTestTemplate(itemService);
itemServiceTest.test();

const userService = new UserService();
const userServiceTest = new ServiceTestTemplate(userService);
userServiceTest.test();
