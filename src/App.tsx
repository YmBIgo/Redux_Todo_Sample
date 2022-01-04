import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux"

import {RootState} from "./states/reducers"
import {todoState} from "./states/reducers/text"
import {addTodo, removeTodo, changeTodoType} from "./states/actions"
import './App.css';

function App() {

  const dispatch = useDispatch<any>()
  const todos: todoState[] = useSelector(
          (state: RootState) => state.todos
        )
  const [filteredTodo, setFilteredTodo] = useState<todoState[]>(todos)
  const [currentKanban,setCurrentKanban] = useState<HTMLDivElement | any>()

  useEffect(() => {
    changeFilter()
  }, [todos])

  const todo0 = (): todoState[] => {
    let todo0 = filteredTodo.filter((item) => item.todoType == 0)
    return todo0
  }
  const todo1 = (): todoState[] => {
    let todo1 = filteredTodo.filter((item) => item.todoType == 1)
    return todo1
  }
  const todo2 = (): todoState[] => {
    let todo2 = filteredTodo.filter((item) => item.todoType == 2)
    return todo2
  }

  const addTodos = (todoType: number): void => {
    let textarea_input = document.getElementsByClassName("todo-textarea")[todoType] as HTMLTextAreaElement
    let textarea_input_value = textarea_input.value
    dispatch(addTodo(textarea_input_value, todoType))
    setFilteredTodo(todos)
    textarea_input.value = ""
  }

  const removeTodos = (id: number): void => {
    //
    console.log(todos)
    dispatch(removeTodo(id))
    setFilteredTodo(todos)
  }

  const changeFilter = (): void => {
    //
    let filter_input_html = document.getElementsByClassName("filter-input")[0] as HTMLInputElement
    let filter_input: string = filter_input_html.value
    if (filter_input == "") {
      setFilteredTodo(todos)
    } else {
      let filterd_todos: todoState[] = todos.filter((item) => item.text.includes(filter_input))
      setFilteredTodo(filterd_todos)
    }
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, kanban_id: number, index: number) => {
    let kanban_arrays = kanban_array()
    let kanban_index = calculate_kanban_index(kanban_arrays, kanban_id, index)
    let current_kanban = document.getElementsByClassName("kanban-ele")[kanban_index] as HTMLDivElement
    setCurrentKanban(current_kanban)
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>, kanban_id: number, index: number) => {
    currentKanban.style.opacity = "0.3"
    currentKanban.style.top = e.clientX.toString()
    currentKanban.style.left = e.clientY.toString()
  }

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>, kanban_id: number, index: number) => {
    //
    let todo_id_ele = currentKanban.getElementsByClassName("todo-id")[0] as HTMLDivElement
    let todo_id: number = parseInt(todo_id_ele.innerText)
    // currentKanban.style.position = "relative"
    if (e.clientX < 380) {
      console.log("Change Todo Type to 0")
      dispatch(changeTodoType(todo_id, 0))
      setFilteredTodo(todos)
    } else if (e.clientX >= 380 && e.clientX < 765 ) {
      console.log("Change Todo Type to 1")
      dispatch(changeTodoType(todo_id, 1))
      setFilteredTodo(todos)
    } else if (e.clientX >= 765){
      console.log("Change Todo Type to 2")
      dispatch(changeTodoType(todo_id, 2))
      setFilteredTodo(todos)
    }
  }

  const kanban_array = (): [number, number, number] => {
    //
    let kanban0 = document.getElementsByClassName("kanban0-inner")[0]
    let kanban1 = document.getElementsByClassName("kanban1-inner")[0]
    let kanban2 = document.getElementsByClassName("kanban2-inner")[0]
    let kanban0_length = kanban0.getElementsByClassName("kanban-ele").length
    let kanban1_length = kanban1.getElementsByClassName("kanban-ele").length
    let kanban2_length = kanban2.getElementsByClassName("kanban-ele").length
    return [kanban0_length, kanban1_length, kanban2_length]
  }

  const calculate_kanban_index = (kanban_array: number[], kanban_id: number, index: number): number => {
    if (kanban_id == 0){
      return 0
    } else if (kanban_id == 1){
      return kanban_array[0] + index
    } else if (kanban_id == 2){
      return kanban_array[0] + kanban_array[1] + index
    } else {
      return 0
    }
  }

  return (
    <div className="App">
      <div className="kanban-header">
        <input className="filter-input"
               placeholder="Filter Todo"
               onChange={changeFilter}
        />
      </div>
      <div className="kanban0 kanban">
        <p>
          <span className="todo-length-circle">{todo0().length}</span>
          <strong>todo</strong>
        </p>
        <div className="add-todo-area">
          <textarea className="todo-textarea">
          </textarea>
          <button onClick={() => addTodos(0)}>Add Todo</button>
        </div>
        <div className="kanban0-inner">
          {todo0().map((todo, index) => {
            return(
              <div key={todo.id}
                   className="kanban-ele"
                   onDragStart={(e) => handleDragStart(e, 0, index)}
                   onDrag={(e) => handleDrag(e, 0, index)}
                   onDragEnd={(e) => handleDragEnd(e, 0, index)}
                   style={{top:index*50+200}}
                   draggable={true}>
                <span>
                  <div className="todo-id">{todo.id}</div>
                  ✅
                </span>
                <span className="todo-text">
                  {todo.text}
                </span>
                <span className="garbage"
                      onClick={() => removeTodos(todo.id)}
                >
                  🗑
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="kanban1 kanban">
        <p>
          <span className="todo-length-circle">{todo1().length}</span>
          <strong>doing</strong>
        </p>
        <div className="add-todo-area">
          <textarea className="todo-textarea">
          </textarea>
          <button onClick={() => addTodos(1)}>Add Todo</button>
        </div>
        <div className="kanban1-inner">
          {todo1().map((todo, index) => {
            return(
              <div key={todo.id}
                   className="kanban-ele"
                   onDragStart={(e) => handleDragStart(e, 1, index)}
                   onDrag={(e) => handleDrag(e, 1, index)}
                   onDragEnd={(e) => handleDragEnd(e, 1, index)}
                   style={{top:index*50+200}}
                   draggable={true}>
                <span>
                  <span className="todo-id">{todo.id}</span>
                  ✅
                </span>
                <span className="todo-text">
                  {todo.text}
                </span>
                <span className="garbage"
                      onClick={() => removeTodos(todo.id)}  
                >
                  🗑
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="kanban2 kanban">
        <p>
          <span className="todo-length-circle">{todo2().length}</span>
          <strong>waiting</strong>
        </p>
        <div className="add-todo-area">
          <textarea className="todo-textarea">
          </textarea>
          <button onClick={() => addTodos(2)}>Add Todo</button>
        </div>
        <div className="kanban2-inner">
          {todo2().map((todo, index) => {
            return(
              <div key={todo.id}
                   className="kanban-ele"
                   onDragStart={(e) => handleDragStart(e, 2, index)}
                   onDrag={(e) => handleDrag(e, 2, index)}
                   onDragEnd={(e) => handleDragEnd(e, 2, index)}
                   style={{top:index*50+200}}
                   draggable={true}>
                <span>
                  <span className="todo-id">{todo.id}</span>
                  ✅
                </span>
                <span className="todo-text">
                  {todo.text}
                </span>
                <span className="garbage"
                      onClick={() => removeTodos(todo.id)}
                  >
                  🗑
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
