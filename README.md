# Central Film

Central Film is a mobile application built with React Native, utilizing MongoDB as the database and the TMDB (The Movie Database) API for movie data. This project is designed as a learning experience to understand the integration of React Native with MongoDB and to explore the functionalities of the TMDB API.

## Features

- **User Authentication**: Create an account and log in to access the app.
- **User Profile**: Create and edit your profile.
- **Movie Browsing**: Browse movies using data fetched from the TMDB API.
- **Save Movies**: Save your favorite movies to your profile.
- **Rate Movies**: Rate movies and see average ratings.
- **Comment on Movies**: Leave comments on movies and view comments from other users.

## Tech Stack

- **Frontend**: React Native
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **External API**: TMDB API

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- TMDB API Key

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/Central-Film.git
    cd Central-Film
    ```

2. **Install dependencies**:
    ```bash
    npm install
    cd client
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and add the following variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    TMDB_API_KEY=your_tmdb_api_key
    ```

4. **Run the application**:

    In the root directory, run:
    ```bash
    npm start
    ```

    This will start both the backend server and the React Native application.

### Running on Emulator/Device

1. Make sure you have an Android/iOS emulator installed or a physical device connected.
2. Start the React Native development server:
    ```bash
    npm run android
    ```
    or
    ```bash
    npm run ios
    ```

## Usage

- **Sign Up**: Create a new account using your email and a password.
- **Log In**: Log in with your credentials.
- **Browse Movies**: Explore movies fetched from the TMDB API.
- **Save Movies**: Click the save button to add a movie to your profile.
- **Rate Movies**: Provide your rating for any movie.
- **Comment on Movies**: Share your thoughts on movies by leaving comments.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under a proprietary license. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- [React Native](https://reactnative.dev/)
- [MongoDB](https://www.mongodb.com/)
- [TMDB API](https://www.themoviedb.org/documentation/api)

## Contact

For any inquiries or feedback, please reach out to [your-email@example.com](mailto:your-email@example.com).

---

Happy Coding! 🎬📱
