import {useEffect, useReducer} from 'react';
import TodoForm from "./TodoForm.tsx";
import TodoList from "./TodoList.tsx"
import type {TodoProps, Action} from "./types.ts";

const getInitialTodos = () => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
};

const todoReducer = (state: TodoProps[], action: Action): TodoProps[] => {
    switch (action.type) {
        case "ADD":
            return [...state,
                {id: Date.now(),
                text: action.payload,
                completed: false}];

        case "DELETE":
            return state.filter(todo => todo.id !== action.payload);

        case "EDIT": {
            return state.map(todo =>
                todo.id === action.payload.id
                    ? {...todo, text: action.payload.newText}
                    : todo
            )
        }

        case "COMPLETE": {
            return state.map(todo =>
                todo.id === action.payload
                    ? {...todo, completed: !todo.completed}
                    : todo
            )
        }

        case "CLEAR_ALL":
            return [];

        default:
            return state;
    }
};

const Todo = () =>{
    const [todos, dispatch] = useReducer(todoReducer, [], getInitialTodos);
    const totalTasks: number = todos.length;
    const completedTasks: number = todos.filter(todo => todo.completed).length;
    const pendingTasks: number = totalTasks - completedTasks;

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleClearAll = () => {
        dispatch({type: "CLEAR_ALL"});
    };

    return (
        <>
            <div className="max-w-sm mx-auto p-6">
                <h1 className="text-center text-2xl mb-4">To-Do List</h1>
                <TodoForm dispatch={dispatch} />
                <TodoList todos={todos} dispatch={dispatch} />

                {todos.length > 0 && (
                    <>
                        <div className="flex justify-between border-t pt-4 mt-4 text-cf-gray">
                            <span>Total: {totalTasks}</span>
                            <span>Pending: {pendingTasks}</span>
                            <span>Completed: {completedTasks}</span>
                        </div>
                        <div className="text-end mt-4">
                            <button
                                onClick={handleClearAll}
                                className="bg-cf-dark-red text-white py-2 px-4 rounded ">
                                Clear All
                            </button>
                        </div>
                    </>
                )}

            </div>
        </>
    )
};

export default Todo;