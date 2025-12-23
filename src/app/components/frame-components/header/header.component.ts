import { Component, inject, OnInit, output, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { filter } from 'rxjs';
import { ButtonComponent } from '../../shared-components/button/button.component';
import { MobileMenuComponent } from '../../shared-components/mobile-menu/mobile-menu.component';
import { SearchComponent } from '../../shared-components/search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonComponent,
    SearchComponent,
    RouterLink,
    RouterLinkActive,
    NgIconsModule,
    MobileMenuComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  searchQueryChange = output<string>();
  sidebarToggle = output<void>();

  protected readonly isDarkMode = signal(false);
  protected readonly isBlogPage = signal(false);
  protected readonly isMobileMenuOpen = signal(false);

  private readonly router = inject(Router);

  navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Forum', path: '/forum' },
    { label: 'Categories', path: '/categories' },
    { label: 'Articles', path: '/articles' },
    { label: 'About', path: '/about' },
  ];

  public ngOnInit(): void {
    // Check if we're on forum page on route changes
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const isBlog = this.router.url === '/forum' || this.router.url.startsWith('/forum');
      this.isBlogPage.set(isBlog);
    });
    // Initial check
    const isBlog = this.router.url === '/forum' || this.router.url.startsWith('/forum');
    this.isBlogPage.set(isBlog);
  }

  protected toggleTheme(): void {
    this.isDarkMode.update((value) => !value);
    document.documentElement.setAttribute('data-theme', this.isDarkMode() ? 'dark' : 'light');
  }

  protected onSearchChange(query: string): void {
    this.searchQueryChange.emit(query);
  }

  protected onSidebarToggle(): void {
    this.sidebarToggle.emit();
  }

  protected onMobileMenuToggle(): void {
    this.isMobileMenuOpen.update((value) => !value);
  }
}
