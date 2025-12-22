import { Component, inject, OnInit, output, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { filter } from 'rxjs';
import { ButtonComponent } from '../../shared-components/button/button.component';
import { SearchComponent } from '../../shared-components/search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, SearchComponent, RouterLink, RouterLinkActive, NgIconsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private readonly router = inject(Router);

  isDarkMode = signal(false);
  searchQueryChange = output<string>();
  menuToggle = output<void>();

  protected readonly isBlogPage = signal(false);

  navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Forum', path: '/forum' },
    { label: 'Categories', path: '/categories' },
    { label: 'About', path: '/about' },
  ];

  ngOnInit(): void {
    // Check if we're on forum page on route changes
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const isBlog = this.router.url === '/forum' || this.router.url.startsWith('/forum');
      this.isBlogPage.set(isBlog);
    });
    // Initial check
    const isBlog = this.router.url === '/forum' || this.router.url.startsWith('/forum');
    this.isBlogPage.set(isBlog);
  }

  toggleTheme(): void {
    this.isDarkMode.update((value) => !value);
    document.documentElement.setAttribute('data-theme', this.isDarkMode() ? 'dark' : 'light');
  }

  onSearchChange(query: string): void {
    this.searchQueryChange.emit(query);
  }

  onSidebarToggle(): void {
    this.menuToggle.emit();
  }
}
