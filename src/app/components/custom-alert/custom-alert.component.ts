import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-custom-alert',
  imports: [CommonModule],
  templateUrl: './custom-alert.component.html',
  styleUrl: './custom-alert.component.scss'
})
export class CustomAlertComponent {
  @Input() message: string = '';
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<void>();
  constructor(public alertService: AlertService) {}

  onClose() {
    this.close.emit();
  }
}
