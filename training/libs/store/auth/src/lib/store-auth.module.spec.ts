import { async, TestBed } from '@angular/core/testing';
import { StoreAuthModule } from './store-auth.module';

describe('StoreAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreAuthModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StoreAuthModule).toBeDefined();
  });
});
