import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Import of components common
import { Header } from "./fragments/header/header";
import { Footer } from "./fragments/footer/footer";

@Component({
  selector: 'app-root',
  imports: [Header,RouterOutlet, Footer],
  templateUrl: './app.html',
})
export class App {
}
