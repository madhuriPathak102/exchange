import { Component, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-theme';
  options = {
    minimum: 0.08,
    maximum: 1,
    ease: 'linear',
    speed: 200,
    trickleSpeed: 300,
    meteor: true,
    spinner: true,
    spinnerPosition: 'right',
    direction: 'leftToRightIncreased',
    color: 'red',
    thick: true
  };
  constructor(private viewContainer: ViewContainerRef,
    private cfr: ComponentFactoryResolver) {
  }
}
