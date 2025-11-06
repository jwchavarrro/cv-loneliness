import { Component } from '@angular/core';
import { LucideAngularModule, CircleX } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly CircleX = CircleX;
}
