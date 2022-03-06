import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

const initialInitiatives = {
  status: null,
  list: []
};

export const fetchInitiatives = createAsyncThunk(
  'initiatives/getInitiatives',
  async () => {
    const response = await api.fetchInitiatives()
    return response.data
  }
)

export const createInitiative = createAsyncThunk(
  'initiatives/createInitiative',
  async (initiative, thunkAPI) => {
    try {
      const response = await api.createInitiative(initiative)
      return response.data
    } catch(error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

/*-------- Slice object ---------- */
const initiativesSlice = createSlice({
  name: "initiatives",
  initialState: initialInitiatives,
  reducers: {
    changeUserVote: (state, action) => {
      const Index = state.list.findIndex((obj) => obj._id === action.payload.id);
      state.list[Index].userVotes += action.payload.number;
      state.list[Index].totalVotes += action.payload.number;
    },
  },
  extraReducers: {
    [fetchInitiatives.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchInitiatives.fulfilled]: (state, action) => {
      state.list = action.payload
      state.status = 'success'
    },
    [fetchInitiatives.rejected]: (state, payload) => {
      state.status = 'failed'
    },
    [createInitiative.pending]: (state, action) => {
      state.status = 'loading'
    },
    [createInitiative.fulfilled]: (state, action) => {
      state.list.push(action.payload)
      state.status = 'success'
    },
    [createInitiative.rejected]: (state, payload) => {
      state.status = 'failed'
    },
  }
});

/*-------- Selectors ---------- */
export const selectInitiatives = (state) => state.initiatives.list;

  export const selectInitiativeLoadingStatus = (state) => state.initiatives.status 


/*-------- Exports ---------- */

export const {
  setCurrentInitiative,
  removeCurrentInitiativeSelection,
  changeUserVote,
} = initiativesSlice.actions;

export default initiativesSlice.reducer;