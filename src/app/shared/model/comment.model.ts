export class CommentModel {
  constructor(
    public text: string,
    public notificationId: number,
    public userId: number,
    public compnayId: number,
    public id?: number
  ) {}

}
