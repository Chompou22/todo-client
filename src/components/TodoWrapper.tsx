import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {
  addTodo,
  deleteTodo,
  editTask,
  editTodo,
  toggleCompleted,
} from "../store/slices/todoSlice";

import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTaskMutation,
  useEditTodoMutation,
  useFetchTodoQuery,
  useToggleCompleteMutation,
} from "../store/apis/todosApi";

import Todo from "./Todo";
import TodoEdit from "./TodoEdit";
import TodoForm from "./TodoForm";

interface TodoItem {
  _id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
}

interface TodoWrapperProps {}

const TodoWrapper: FC<TodoWrapperProps> = () => {
  // APIs Fetching
  // Query
  const { data: todos = [], isLoading, isError } = useFetchTodoQuery();
  const dispatch = useDispatch();

  // Mutation
  const [addTodoMutation] = useAddTodoMutation();
  const [toggleCompleteMutation] = useToggleCompleteMutation();
  const [deleteTodoMutation] = useDeleteTodoMutation();
  const [editTodoMutation] = useEditTodoMutation();
  const [editTaskMutation] = useEditTaskMutation();

  const handleAddTodo = async (todo: TodoItem) => {
    try {
      const response = await addTodoMutation(todo);

      console.log(response.data);

      dispatch(addTodo(response.data));
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      const response = await deleteTodoMutation(id);
      dispatch(deleteTodo(response.data));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggleComplete = async (id: string, taskCompleted: boolean) => {
    try {
      const response = await toggleCompleteMutation({ id, taskCompleted });
      dispatch(toggleCompleted(response.data));
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const handleEditTodo = async (id: string) => {
    try {
      const response = await editTodoMutation(id);
      dispatch(editTodo(response.data));
    } catch (error) {
      console.error("Error editing status todo:", error);
    }
  };

  const handleEditTask = async (task: string, id: string) => {
    try {
      const response = await editTaskMutation({ task, id });
      dispatch(editTask(response.data));
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching data</p>}
      {!isLoading && !isError && (
        <div className="TodoWrapper">
          <h1>Get Things Done!</h1>
          <TodoForm addTodo={handleAddTodo} />
          {todos.map((todo, index) =>
            todo.isEditing ? (
              <div key={todo._id}>
                <TodoEdit editTodo={handleEditTask} task={todo} />
              </div>
            ) : (
              <Todo
                task={todo}
                key={index}
                toggleComplete={() =>
                  handleToggleComplete(todo._id, todo.completed)
                }
                deleteTodo={() => handleDeleteTodo(todo._id)}
                editTodo={() => handleEditTodo(todo._id)}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default TodoWrapper;
