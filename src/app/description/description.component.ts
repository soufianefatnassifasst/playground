import { Component } from '@angular/core';
import { WaitComponent } from '../wait/wait.component';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [WaitComponent],
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss',
})
export class DescriptionComponent {

}
