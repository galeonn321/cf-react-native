module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          envName: "API_KEY_MOVIES_TMDb",
          moduleName: "@env",
          path: ".env.development",
          verbose: false,
        },
      ],
    ],
  };
};
