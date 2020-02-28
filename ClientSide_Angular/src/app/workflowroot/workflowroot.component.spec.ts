import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import axios from "axios";
import { WorkflowrootComponent } from './workflowroot.component';

describe('WorkflowrootComponent', () => {
  let component: WorkflowrootComponent;
  let fixture: ComponentFixture<WorkflowrootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowrootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowrootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
