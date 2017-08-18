/**
 * Created by nochi0105 on 17/07/12.
 */
export class Todo {
  import_time: Date;
  deleted: Date;
  images: Array<{src: String}>;
  is_checked: boolean;
  constructor(
    public id: number,
    public title: string,
    public text: string,
    public done: boolean,
  ) {
    this.import_time = new Date();
    this.deleted = null;
    this.images = [];
  }
}
