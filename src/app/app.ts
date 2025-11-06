import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Import of components common (usando barrel file)
import { Header, Footer } from "./fragments";

@Component({
  selector: 'app-root',
  imports: [Header,RouterOutlet, Footer],
  templateUrl: './app.html',
})
export class App {
}
