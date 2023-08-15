import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-day',

  templateUrl: './day.component.html',

  styleUrls: ['./day.component.css'],

  // standalone: true,

  // imports: [MatCardModule, MatButtonModule, ActivityComponent],
})
export class DayComponent {
  @Input() day = '';

  @Input() index!: number;
}
