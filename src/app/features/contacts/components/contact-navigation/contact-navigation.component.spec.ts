import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactNavigationComponent } from './contact-navigation.component';

describe('ContactNavigationComponent', () => {
  let component: ContactNavigationComponent;
  let fixture: ComponentFixture<ContactNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
