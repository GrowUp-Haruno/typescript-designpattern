export {};

class User {}

// 上位のクラス（UserController）と下位のクラス（UserService）が依存関係にある状態で
// 依存性逆転の原則（Dependency Inversion principle）を遵守するには、
// 1. 下位クラスの抽象クラスを作成
// 2. この抽象クラスから下位クラスを実装
// 3. 上位クラスのコンストラクタ引数にこの抽象クラスの方を持つインスタンスを設定する
// 4. 下位クラスをインスタンス
// 5. 上位クラスのコンストラクタに4.のインスタンスを入れてインスタンス
// することことで達成できる

// 上位クラス
class UserController {
  constructor(private userService: IUserService) {}

  create(user: User): User {
    return this.userService.create(user);
  }

  findById(id: string): User {
    return this.userService.findById(id);
  }
}

// 下位クラスの抽象クラス
interface IUserService {
  create(user: User): User;
  findById(id: string): User;
}

// 下位クラス
class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  create(user: User): User {
    return this.userRepository.create(user);
  }

  findById(id: string): User {
    return this.userRepository.findById(id);
  }
}

interface IUserRepository {
  create(user: User): User;
  findById(id: string): User;
}

class UserRdbRepository implements IUserRepository {
  create(user: User): User {
    console.log('RDBにUserを登録');
    return user;
  }

  findById(id: string): User {
    console.log(`ID: ${id}のユーザーを検索`);
    return new User();
  }
}

(()=> {
  const userRepository = new UserRdbRepository();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  userController.findById('123');
})()