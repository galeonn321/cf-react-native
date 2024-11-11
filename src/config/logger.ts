import {
	logger,
	consoleTransport,
	fileAsyncTransport,
} from "react-native-logs";

const config = {
	transport: __DEV__ ? consoleTransport : fileAsyncTransport,
	severity: __DEV__ ? "debug" : "error",
	transportOptions: {
		colors: __DEV__
			? {
					debug: "greenBright",
					info: "blueBright",
					warn: "yellowBright",
					error: "redBright",
				}
			: undefined,
		// Specify file path for production logs (optional)
		filePath: "path/to/logfile.log",
	},
	dateFormat: (date: Date) => `${date.toISOString()}`,
};

const LOG = logger.createLogger(config);

export { LOG, config };
