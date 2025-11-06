import { Component } from '@angular/core';
import { LucideAngularModule, CircleX } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class Header {
  readonly CircleX = CircleX;
}
