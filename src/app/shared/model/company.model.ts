export class Company {
  constructor(
    public login: string,
    public email: string,
    public password: string,
    public avaUrl?: string,
    public nick?: string,
    public companyName?: string,
    public about?: string,
    public region?: string,
    public city?: string,
    public interests?: string[],
    public dateReg?: string,
    public idNotification?: number[],
    public idFriends?: number[],
    public idMessages?: number[],
    public idComments?: number[],
    public id?: number
  ) { }
}
