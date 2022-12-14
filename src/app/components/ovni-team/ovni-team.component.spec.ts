import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvniTeamComponent } from './ovni-team.component';

describe('OvniTeamComponent', () => {
  let component: OvniTeamComponent;
  let fixture: ComponentFixture<OvniTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvniTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OvniTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
