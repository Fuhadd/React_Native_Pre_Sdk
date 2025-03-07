import { consoleTransport, logger } from "react-native-logs";

const InteractionManager = require("react-native").InteractionManager;

// Define the default configuration
const defaultConfig = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: "debug",
  transport: consoleTransport,
  transportOptions: {
    colors: {
      debug: "greenBright",
      info: "blueBright",
      warn: "yellowBright",
      error: "redBright",
    },
  },
  async: true,
  asyncFunc: InteractionManager.runAfterInteractions,
  dateFormat: "time",
  printLevel: true,
  printDate: true,
  fixedExtLvlLength: false,
  enabled: true,
//   formatFunc: (logObj:any) => JSON.stringify(logObj, null, 2), 
};

// Create the logger instance
const log = logger.createLogger(defaultConfig);

// Export the logger so it can be used in other files
export default log;
