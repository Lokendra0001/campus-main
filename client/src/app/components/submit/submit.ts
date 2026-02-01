import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.html',
  styleUrls: ['./submit.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgClass,
    HttpClientModule,
    Navbar,
    Footer
  ]
})
export class Submit implements OnInit {

  selectedReportType: 'lost' | 'found' = 'found';

  lostItemForm!: FormGroup;
  foundItemForm!: FormGroup;

  // store images separately (BEST PRACTICE)
  lostPhotos: File[] = [];
  foundPhotos: File[] = [];

  // ---------------- UI DATA (unchanged) ----------------
  categories = [
    { value: 'electronics', label: 'Electronics', icon: 'fa-laptop' },
    { value: 'documents', label: 'Documents', icon: 'fa-passport' },
    { value: 'accessories', label: 'Keys & ID', icon: 'fa-key' },
    { value: 'personal', label: 'Personal', icon: 'fa-tshirt' }
  ];
recentlyFoundItems = [
  { title: 'iPhone 14 Pro Max', time: 'Found 2 hours ago', icon: 'fa-mobile-alt', status: 'found' },
  { title: 'Student Wallet', time: 'Found 1 day ago', icon: 'fa-wallet', status: 'claimed' }
];

recentlyLostItems = [
  { title: 'Ray-Ban Sunglasses', time: 'Lost 3 hours ago', icon: 'fa-glasses', status: 'lost' },
  { title: 'iPad Air 4th Gen', time: 'Lost 1 day ago', icon: 'fa-tablet-alt', status: 'lost' }
];

// -------- UI STATS DATA (FOR TEMPLATE) --------
lostRecoveryStats = [
  { category: 'Electronics', percentage: 72, color: '#3b82f6' },
  { category: 'Keys & ID Cards', percentage: 85, color: '#10b981' },
  { category: 'Personal Items', percentage: 68, color: '#8b5cf6' }
];

foundReturnStats = [
  { category: 'Wallets & Purses', percentage: 92, color: '#3b82f6' },
  { category: 'Electronics', percentage: 78, color: '#10b981' },
  { category: 'Keys & ID Cards', percentage: 87, color: '#8b5cf6' }
];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  // ---------------- INIT ----------------
  ngOnInit(): void {
    this.initForms();
    this.setInitialDate();
  }

  initForms(): void {
    this.lostItemForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      dateLost: ['', Validators.required],
      timeLost: [''],
      location: ['', Validators.required],
      reward: ['no'],
      value: ['']
    });

    this.foundItemForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      dateFound: ['', Validators.required],
      timeFound: [''],
      location: ['', Validators.required],
      condition: [''],
      personalInfo: ['yes'],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  setInitialDate(): void {
    const today = new Date().toISOString().split('T')[0];
    this.lostItemForm.patchValue({ dateLost: today });
    this.foundItemForm.patchValue({ dateFound: today });
  }

  // ---------------- FORM SWITCH ----------------
  selectReportType(type: 'lost' | 'found'): void {
    this.selectedReportType = type;
  }

  switchToLost(): void {
    this.selectReportType('lost');
  }

  switchToFound(): void {
    this.selectReportType('found');
  }

  // ---------------- FILE HANDLING ----------------
  onFileSelected(event: any, type: 'lost' | 'found'): void {
    const files = Array.from(event.target.files).slice(0, 5) as File[];

    if (type === 'lost') {
      this.lostPhotos = files;
    } else {
      this.foundPhotos = files;
    }
  }

  triggerFileInput(type: 'lost' | 'found'): void {
    const input = document.getElementById(`${type}FileInput`) as HTMLInputElement;
    input?.click();
  }

  // ---------------- SUBMIT LOST ----------------
  onLostSubmit(): void {
    if (this.lostItemForm.invalid) {
      alert('Please fill all required fields');
      return;
    }

    const formData = new FormData();

    Object.entries(this.lostItemForm.value).forEach(([key, value]: any) => {
      formData.append(key, value);
    });

    this.lostPhotos.forEach(file => {
      formData.append('photos', file);
    });

    this.http.post('http://localhost:3000/api/lost', formData).subscribe({
      next: () => {
        alert('Lost item saved successfully');
        this.lostItemForm.reset();
        this.lostPhotos = [];
        this.setInitialDate();
      },
      error: (err) => {
        alert(err.error?.message || 'Failed to save lost item');
      }
    });
  }

  // ---------------- SUBMIT FOUND ----------------
  onFoundSubmit(): void {
    if (this.foundItemForm.invalid) {
      alert('Please fill all required fields');
      return;
    }

    const formData = new FormData();

    Object.entries(this.foundItemForm.value).forEach(([key, value]: any) => {
      formData.append(key, value);
    });

    this.foundPhotos.forEach(file => {
      formData.append('photos', file);
    });

    this.http.post('http://localhost:3000/api/found', formData).subscribe({
      next: () => {
        alert('Found item saved successfully');
        this.foundItemForm.reset();
        this.foundPhotos = [];
        this.setInitialDate();
      },
      error: (err) => {
        alert(err.error?.message || 'Failed to save found item');
      }
    });
  }

  // ---------------- HELPER ----------------
  isFormValid(form: FormGroup): boolean {
    return form.valid;
  }
}
