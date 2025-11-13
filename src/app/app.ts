import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Import of components common (usando barrel file)
import { HeaderComponent, FooterComponent } from "./fragments";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent,RouterOutlet, FooterComponent],
  templateUrl: './app.html',
})
export class App {
}
