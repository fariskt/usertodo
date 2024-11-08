import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("http://localhost:3000/users");
  const users = response.data;
  return users;
});

const initialState = {
  users: [],
  state: false,
  loading:false
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    toggle: (state,action)=> {
      const user = state.users.find(user => user.id === action.payload)
      user.state = !user.state
    },
  },
  extraReducers: (fetching) => {
    fetching
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const {toggle} = usersSlice.actions;
export default usersSlice.reducer;