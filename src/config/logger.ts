import {
	logger,
	consoleTransport,
	fileAsyncTransport,
} from "react-native-logs";

const config = {
	transport: __DEV__ ? consoleTransport : fileAsyncTransport,
	severity: __DEV__ ? "debug" : "error",
	transportOptions: {
		colors: {
			debug: "greenBright",
			info: "blueBright",
			warn: "yellowBright",
			error: "redBright",
		},
	},
	dateFormat: (date: Date) => `${date.toLocaleTimeString()} `,
};

const LOG = logger.createLogger(config);

export { LOG };
