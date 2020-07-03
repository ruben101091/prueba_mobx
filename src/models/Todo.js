import { Model } from 'mobx-mc';

export default class Todo extends Model {

  urlRoot = '/todos';

  idAttribute() {
    return 'id';
  }

  get restAttributes() {
    return ['title', 'completed'];
  }

}
