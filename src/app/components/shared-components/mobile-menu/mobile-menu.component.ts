import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent {
  links = input<{ label: string; path: string }[]>([]);
  linkClicked = output<string>();

  protected onLinkClick(path: string): void {
    this.linkClicked.emit(path);
  }
}
