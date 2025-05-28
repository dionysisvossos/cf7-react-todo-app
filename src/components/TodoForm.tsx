import { useState } from "react";

type Action =
    | {type: "ADD"; payload: string}
    | {type: "DELETE"; payload: number}


type TodoFormProps = {
    dispatch: React.Dispatch<Action>;
};

const TodoForm = ({ dispatch }: TodoFormProps) => {

    const [text, setText] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        if (text.trim() !== "") {
            dispatch({type: "ADD", payload: text});
            setText("");
        }
    };

    return (
        <>
            <form
                className="flex gap-4 mb-4"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    value={text}
                    onChange={handleChange}
                    className="flex-1 border p-2 rounded"
                    placeholder="New task.."
                />
                <button
                    type="submit"
                    className="bg-cf-dark-gray text-white px-4 py-2 rounded"
                >
                    Add
                </button>
            </form>
        </>
    )
};

export default TodoForm;