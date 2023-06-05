import fs from 'fs';

export class Logger {
  private logFilePath: string;

  constructor(logFilePath: string) {
    this.logFilePath = "/logs/" + logFilePath;
  }

  public log(message: any): void {
    const logEntry = `[${new Date().toISOString()}] ${JSON.stringify(message)}\n`;
    
    fs.mkdirSync('/logs', { recursive: true }); // Create the directory if it doesn't exist
    
    fs.appendFile(this.logFilePath, logEntry, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });
  }
}