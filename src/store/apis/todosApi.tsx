import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backEndServer = "http://localhost:3001";

interface Todo {
  id: string;
  _id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
}

const todosApi = createApi({
  reducerPath: "todos",
  baseQuery: fetchBaseQuery({
    baseUrl: backEndServer,
  }),
  tagTypes: ["todos"],
  endpoints(builder) {
    return {
      fetchTodo: builder.query<Todo[], void>({
        providesTags: ["todos"],
        query: () => ({
          url: `${backEndServer}/todos`,
          method: "GET",
        }),
      }),
      addTodo: builder.mutation<Todo, Partial<Todo>>({
        query: (todo) => ({
          url: `${backEndServer}/add`,
          method: "POST",
          body: {
            task: todo,
            completed: false,
            isEditing: false,
          },
        }),
        invalidatesTags: ["todos"],
      }),
      deleteTodo: builder.mutation<void, string>({
        query: (id) => ({
          url: `${backEndServer}/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["todos"],
      }),
      toggleComplete: builder.mutation<
        void,
        { id: string; taskCompleted: boolean }
      >({
        query: ({ id, taskCompleted }) => ({
          url: `${backEndServer}/update/${id}`,
          method: "PUT",
          body: {
            completed: !taskCompleted,
          },
        }),
        invalidatesTags: ["todos"],
      }),
      editTodo: builder.mutation<void, string>({
        query: (id) => ({
          url: `${backEndServer}/update/${id}`,
          method: "PUT",
          body: {
            isEditing: true,
          },
        }),
        invalidatesTags: ["todos"],
      }),
      editTask: builder.mutation<void, { task: string; id: string }>({
        query: ({ task, id }) => ({
          url: `${backEndServer}/update/${id}`,
          method: "PUT",
          body: {
            task,
            isEditing: false,
          },
        }),
        invalidatesTags: ["todos"],
      }),
    };
  },
});

export const {
  useFetchTodoQuery,
  useAddTodoMutation,
  useToggleCompleteMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useEditTaskMutation,
} = todosApi;

export { todosApi };
