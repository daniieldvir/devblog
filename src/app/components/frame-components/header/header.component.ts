import { Component, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from '../../utils-components/button/button.component';
import { SearchComponent } from '../../utils-components/search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, SearchComponent, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isDarkMode = signal(false);
  searchQueryChange = output<string>();

  navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'Categories', path: '/categories' },
    { label: 'About', path: '/about' },
  ];

  toggleTheme(): void {
    this.isDarkMode.update((value) => !value);
    document.documentElement.setAttribute('data-theme', this.isDarkMode() ? 'dark' : 'light');
  }

  onSearchChange(query: string): void {
    this.searchQueryChange.emit(query);
  }
}
