import {combineReducers} from "redux"
import {texts, todoState} from "./text"

export type RootState = {
	todos: todoState[]
}

export const reducer = combineReducers({
		todos: texts,
	})
