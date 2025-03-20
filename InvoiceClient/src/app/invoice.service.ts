import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'https://localhost:7074/api/invoice';

  constructor(private http: HttpClient) {}

  createInvoice(invoice: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-invoice`, invoice);
  }

  getInvoices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-invoices`);
  }

  getInvoice(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-invoice/${id}`);
  }

  updateInvoice(id: number, invoice: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-invoice/${id}`, invoice);
  }

  deleteInvoice(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-invoice/${id}`);
  }
}
