// Prototype
// 生成に関するデザインパターン
// 原型となるインスタンスをコピーして新しいインスタンスを生成する
// 親クラスでインスタンスをコピーするためのメソッドを定義
// 子クラスで自分自身のコピーを返す実装
// Manager: コピーするオブジェクトを管理しつつ、インスタンスを要求された際にコピーを返す
// Prototype Interface(abstract): インスタンスをコピーして新しいインスタンスを作るためのメソッドを定義
// Concrete Prototype Class: Prototype Interface(abstract)を実装(継承)
import _ from 'lodash';
export {};

abstract class ItemPrototype {
  constructor(public name: string, public detail: Detail = { comment: [] }) {}

  addComment(comment: string) {
    this.detail.comment.push(comment);
  }

  abstract createCopy(): ItemPrototype;
}

type Detail = { comment: string[] };

class DeepCopyItem extends ItemPrototype {
  createCopy(): ItemPrototype {
    return _.cloneDeep(this);
  }
}
class ShallowCopyItem extends ItemPrototype {
  createCopy(): ItemPrototype {
    return _.clone(this);
  }
}

class ItemManager {
  items: { [key: string]: ItemPrototype } = {};

  registerItem(key: string, item: ItemPrototype) {
    this.items[key] = item;
  }

  create(key: string) {
    if (key in this.items) {
      const item = this.items[key];
      return item.createCopy();
    }
    throw new Error('指定されたキーは存在しません');
  }
}

(() => {
  try {
    const itemMnager = new ItemManager();

    const mouse = new DeepCopyItem('マウス');
    mouse.addComment('original');

    const keyboard = new ShallowCopyItem('キーボード');
    keyboard.addComment('original');

    itemMnager.registerItem('mouse', mouse);
    itemMnager.registerItem('keyboard', keyboard);

    const clonedMouse = itemMnager.create('mouse');
    const clonedKeyboard = itemMnager.create('keyboard');

    console.log('オリジナルマウス', mouse);
    console.log('コピーマウス', clonedMouse);

    console.log('オリジナルマウス', keyboard);
    console.log('コピーマウス', clonedKeyboard);

    console.log('---------------');

    clonedMouse.addComment('copyed');
    clonedKeyboard.addComment('copyed');

    console.log('オリジナルマウス', mouse);
    console.log('コピーマウス', clonedMouse);

    console.log('オリジナルマウス', keyboard);
    console.log('コピーマウス', clonedKeyboard);
  } catch (error) {
    console.error(error);
  }
})();
