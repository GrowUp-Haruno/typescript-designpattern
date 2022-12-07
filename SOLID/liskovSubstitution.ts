// リスコフの置換原則(Liskov Substitution Principle)
//
// ダメな例
// 下記の例を実行すると特にエラーは出ないが、Squareの挙動が意図しないものとなっている。
// Squareは本来、正方形の一片の長さを定義すべきだが、Rectangleを継承している関係上、widthとheightを使う必要がある。
// そこで、setHightとsetWidthは正方形の一片の長さを再現させるため、
// スーパータイプの同メソッドを「引数を縦と高さにセット」する処理をオーバーライドして正方形の一片の長さを再現している。
// ところが、console.log(f(r2, 3, 4))を実行すると、の第2引数の処理(setWidth)が第3引数の処理(setHeight)で上書きされるため、
// r.getArea()実行直前のwidthとheightは4となってしまい、最終的に戻り値は16となってしまう。
// このように、RectangleとSquareの振る舞いが異なることからリスコフの置換原則に違反していると言える
//
// // スーパータイプ
// class Rectangle {
//   width = 0;
//   height = 0;
//
//   setWidth(width: number) {
//     this.width = width;
//   }
//
//   setHight(height: number) {
//     this.height = height;
//   }
//
//   getArea(): number {
//     return this.width * this.height;
//   }
// }
//
// // サブタイプ
// class Square extends Rectangle {
//   setWidth(width: number) {
//     super.setWidth(width);
//     super.setHight(width);
//   }
//
//   setHight(height: number) {
//     super.setWidth(height);
//     super.setHight(height);
//   }
//
//   getArea(): number {
//     return this.width * this.height;
//   }
// }
//
// function f(r: Rectangle, width: number, height: number): number {
//   r.setWidth(width);
//   r.setHight(height);
//   return r.getArea();
// }
//
// function run() {
//   const r1: Rectangle = new Rectangle();
//   const r2: Rectangle = new Square();
//
//   console.log(f(r1, 3, 4));
//   console.log(f(r2, 3, 4));
// }
//
// run();

// 改善策
// OOPの継承は「is-a」関係だが、継承による「振る舞い」が同等で初めて正しい継承と言える
// 上記のコードを改善するにはスーパータイプとサブタイプを見直す必要がある
export {};

// スーパータイプ
interface IShape {
  getArea(): number;
}
// Interface Segregation Principleを併せて遵守する場合
interface IRectangle {
  width: number;
  height: number;
  setWidth(width: number): void;
  setHight(height: number): void;
}
interface ISquare {
  length: number;
  setLength(length: number): void;
}

class Rectangle implements IShape, IRectangle {
  width = 0;
  height = 0;

  setWidth(width: number) {
    this.width = width;
  }

  setHight(height: number) {
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

// サブタイプ
class Square implements IShape, ISquare {
  length = 0;

  setLength(length: number) {
    this.length = length;
  }
  getArea(): number {
    return this.length ** 2;
  }
}

function fRectangle(r: Rectangle, width: number, height: number): number {
  r.setWidth(width);
  r.setHight(height);
  return r.getArea();
}

function fSquare(s: Square, length: number): number {
  s.setLength(length);
  return s.getArea();
}

(() => {
  const rectangle = new Rectangle();
  const square = new Square();

  console.log(fRectangle(rectangle, 3, 4));
  console.log(fSquare(square, 3));
})();

// スーパータイプ(IShape)で定義しているgetAreaは「number型を返す」、
// サブタイプ(Rectangle)のgetAreaはwidthとheightの積＝「number型を返す」
// 両タイプ共にgetArea関数は「number型を返す」振る舞いとなるためリスコフの置換の原則に遵守してると言える
// また、この原則を守ることでオープンクローズドの原則を遵守することができ、
// IRectangleやISquareの様に分けることでインターフェース分離の原則を遵守することもできる