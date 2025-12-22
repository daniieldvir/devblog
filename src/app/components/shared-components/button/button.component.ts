import { AfterContentInit, Component, ElementRef, input, output, signal } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements AfterContentInit {
  label = input<string | SafeHtml>('Button');
  editedMode = input<boolean>(false);
  onClick = output<void>();

  hasContent = signal(false);

  constructor(private elementRef: ElementRef) {}

  ngAfterContentInit(): void {
    const hostElement = this.elementRef.nativeElement;
    const button = hostElement.querySelector('button');
    if (button) {
      const hasProjectedContent =
        button.childNodes.length > 0 &&
        Array.from(button.childNodes).some(
          (node: any) =>
            node.nodeType === Node.ELEMENT_NODE ||
            (node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
        );
      this.hasContent.set(hasProjectedContent);
    }
  }
}
