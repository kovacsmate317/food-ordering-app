import { Component } from '@angular/core';
import { Address } from '../../shared/models/types';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  email = 'user@example.com';

  addresses: Address[] = [
    {
      town: 'Denver',
      street: 'Main Street',
      number: '123',
      level: '2',
      door: 'B',
      ring: '101',
      countyCode: 'CO-001',
    },
    {
      town: 'Boulder',
      street: 'Pine Avenue',
      number: '456',
      level: '3',
      door: 'C',
      ring: '202',
      countyCode: 'CO-002',
    },
  ];
}
