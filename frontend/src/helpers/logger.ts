enum LogLevel {
  debug = 1,
  info = 2,
  warn = 3,
  error = 4,
}
const configLevel = import.meta.env.VITE_DEV_LOG_LEVEL;
const logLevel = LogLevel[configLevel as keyof typeof LogLevel] || 3;

export class Logger {
  private componentName;
  constructor(componentName: string) {
    this.componentName = componentName;
  }

  log (message: string) {
    console.log(`[${this.componentName}]: ${message}`);
  }

  debug (message: string) {
    if (logLevel <= 1) console.debug(`[${this.componentName}]: ${message}`);
  }

  info (message: string) {
    if (logLevel <= 2) console.info(`[${this.componentName}]: ${message}`);
  }

  warn (message: string, err?: Error) {
    if (logLevel <= 3)console.warn(`[${this.componentName}]: ${message}`, err);
  }

  error (message: string, err?: Error) {
    if (logLevel <= 4)console.error(`[${this.componentName}]: ${message}`, err);
  }
};
