import { NotFoundException } from '@nestjs/common';
export class UnAutorize extends NotFoundException {
    constructor(message?: string) {
        super(message || 'User is not created');
    }
}