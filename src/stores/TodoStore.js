import {observable, computed, reaction, action} from 'mobx';
import TodoModel from '../models/TodoModel';
import Todo from '../models/Todo';
import * as Utils from '../utils';
import { Collection } from 'mobx-mc';


export default class TodoStore extends Collection {
	@observable todos = [];

	@computed get activeTodoCount() {
		return this.todos.reduce(
			(sum, todo) => sum + (todo.completed ? 0 : 1),
			0
		)
	}

	url() {
		return '/todos';
	}

	model() {
		return Todo;
	}

	subscribeServerToStore() {
		reaction(
			() => this.toJS(),
			todos => this.set(todos, {update: true})
		);
	}

	@computed get completedCount() {
		return this.todos.length - this.activeTodoCount;
	}

	addTodo (title) {
		let todo = new Todo({
			title: title,
			completed: false
		});
		console.log(todo);
		this.add(todo);
	}

	@action
	toggleAll (checked) {
		this.todos.forEach(
			todo => todo.completed = checked
		);
	}

	@action
	clearCompleted () {
		this.todos = this.todos.filter(
			todo => !todo.completed
		);
	}

	toJS() {
		return this.todos.map(todo => todo.toJS());
	}

	static fromJS(array) {
		const todoStore = new TodoStore();
		todoStore.todos = array.map(item => TodoModel.fromJS(todoStore, item));
		return todoStore;
	}
}
