import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-entry',
  templateUrl: './invoice-entry.component.html',
  styleUrls: ['./invoice-entry.component.css'],
})
export class InvoiceEntryComponent implements OnInit {
  invoiceForm: FormGroup;

  constructor(private fb: FormBuilder, private invoiceService: InvoiceService) {
    this.invoiceForm = this.fb.group({
      customerName: ['', Validators.required],
      totalAmount: [0, [Validators.required, Validators.min(0.01)]],
      invoiceDetails: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    // Subscribe to changes in the invoiceDetails to update total amount dynamically.
    this.invoiceDetails.valueChanges.subscribe(() => this.calculateTotalAmount());
  }

  // Getter for invoiceDetails FormArray
  get invoiceDetails(): FormArray {
    return this.invoiceForm.get('invoiceDetails') as FormArray;
  }

  // Add a new product row
  addProduct(): void {
    const productGroup = this.fb.group({
      productName: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
    });

    this.invoiceDetails.push(productGroup);
  }

  // Remove an existing product row
  removeProduct(index: number): void {
    this.invoiceDetails.removeAt(index);
    this.calculateTotalAmount();
  }

  // Calculate the total amount based on product quantity and price
  calculateTotalAmount(): void {
    const total = this.invoiceDetails.controls.reduce((sum, control) => {
      const quantity = control.get('quantity')?.value || 0;
      const price = control.get('price')?.value || 0;
      return sum + (quantity * price);
    }, 0);

    // Update totalAmount without triggering valueChanges again
    this.invoiceForm.get('totalAmount')?.setValue(total, { emitEvent: false });
  }

  // Handle form submission
  submitInvoice(): void {
    if (this.invoiceForm.valid) {
      console.log('🔄 Sending Invoice:', this.invoiceForm.value);
  console.log(this.invoiceForm.value)
      this.invoiceService.createInvoice(this.invoiceForm.value).subscribe(
        (response) => {
          console.log('✅ Invoice Created:', response);
          alert('Invoice Created Successfully!');
          // Reset the form and clear all products
          this.invoiceForm.reset({ customerName: '', totalAmount: 0, invoiceDetails: [] });
          this.invoiceDetails.clear();
        },
        (error) => {
          console.error('❌ Error creating invoice:', error);
          alert(`Error: ${error.message}`);
        }
      );
    } else {
      console.warn('⚠️ Form is invalid:', this.invoiceForm);
    }
  }
}
