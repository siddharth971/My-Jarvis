// client/src/app/app.component.ts
import { Component } from '@angular/core';
import { JarvisInterfaceComponent } from './components/jarvis-interface/jarvis-interface.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JarvisInterfaceComponent],
  template: `<main class="app-container"><app-jarvis-interface /></main>`,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: #020617; /* slate-950 */
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 2rem;
    }
  `]
})
export class App {}