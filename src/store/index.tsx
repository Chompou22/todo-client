import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { todosApi } from "./apis/todosApi";
export const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(todosApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTaskMutation,
  useEditTodoMutation,
  useFetchTodoQuery,
  useToggleCompleteMutation,
} from "./apis/todosApi";
