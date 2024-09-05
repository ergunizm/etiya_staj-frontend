import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './components/history/history.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NamespaceComponent } from './components/namespace/namespace.component';


const routes: Routes = [
  { path: 'history', component: HistoryComponent },
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  {path: 'namespace', component: NamespaceComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
