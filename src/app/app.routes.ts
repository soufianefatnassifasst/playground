import { Routes } from '@angular/router';
import { DescriptionComponent } from './description/description.component';
import {FonctionnaliteComponent} from "./fonctionnalite/fonctionnalite.component";

export const routes: Routes = [
  { path: '', component: DescriptionComponent },
  { path: 'feature', component: FonctionnaliteComponent },
];
