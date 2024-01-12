import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./slices/category-slice";


export const AppStore = configureStore({
    reducer: {
        categories: CategoryReducer
    }
});