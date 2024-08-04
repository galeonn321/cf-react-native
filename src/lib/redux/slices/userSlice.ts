import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Comment, Like, SavedMovie } from "../../../types/interfaces";

const now = new Date();
// Define the initial state using the `User` interface
const initialState: User = {
  userId: '',
  username: '',
  email: '',
  profilePicture: '',
  comments: [],
  likes: [],
  savedMovies: [],
  createdAt: null,
  updatedAt: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload, createdAt: now.getTime(), updatedAt: now.getTime() };
    },
    removeUser: (state) => {
      return initialState;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload, updatedAt: new Date() };
    },
    addComment: (state, action: PayloadAction<{ userId: string, comment: Comment }>) => {
      if (state.userId === action.payload.userId) {
        return { ...state, comments: [...(state.comments || []), action.payload.comment] };
      }
      return state;
    },
    addLike: (state, action: PayloadAction<{ userId: string, like: Like }>) => {
      if (state.userId === action.payload.userId) {
        return { ...state, likes: [...(state.likes || []), action.payload.like] };
      }
      return state;
    },
    saveMovie: (state, action: PayloadAction<{ userId: string, savedMovie: SavedMovie }>) => {
      if (state.userId === action.payload.userId) {
        return { ...state, savedMovies: [...(state.savedMovies || []), action.payload.savedMovie] };
      }
      return state;
    },
  },
});

export const { addUser, removeUser, updateUser, addComment, addLike, saveMovie } = userSlice.actions;

export default userSlice.reducer;
