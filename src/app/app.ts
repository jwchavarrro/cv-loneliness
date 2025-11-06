import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Import of components common
import { Header } from "./fragments/header/header.component";
import { Footer } from "./fragments/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [Header,RouterOutlet, Footer],
  templateUrl: './app.html',
})
export class App {
}
