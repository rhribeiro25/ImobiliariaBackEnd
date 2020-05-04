export interface DocInterface extends Document {
  typeVal: string;
  num: string;
  send: Date;
  due: Date;
  files: [
    {
      name: string;
      path: string;
    }
  ];
}