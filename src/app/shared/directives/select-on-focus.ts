import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'input[selectOnFocus]',
  standalone: true,
})
export class SelectOnFocus {
  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    // Delay to allow Material animation/layout to finish
    setTimeout(() => input.select(), 0);
  }
}
