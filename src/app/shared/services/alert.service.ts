import { Injectable } from '@angular/core';
export interface AlertModel {
  type: 'success' | 'danger' | 'warning' | 'info';
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alerts: AlertModel[] = [];

  show(type: AlertModel['type'], message: string, duration: number = 3000) {
    const alert: AlertModel = { type, message };
    this.alerts.push(alert);

    setTimeout(() => {
      this.alerts = this.alerts.filter((a) => a !== alert);
    }, duration);
  }

  success(msg: string, dur?: number) {
    this.show('success', msg, dur);
  }
  error(msg: string, dur?: number) {
    this.show('danger', msg, dur);
  }
  info(msg: string, dur?: number) {
    this.show('info', msg, dur);
  }
  warning(msg: string, dur?: number) {
    this.show('warning', msg, dur);
  }
}
