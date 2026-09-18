import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="summary-card">
      <div class="summary-header">
        <span class="summary-badge">Resumen de Cita</span>
        <div class="summary-total" *ngIf="servicePrice > 0">
          <span class="total-label">Total estimado:</span>
          <span class="total-price">{{ totalPrice | currency:'EUR':'symbol':'1.2-2' }}</span>
        </div>
      </div>

      <div class="summary-grid">
        <div class="summary-item" *ngIf="serviceName">
          <span class="item-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="6" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
              <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
              <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
            </svg>
          </span>
          <div>
            <p class="item-label">Servicio</p>
            <p class="item-value">{{ serviceName }}</p>
          </div>
        </div>

        <div class="summary-item" *ngIf="barberName">
          <span class="item-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M6 3h12l-2 18H8L6 3z"></path>
              <line x1="6" y1="8" x2="18" y2="8"></line>
              <line x1="6" y1="14" x2="18" y2="14"></line>
            </svg>
          </span>
          <div>
            <p class="item-label">Barbero</p>
            <p class="item-value">{{ barberName }}</p>
          </div>
        </div>

        <div class="summary-item" *ngIf="date || time">
          <span class="item-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </span>
          <div>
            <p class="item-label">Fecha y Hora</p>
            <p class="item-value">
              {{ date ? (date | date:'dd/MM/yyyy') : 'Fecha pendiente' }}
              {{ time ? '· ' + time + 'h' : '' }}
            </p>
          </div>
        </div>

        <div class="summary-item" *ngIf="peopleCount > 1">
          <span class="item-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </span>
          <div>
            <p class="item-label">Personas</p>
            <p class="item-value">{{ peopleCount }} personas</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .summary-card {
      background: linear-gradient(135deg, rgba(212, 168, 67, 0.08) 0%, rgba(17, 17, 20, 0.95) 100%);
      border: 1px solid rgba(212, 168, 67, 0.25);
      border-radius: 12px;
      padding: 14px 18px;
      margin-top: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }
    .summary-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(212, 168, 67, 0.15);
    }
    .summary-badge {
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--gold, #D4A843);
    }
    .summary-total {
      display: flex;
      align-items: baseline;
      gap: 6px;
    }
    .total-label {
      font-size: 0.75rem;
      color: var(--text-secondary, #A09880);
    }
    .total-price {
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--gold-light, #F0C86A);
      font-family: var(--font-display, serif);
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 10px;
    }
    .summary-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .item-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--gold, #D4A843);
      flex-shrink: 0;
    }
    .item-label {
      font-size: 0.68rem;
      text-transform: uppercase;
      color: var(--text-muted, #5A5550);
      margin: 0;
      line-height: 1.1;
    }
    .item-value {
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text-primary, #F5F0E8);
      margin: 0;
      line-height: 1.2;
    }
  `]
})
export class BookingSummaryComponent {
  @Input() serviceName = '';
  @Input() servicePrice = 0;
  @Input() barberName = '';
  @Input() date = '';
  @Input() time = '';
  @Input() peopleCount = 1;

  get totalPrice(): number {
    return (this.servicePrice || 0) * (this.peopleCount || 1);
  }
}
