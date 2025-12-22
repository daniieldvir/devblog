import { Component } from '@angular/core';
import { select } from '@ngxs/store';
import { ForumSelectors } from '../../../state/forum.selectors';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  author = select(ForumSelectors.slices.onlineUser);

  categories = [
    { name: 'Technology', count: 24 },
    { name: 'Design', count: 18 },
    { name: 'Development', count: 32 },
    { name: 'Tutorials', count: 15 },
    { name: 'Lifestyle', count: 9 },
  ];

  recentPosts = [
    { title: 'Getting Started with Angular Signals', date: 'Dec 18, 2025' },
    { title: 'Modern CSS Techniques You Should Know', date: 'Dec 15, 2025' },
    { title: 'Building Accessible Web Apps', date: 'Dec 12, 2025' },
  ];

  socialLinks = [
    { name: 'Twitter', icon: 'X', url: 'https://twitter.com' },
    { name: 'GitHub', icon: 'GH', url: 'https://github.com' },
    { name: 'LinkedIn', icon: 'in', url: 'https://linkedin.com' },
  ];
}
