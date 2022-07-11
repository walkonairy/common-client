export type Gender = "男" | "女" | "其他" | "未设置";

export default class User {
  name: string = "";
  age: number = 0;
  sex: Gender = "未设置";
}
