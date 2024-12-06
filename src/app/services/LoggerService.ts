import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LoggerService {

    log(message: string): void {
        console.log(this.formatMessage('INFO', message));
    }

    error(message: string, error: any): void {
        console.error(this.formatMessage('ERROR', message), error);
    }

    private formatMessage(level: string, message: string): string {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level}] ${message}`;
    }
}
