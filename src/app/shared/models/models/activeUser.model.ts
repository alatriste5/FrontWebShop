export class activeUser{
  constructor(
    public id: number,
    public username: string,
    public name: string,
    public email: string,
    public addressid: number,
    public role: string,
    private _token: string,
    public registeredIn: number
  ) {}

  get token(){
    return this._token;
  }
}
