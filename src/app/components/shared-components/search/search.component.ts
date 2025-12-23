import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, NgIconsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchQuery = signal('');
  searchQueryChange = output<string>();

  protected onInputChange(value: string): void {
    this.searchQuery.set(value);
    this.searchQueryChange.emit(value);
  }
}
