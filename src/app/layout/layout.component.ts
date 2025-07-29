import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { CustomAlertComponent } from '../components/custom-alert/custom-alert.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, FooterComponent, CustomAlertComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements AfterViewInit {
 
ngAfterViewInit(): void {
  }
  
}
