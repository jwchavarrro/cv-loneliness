import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CvStore } from './cv.store';

describe('CvStore', () => {
  let store: CvStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CvStore, provideZonelessChangeDetection()]
    });
    store = TestBed.inject(CvStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should have showCv initialized as false', () => {
    expect(store.showCv()).toBe(false);
  });

  it('should set showCv to true when showCvView is called', () => {
    store.showCvView();
    expect(store.showCv()).toBe(true);
  });

  it('should set showCv to false when hideCvView is called', () => {
    store.showCvView();
    expect(store.showCv()).toBe(true);
    store.hideCvView();
    expect(store.showCv()).toBe(false);
  });

  it('should toggle showCv correctly', () => {
    expect(store.showCv()).toBe(false);
    store.showCvView();
    expect(store.showCv()).toBe(true);
    store.hideCvView();
    expect(store.showCv()).toBe(false);
  });
});

