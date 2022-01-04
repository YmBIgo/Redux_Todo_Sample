import {ADD_TODO, REMOVE_TODO, CHANGE_TODO_TYPE, addTodoType} from "../actions"

export type todoState = {
	id: number;
	text: string;
	todoType: number;
}

const initialState = [
	{id: 0, text: "test", todoType: 0},
	{id: 1, text: "test hoge", todoType: 1}
]

export const texts = (
	state: todoState[] = initialState,
	action: addTodoType
	) => {
	switch(action.type) {
		case ADD_TODO:
			return [...state,
					{id: action.id, text: action.text, todoType: action.todoType}
				   ]
		case REMOVE_TODO:
			return state.filter((item) => item.id != action.id)
		case CHANGE_TODO_TYPE:
			let new_state: todoState[] = [];
			state.forEach((item: todoState) => {
				if (item["id"] == action.id){
					new_state.push({id: action.id, text: item["text"], todoType: action.todoType})
				} else {
					new_state.push(item)
				}
			})
			return new_state
		default:
			return state
	}

}