import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


export const categorySlice = createSlice({
    initialState: [],
    name: 'CategoryReducer',
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})


export const fetchCategory = createAsyncThunk('cateogrySlice/fetchCategory', async () => {
    const response = await axios.get("http://localhost:5295/GetAllCategoriesWithoutPagination");
    return response.data;
})

export const { getCategories } = categorySlice.actions;
export default categorySlice.reducer;