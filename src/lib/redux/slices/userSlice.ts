import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User, Comment, Like, SavedMovie } from "../../../types/interfaces";
import { LOG } from "../../../config/logger";

const now = new Date();

const initialState: User = {
	userId: "",
	username: "",
	email: "",
	profilePicture: "",
	comments: [],
	likes: [],
	savedMovies: [],
	createdAt: 0,
	updatedAt: 0,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		addUser: (state, action: PayloadAction<User>) => {
			return {
				...state,
				...action.payload,
				createdAt: now.getTime(),
				updatedAt: now.getTime(),
			};
		},
		removeUser: () => {
			return initialState;
		},
		updateUser: (state, action: PayloadAction<Partial<User>>) => {
			return { ...state, ...action.payload, updatedAt: now.getTime() };
		},
		addComment: (
			state,
			action: PayloadAction<{ userId: string; comment: Comment }>
		) => {
			if (state.userId === action.payload.userId) {
				state.comments.push(action.payload.comment);
			}
		},
		addLike: (state, action: PayloadAction<{ userId: string; like: Like }>) => {
			if (state.userId === action.payload.userId) {
				state.likes.push(action.payload.like);
			}
		},
		saveMovie: (
			state,
			action: PayloadAction<{ userId: string; savedMovie: SavedMovie }>
		) => {
			if (state.userId === action.payload.userId) {
				state.savedMovies.push(action.payload.savedMovie);
			}
		},
	},
});

export const {
	addUser,
	removeUser,
	updateUser,
	addComment,
	addLike,
	saveMovie,
} = userSlice.actions;

export default userSlice.reducer;
