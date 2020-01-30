export class Weather {
  constructor(
    public temp: number,
    public name: string,
    public description: string,
    public icon: string,
    public date: Date
  ) { }
}
