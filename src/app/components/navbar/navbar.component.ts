import { Component, ViewChild, signal } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    NgIf,
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isLoggedIn: boolean = false;

  isMobile = signal(false);

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {
    this.breakpointObserver
      .observe(['(max-width: 860px)'])
      .subscribe((result) => {
        this.isMobile.set(result.matches);
      });
  }

  logout() {
    this.authService.signOut();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
