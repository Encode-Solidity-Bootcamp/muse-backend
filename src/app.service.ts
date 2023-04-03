import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  itemsList(): Promise<string> {
    throw new Error('Method not implemented.');
  }
  
}
