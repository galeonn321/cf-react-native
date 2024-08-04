import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Comment, Like, SavedMovie } from "../../../types/interfaces";
import { LOG } from "../../../config/logger";

const now = new Date();

const initialState: User = {
  userId: '',
  username: '',
  email: '',
  profilePicture: '',
  comments: [],
  likes: [],
  savedMovies: [],
  createdAt: 0,
  updatedAt: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload, createdAt: now.getTime(), updatedAt: now.getTime() };
    },
    removeUser: (state) => {
      return initialState;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload, updatedAt: now.getTime() };
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
