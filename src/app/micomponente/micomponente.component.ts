import { Component } from '@angular/core';
import { DosComponent } from '../dos/dos.component';

@Component({
  selector: 'app-micomponente',
  standalone: true,
  imports: [DosComponent],
  templateUrl: './micomponente.component.html',
  styleUrl: './micomponente.component.css'
})
export class MicomponenteComponent {

}
