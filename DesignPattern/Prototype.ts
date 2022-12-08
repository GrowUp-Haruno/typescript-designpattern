// Prototype
// 生成に関するデザインパターン
// 原型となるインスタンスをコピーして新しいインスタンスを生成する
// 親クラスでインスタンスをコピーするためのメソッドを定義
// 子クラスで自分自身のコピーを返す実装
// Manager: コピーするオブジェクトを管理しつつ、インスタンスを要求された際にコピーを返す
// Prototype Interface(abstract): インスタンスをコピーして新しいインスタンスを作るためのメソッドを定義
// Concrete Prototype Class: Prototype Interface(abstract)を実装(継承)
// shallow copyだとフィールドがオブジェクトだった際に思わぬ副作用（例えばクローン先のプロパティを書き換えるとオリジナルも書き変わってしまうなど）
// が発生するかもしれないので、基本的にDeep Copyを行う
// Deep copyはlodashのcloneDeepが扱いやすい

import _ from 'lodash';
export {};

interface IItemPrototype {
  clone(): IItemPrototype;
}

class ItemPrototype implements IItemPrototype {
  constructor(private _property: TProperty) {}

  setComment(comment: string): void {
    this._property.comment = comment;
  }

  get property(): TProperty {
    return this._property;
  }

  clone() {
    const copyItem = _.cloneDeep(this);
    copyItem.setComment('クローン');
    return copyItem;
  }
}

type TProperty = { name: string; comment: string };

(() => {
  const mouse = new ItemPrototype({ name: 'mouse', comment: 'オリジナル' });
  const copyedMouse = mouse.clone();
  console.log(mouse.property);
  console.log(copyedMouse.property);

  copyedMouse.setComment('デープコピーのためオリジナルは影響を受けない');
  console.log(mouse.property);
  console.log(copyedMouse.property);
})();
