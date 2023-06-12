import { NotFoundException } from '@nestjs/common';

export class NotFound extends NotFoundException{
    constructor(message?: string) {
        super(message || 'User not Found with the provided username');
    }
}