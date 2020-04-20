import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchFilmComponent } from './watch-film.component';

describe('WatchFilmComponent', () => {
  let component: WatchFilmComponent;
  let fixture: ComponentFixture<WatchFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchFilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
