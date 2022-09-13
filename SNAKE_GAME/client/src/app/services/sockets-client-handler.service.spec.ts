import { TestBed } from '@angular/core/testing';

import { SocketsClientHandlerService } from './sockets-client-handler.service';

describe('SocketsClientHandlerService', () => {
  let service: SocketsClientHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketsClientHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
