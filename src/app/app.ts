import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskManagerBoard } from './task-manager-board/task-manager-board'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskManagerBoard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task-management');
  
}
