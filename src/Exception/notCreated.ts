import { NotFoundException } from '@nestjs/common';
export class NotCreated extends NotFoundException {
  constructor(message?: string) {
    super(message || 'User is not created');
  }
}