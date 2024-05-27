import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: "",
    body: "",
    List: 0,
    tasks: [],
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },

        getTasks: (state, action) => {
            state.tasks = action.payload;
        },

        getTask: (state, action) => {
            console.log(
                "getTaskById action triggered with id:",
                action.payload
            );
        },

        editTask: (state, action) => {
            const { taskId, updatedTaskData } = action.payload;
            const taskIndex = state.tasks.findIndex(
                (task) => task.id === taskId
            );
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = {
                    ...state.tasks[taskIndex],
                    ...updatedTaskData,
                };
            }
        },

        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );
        },
    },
});

export const { addTask, getTasks, getTask, editTask, deleteTask } =
    taskSlice.actions;
export default taskSlice.reducer;
