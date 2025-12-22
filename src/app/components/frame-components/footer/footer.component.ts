import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  footerLinks = [
    {
      title: 'Navigation',
      links: [
        { label: 'Home', url: '/' },
        { label: 'Blog', url: '/blog' },
        { label: 'Categories', url: '/categories' },
        { label: 'About', url: '/about' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', url: '/docs' },
        { label: 'Tutorials', url: '/tutorials' },
        { label: 'FAQ', url: '/faq' },
        { label: 'Support', url: '/support' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', url: '/privacy' },
        { label: 'Terms of Service', url: '/terms' },
        { label: 'Cookie Policy', url: '/cookies' },
      ],
    },
  ];

  socialLinks = [
    { name: 'Twitter', icon: 'X', url: 'https://twitter.com' },
    { name: 'GitHub', icon: 'GH', url: 'https://github.com' },
    { name: 'LinkedIn', icon: 'in', url: 'https://linkedin.com' },
    { name: 'YouTube', icon: 'YT', url: 'https://youtube.com' },
  ];
}
