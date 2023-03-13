import { Directive, ElementRef, HostListener, Input } from '@angular/core';
// @HOSTLISTENER PERMET DE LIE UNE METHODE DE LA DIRECTIVE A UN EVENEMENT DU DOM
// PRECISER UNE PROPRIETE D'ENTRE AVEC @INPUT
// ng generate directive name PERMET DE GENERER LA DIRECTIVE PERSONNAMLISER
@Directive({
  selector: '[pokemonBorderCard]'
})
export class BorderCardDirective {

  private initialColor: string = "#f5f5f5";
  private defaultColor: string = "#009688";
  private defaultHeight: number = 200;
  // ELEMENTREF FAIT REFERENCE A ELEMENT DU DOM
  constructor(private el: ElementRef) { 
    this.setHeight(this.defaultHeight);
    this.setborder(this.initialColor);
  }

  @Input('pokemonBorderCard') borderColor: string; // ALIAS


  @HostListener('mouseenter') onMouseEnter() {
    this.setborder(this.borderColor || this.defaultColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setborder(this.initialColor);
  }

  private setHeight(height: number){
    // ACCEDER A ELEMENT NATIVE DU DOM
    this.el.nativeElement.style.height = `${height}px`;
  }

  private setborder(color: string){
    // ACCEDER A ELEMENT NATIVE DU DOM
    this.el.nativeElement.style.border = `solid 4px ${color}`;
  }
}
