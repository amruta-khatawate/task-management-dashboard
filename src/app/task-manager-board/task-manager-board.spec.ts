import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagerBoard } from './task-manager-board';

describe('TaskManagerBoard', () => {
  let component: TaskManagerBoard;
  let fixture: ComponentFixture<TaskManagerBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskManagerBoard],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskManagerBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
