import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { Article } from '../../../models/article.models';
import { User } from '../../../models/user.models';
import { TimeAgoPipe } from '../../../pipes/time-pipe';
import { FooterComponent } from '../../frame-components/footer/footer.component';
import { HeaderComponent } from '../../frame-components/header/header.component';
import { ButtonComponent } from '../../shared-components/button/button.component';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, TimeAgoPipe, ButtonComponent, NgIconComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  private readonly router = inject(Router);

  protected article = signal<Article | null>(null);
  protected author = signal<string | null>(null);

  public ngOnInit(): void {
    const nav = this.router.lastSuccessfulNavigation();
    const stateArticle = nav?.extras.state?.['article'] as Article | undefined;
    const stateAuthor = nav?.extras.state?.['author'] as User | undefined;

    console.log('nav?.extras.state?', nav?.extras.state);

    console.log(stateArticle);

    if (stateArticle) {
      this.article.set(stateArticle);
    }
    if (stateAuthor) {
      this.author.set(stateAuthor.displayName);
    }
  }

  protected onBackClick(): void {
    this.router.navigate(['/articles']);
  }
}
