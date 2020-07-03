import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {action} from 'mobx';
import Todo from '../models/Todo';

const ENTER_KEY = 13;

@observer
export default class TodoEntry extends React.Component {
	render() {
		return (<input
			ref="newField"
			className="new-todo"
			placeholder="What needs to be done?"
			onKeyDown={this.handleNewTodoKeyDown}
			autoFocus={true}
		/>);
	}

	@action
	handleNewTodoKeyDown = (event) => {
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();

		var val = ReactDOM.findDOMNode(this.refs.newField).value.trim();

		if (val) {
			console.log(this.props.todoStore);
			let todo = new Todo({
				title: val,
				completed: false
			});
			console.log(todo);
			this.props.todoStore.addTodo(val);
			ReactDOM.findDOMNode(this.refs.newField).value = '';
		}
	};
}

TodoEntry.propTypes = {
	todoStore: PropTypes.object.isRequired
};
