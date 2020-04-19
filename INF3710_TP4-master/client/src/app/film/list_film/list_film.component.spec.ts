import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {listFilmComponent } from './list_film.component';

describe('listFilmComponent', () => {
  let component: listFilmComponent;
  let fixture: ComponentFixture<listFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ listFilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(listFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
