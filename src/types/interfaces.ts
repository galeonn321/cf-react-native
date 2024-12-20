export interface Comment {
	movieId: string;
	comment: string;
	date?: Date;
}

export interface Like {
	movieId: string;
	date?: Date;
}

export interface SavedMovie {
	movieId: string;
	date?: Date;
}

export interface User {
	userId?: string;
	username: string;
	email: string;
	password?: string;
	profilePicture?: string;
	comments?: Comment[];
	likes?: Like[];
	savedMovies?: SavedMovie[];
	createdAt?: number | null;
	updatedAt?: number | null;
	location?: string;
}

export interface UserLogin {
	username: string;
	password: string;
	token?: string;
}
