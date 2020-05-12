export class NotificationModel {
  constructor(
    public name: string,
    public about: string,
    public interests: string[],
    public timeBegin?: string,
    public timeEnd?: string,
    public day?: string,
    public region?: string,
    public city?: string,
    public userId?: number,
    public companyId?: number,
    public commentsId?: number[],
    public id?: number
  ) {}
}
