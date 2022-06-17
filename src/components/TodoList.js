import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

const getLocalItems = () => {
  let list = localStorage.getItem('todos');
  if (list) {
    return JSON.parse(localStorage.getItem('todos'));
  } 
  else {
    return [];
  }
}

function TodoList() {
  const [todos, setTodos] = useState(getLocalItems);
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    console.log('called')
    let temp = [...todos]
    let fillteredTemp = temp.filter((item) => item.id !== id);
    let fillteredCompletedTemp = temp.filter((item) => item.id === id);
    let newupdatedTodos = fillteredCompletedTemp.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    // let updatedTodos = todos.map((todo) => {
    //   if (todo.id === id) {
    //     todo.isComplete = !todo.isComplete;
    //   }
    //   return todo;
    // });
    fillteredTemp.push(newupdatedTodos[0]);
    setTodos(fillteredTemp);
  };

  const removeAll = () => {
    setTodos([]);
  }

  return (
    <>
      <div className="flex">
        <h1>My TODO List</h1>
        <button className="btn" onClick={removeAll}>Remove All</button>
      </div>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
