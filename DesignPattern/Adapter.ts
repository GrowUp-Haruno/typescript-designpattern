// Adapter
// Client Class: クラス機能を「利用する側」
// Targe Interface: クライアントが必要とする機能を定義
// Adaptee Class: クラス機能を「利用される側」、Client Classとは互換性が無い
// Adapter Class: Adapteeクラスを利用した処理をTarget Interfaceで定義した機能でラップする形で実装を行う
// Adapteeクラスは利用するだけ修正は行わないので再テストは不要
// ビジネスロジックはClientクラス、変換はAdapterクラスで行うので単一責任の原則を遵守できる
// ClientクラスはTarget Interfaceを介するのでオープンクローズドの原則を遵守できる
// ジュブンテスト外部クラス(サードパーティ製を含む)を利用したくてもインターフェースの互換性がない場面で使用する
export {};
class Client {
  constructor(private adapter: Target) {}
  getCsvData(): string {
    return this.adapter.getCsvData();
  }
}

interface Target {
  getCsvData(): string;
}

class NewLibrary {
  getJsonData(): {
    [key: string]: string;
  }[] {
    return [
      {
        data1: 'json_dataA',
        data2: 'json_dataB',
      },
      {
        data1: 'json_dataC',
        data2: 'json_dataD',
      },
    ];
  }
}

// 継承を利用するパターン
class JsonToCsvAdapter extends NewLibrary implements Target {
  getCsvData() {
    const jsonDatas = this.getJsonData();
    const csvHeader = Object.keys(jsonDatas[0]).join(',') + '\n';
    const csvBody = jsonDatas
      .map((jsonData) => {
        return Object.keys(jsonData)
          .map((key) => jsonData[key])
          .join(',');
      })
      .join('\n');
    return csvHeader + csvBody;
  }
}

// 委譲を利用するパターン
class JsonToCsvAdapterTransfer implements Target {
  constructor(private adaptee: NewLibrary) {}
  getCsvData() {
    const jsonDatas = this.adaptee.getJsonData();
    const csvHeader = Object.keys(jsonDatas[0]).join(',') + '\n';
    const csvBody = jsonDatas
      .map((jsonData) => {
        return Object.keys(jsonData)
          .map((key) => jsonData[key])
          .join(',');
      })
      .join('\n');
    return csvHeader + csvBody;
  }
}

// Dependency Inversion Principleを遵守したパターン
interface INewLibrary {
  getJsonData(): {
    [key: string]: string;
  }[];
}
class NewLibrary2 implements INewLibrary {
  getJsonData(): {
    [key: string]: string;
  }[] {
    return [
      {
        data1: 'json_dataA',
        data2: 'json_dataB',
      },
      {
        data1: 'json_dataC',
        data2: 'json_dataD',
      },
    ];
  }
}
class JsonToCsvAdapterDIP implements Target {
  constructor(private adaptee: INewLibrary) {}
  getCsvData() {
    const jsonDatas = this.adaptee.getJsonData();
    const csvHeader = Object.keys(jsonDatas[0]).join(',') + '\n';
    const csvBody = jsonDatas
      .map((jsonData) => {
        return Object.keys(jsonData)
          .map((key) => jsonData[key])
          .join(',');
      })
      .join('\n');
    return csvHeader + csvBody;
  }
}

(() => {
  console.log('Adapteeの内容');
  const adaptee = new NewLibrary();
  console.log(adaptee.getJsonData());

  console.log('継承を利用したパターン');
  const client = new Client(new JsonToCsvAdapter());
  console.log(client.getCsvData());

  console.log('委譲を利用したパターン');
  const client_transfer = new Client(new JsonToCsvAdapterTransfer(adaptee));
  console.log(client_transfer.getCsvData());

  console.log('DIPを遵守したパターン');
  const client_dip = new Client(new JsonToCsvAdapterDIP(adaptee));
  console.log(client_dip.getCsvData());
})();
