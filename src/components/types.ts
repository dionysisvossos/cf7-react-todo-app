export type TodoProps = {
    id: number;
    text:string;
}

export type Action =
    | {type: "ADD"; payload: string}
    | {type: "DELETE"; payload: number}

export type TodoFormProps = {
    dispatch: React.Dispatch<Action>;
}

export type TodoListProps = {
    todos: TodoProps[];
    dispatch: React.Dispatch<Action>
}