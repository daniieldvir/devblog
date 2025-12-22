import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchQuery = signal('');
  searchQueryChange = output<string>();

  onInputChange(value: string): void {
    this.searchQuery.set(value);
    this.searchQueryChange.emit(value);
  }
}
