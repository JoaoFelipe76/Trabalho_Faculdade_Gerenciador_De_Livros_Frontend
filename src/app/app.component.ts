import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LivroComponent } from './livro/livro.component';
import { provideHttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LivroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'livro-app';
}
