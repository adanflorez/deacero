import { NavbarModule } from './../shared/navbar/navbar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';

@NgModule({
  declarations: [LayoutComponent, SidebarComponent, ContentComponent],
  imports: [CommonModule, LayoutRoutingModule, NavbarModule],
})
export class LayoutModule {}
