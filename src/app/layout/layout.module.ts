import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CallsProviders } from '../domain';
import { NavbarModule } from './../shared/navbar/navbar.module';
import { ContentComponent } from './components/content/content.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [LayoutComponent, SidebarComponent, ContentComponent],
  imports: [CommonModule, LayoutRoutingModule, NavbarModule],
  providers: [...CallsProviders],
})
export class LayoutModule {}
