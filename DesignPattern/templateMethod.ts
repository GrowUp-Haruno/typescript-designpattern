// Template Method
// 振る舞いに関する継承を利用したデザインパターン
// 親クラスで処理の枠組みを決めて、子クラスで枠組みの具体的な内容を定めるパターン
// 親クラスはAbstractClassで、処理全体の流れを決定するテンプレートメソッドとテンプレートメソッドで使用する抽象メソッドで構成されている
// 子クラスはConcreteClassで、親クラスを継承して抽象メソッドの実装を行う
// Abstract Classで非抽象メソッド（テンプレートメソッドも含む）をオーバーライドするとリスコフの置換原則に違反する可能性があるため、注意が必要
// 実装クラスによってはリスコフの置換原則を違反する可能性がある点も注意

export {};

// Abstract Class
abstract class ServiceTestTemplate {
  test() {
    this.setup();
    this.execute();
    this.teardown();
  }
  protected abstract setup(): void;
  protected abstract execute(): void;

  protected teardown() {
    console.log('終了処理');
  }
}

// Concrete Class
class ItemServiceTest extends ServiceTestTemplate {
  protected setup(): void {
    console.log('ItemServiceTestのテスト準備');
  }
  protected execute(): void {
    console.log('ItemServiceTestのテスト終了処理');
  }
}

// Concrete Class
class UserServiceTest extends ServiceTestTemplate {
  protected setup(): void {
    console.log('UserServiceTestのテスト準備');
  }
  protected execute(): void {
    console.log('UserServiceTestのテスト終了処理');
  }
}

const itesServiceTest = new ItemServiceTest();
itesServiceTest.test();

const userServiceTest = new UserServiceTest();
userServiceTest.test();
