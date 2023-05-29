module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // "module:metro-react-native-babel-preset",
      "babel-preset-expo",
      // "module:react-native-dotenv",
    ],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
