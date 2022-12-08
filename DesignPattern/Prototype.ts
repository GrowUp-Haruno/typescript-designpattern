// Prototype
// 生成に関するデザインパターン
import _ from 'lodash';
export {};

// Prototype: クローン作成のメソッドを定義
// 戻り値は自分自身を返す
interface IItemPrototype {
  clone(): IItemPrototype;
}

// Concrete Prototype
// Prototypeで定義したクローン作成メソッドを実装
// 適宜フィールドやメソッドを実装
// shallow copyだとフィールドがオブジェクトだった際に思わぬ副作用が発生するため、基本的にDeep Copyを用いる
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
