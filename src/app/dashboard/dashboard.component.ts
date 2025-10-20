import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userRole: string | null = null;
  dashboardTitle: string = '';
  embedUrl: SafeResourceUrl | null = null;
  // Placeholder URLs; replace with the 4 actual public embed URLs from your colleague
  private dashboardUrls: { [role: string]: { title: string; url: string } } = {
    'Executive': { title: 'Vue Globale Hospitalière', url: 'https://app.powerbi.com/reportEmbed?reportId=000ca8ba-5b01-46a3-b082-9ec196c8fa9f&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730' },
    'DepartmentHead': { title: 'Performance Départementale', url: 'https://app.powerbi.com/reportEmbed?reportId=32b67a81-7bb6-4216-9a6c-7535de1a1dd3&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730' },
    'FinanceInsurance': { title: 'Analyse Financière et Assurances', url: 'https://app.powerbi.com/reportEmbed?reportId=d688c723-2243-462b-9a6d-5cde8a62ae5c&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730' },
    'QualityPatientServices': { title: 'Satisfaction et Démographie Patients', url: 'https://app.powerbi.com/reportEmbed?reportId=cd7ce903-3d39-4e6f-9d26-6769dbf8fd20&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730' }
  };

  constructor(private authService: AuthService, private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
      if (role && this.dashboardUrls[role]) {
        this.dashboardTitle = this.dashboardUrls[role].title;
        this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.dashboardUrls[role].url
          );
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}