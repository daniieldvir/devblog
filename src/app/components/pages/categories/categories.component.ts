import { Component } from '@angular/core';
import { FooterComponent } from '../../frame-components/footer/footer.component';
import { HeaderComponent } from '../../frame-components/header/header.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categories = [
    { name: 'Technology', icon: '💻', count: 24, color: '#6366f1' },
    { name: 'Design', icon: '🎨', count: 18, color: '#ec4899' },
    { name: 'Development', icon: '⚡', count: 32, color: '#10b981' },
    { name: 'Tutorials', icon: '📚', count: 15, color: '#f59e0b' },
    { name: 'Lifestyle', icon: '🌿', count: 9, color: '#06b6d4' },
    { name: 'Career', icon: '🚀', count: 12, color: '#8b5cf6' },
  ];
}
