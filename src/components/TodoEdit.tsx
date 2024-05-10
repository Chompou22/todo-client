import React, { ChangeEvent, FC, FormEvent, useState } from "react";

interface TodoEditProps {
  editTodo: (value: string, id: string) => void;
  task: {
    _id: string;
    task: string;
  };
}

const TodoEdit: FC<TodoEditProps> = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);

  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTodo(value, task._id);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={handleValue}
        className="todo-input"
        placeholder="Update task"
      />
      <button type="submit" className="todo-btn">
        Update Task
      </button>
    </form>
  );
};

export default TodoEdit;
