import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../src/app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { appRoutes } from './app/app.routes'; // Ensure this path is correct

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes), provideHttpClient()],
}).catch((err) => console.error(err));
