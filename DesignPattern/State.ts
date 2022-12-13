/**
 * State
 * 振る舞い関連パターン
 */

export {};

/**
 * 各ステートでContextを参照しない実装
 * 利点：各ステートでContextを操作しないためシンプルに実装できる。
 * デメリット：遷移方法がContextに依存することと、遷移が不要でもinterface(abstract)で指定したStateメソッドの
 * 　　　　　　戻り値を必ず返さないいけないためコードが冗長になり、若干制御し辛い。
 * 　　　　　　遷移が不要な場合でも、現在のステート(this)を返さなけれならないが、誤って現在のステートの新規インスタンスを
 * 　　　　　　返した場合、バグが発生する可能性有り。
 */
class UserContext {
  constructor(private state: UserState) {}

  displayPage(): void {
    this.state.displayPage();
  }
  buttonClick() {
    this.state = this.state.onClick();
  }
}
interface UserState {
  displayPage(): void;
  onClick(): UserState;
}
class AuthorizedState implements UserState {
  displayPage(): void {
    console.log('TOPページ');
  }
  onClick(): UserState {
    console.log('ログアウトしました');
    return new UnAuthorizedState();
  }
}
class UnAuthorizedState implements UserState {
  displayPage(): void {
    console.log('Loginページ');
  }
  onClick(): UserState {
    console.log('ログインします');
    return new AuthorizedState();
  }
}

/**
 * 各ステートでContextを参照する実装
 * デメリット：遷移時にContextとState間でオブジェクトのやり取りを行うため、コードがわかり辛くなる。
 * メリット：State側でContextの遷移メソッドを使うことができるため、Stateインターフェースで定義したメソッドで
 * 　　　　　自由な遷移ができるようになる。（遷移が不要な場合は遷移メソッドを実行しないだけで済む。）
 * メリット２：State側でContext側のフィールドを操作することができるため、あるStateで行った変更内容をContextに保持することができる
 */
// class UserContext {
//   private userState: UserState;
//   constructor(userState: UserState) {
//     this.switchState(userState);
//   }
//   switchState(userState: UserState) {
//     this.userState = userState;
//     this.userState.setContext(this);
//   }

//   displayPage(): void {
//     this.userState.displayPage();
//   }
//   buttonClick(): void {
//     this.userState.onClick();
//   }
// }

// abstract class UserState {
//   protected userContext: UserContext;
//   setContext(userContext: UserContext) {
//     this.userContext = userContext;
//   }

//   abstract displayPage(): void;
//   abstract onClick(): void;
// }

// class AuthorizedState extends UserState {
//   displayPage(): void {
//     console.log('TOPページ');
//   }
//   onClick(): void {
//     console.log('ログアウトします');
//     this.userContext.switchState(new UnAuthorizedState());
//   }
// }

// class UnAuthorizedState extends UserState {
//   displayPage(): void {
//     console.log('Loginページ');
//   }
//   onClick(): void {
//     console.log('ログインします');
//     this.userContext.switchState(new AuthorizedState());
//   }
// }

(() => {
  const userContext = new UserContext(new UnAuthorizedState());
  userContext.displayPage();
  userContext.buttonClick();
  userContext.displayPage();
  userContext.buttonClick();
})();
