export const ADD_TODO: string = "ADD_TODO"
export const REMOVE_TODO: string = "REMOVE_TODO"
export const CHANGE_TODO_TYPE: string = "CHANGE_TODO_TYPE"

let nextTodoID: number = 2

export type addTodoType = {
	type: string;
	id: number;
	text: string;
	todoType: number;
}

export const addTodo = (text: string, todoType: number): addTodoType => {
	return {
		type: ADD_TODO,
		id: nextTodoID++,
		text: text,
		todoType: todoType,
	}
}

export const removeTodo = (id: number): addTodoType => {
	return {
		type: REMOVE_TODO,
		id: id,
		text: "",
		todoType: 0
	}
}

export const changeTodoType = (id: number, todoType: number): addTodoType => {
	return {
		type: CHANGE_TODO_TYPE,
		id: id,
		text: "",
		todoType: todoType
	}
}