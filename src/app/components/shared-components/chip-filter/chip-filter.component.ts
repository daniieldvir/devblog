import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-chip-filter',
  standalone: true,
  imports: [],
  templateUrl: './chip-filter.component.html',
  styleUrl: './chip-filter.component.scss',
})
export class ChipFilterComponent {
  chipLabel = input<string>();
  selectedChip = model<string>();

  protected onChipClick(): void {
    this.selectedChip.set(this.chipLabel());
  }
}
