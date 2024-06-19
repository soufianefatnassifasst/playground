import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { WaitComponent } from './wait/wait.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WaitComponent, CommonModule, RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
}
