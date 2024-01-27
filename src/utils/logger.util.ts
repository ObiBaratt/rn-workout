export const logger = {
  info: (message: string) => {
    console.log(`> [${new Date().toLocaleTimeString()}] - ${message}`);
  }
}