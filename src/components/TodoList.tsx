import {Edit, Trash2, Save, X, Square, CheckSquare} from "lucide-react";
import type {TodoListProps} from "./types.ts";
import {useState} from "react";


// type Todo = {
//     id: number;
//     text: string;
// }
//
// type TodoListProps = {
//     todos: Todo[];
//     dispatch: React.Dispatch<{type: "DELETE"; payload: number}>
// }

const TodoList = ({todos, dispatch}: TodoListProps) =>{
const [editId, setEditId] = useState<number | null>(null);
const [editText, setEditText] = useState("");

const handleDelete = (id: number) => () => {
    dispatch({type: "DELETE", payload: id});
}

const handleEdit = (id: number, text: string) => () => {
    setEditId(id);
    setEditText(text);
}

const handleCancel = () => {
    setEditId(null);
    setEditText("");
}

const handleSave = (id: number) => () => {
    dispatch({type: "EDIT", payload: {id, newText: editText}});
    setEditId(null);
    setEditText("");
}

const handleToggle = (id: number) => () => {
    dispatch({type: "COMPLETE", payload: id});
}

    return (
        <>
            <ul className="space-y-2">
                {todos.map(todo => (
                <li key={todo.id}
                    // className="flex items-center justify-between bg-gray-100 p-2 rounded"
                    className={`flex items-center justify-between bg-gray-100 p-2 rounded 
                    ${todo.completed ? "opacity-60" : ""}`} >

                    {editId === todo.id ? (
                            <>
                            <div className="flex flex-1 gap-2">
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="border p-1 rounded flex-1 mr-2"/>

                                <button
                                    onClick={handleSave(todo.id)}
                                    className="text-cf-gray"
                                >
                                    <Save size={18}/>
                                </button>

                                <button
                                    onClick={handleCancel}
                                    className="text-cf-dark-red"
                                >
                                    <X size={18}/>
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-2 flex-1">
                                <button
                                    className="text-green-600"
                                    onClick={handleToggle(todo.id)}>
                                    {todo.completed ? (
                                        <CheckSquare size={18}/>
                                    ) : (
                                        <Square size={18}/>
                                    )}
                                </button>

                                <span>{todo.text}</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleEdit(todo.id, todo.text)}
                                    className="text-cf-gray"
                                >
                                    <Edit size={18}/>
                                </button>

                                <button
                                    onClick={handleDelete(todo.id)}
                                    className="text-cf-dark-red"
                                >
                                    <Trash2 size={18}/>
                                </button>
                            </div>
                        </>
                        )
                    }
                </li>
                ))}
            </ul>
        </>
    )
}

export default TodoList;