export interface Producto{
  id: string;
  title: string;
  description: string;
}
export class Producto{
  constructor(
  public title: string,
  public description: string,
  public id: string
  ){}
}
