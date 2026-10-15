import { Injectable } from '@angular/core';
import { Task } from '../task-manager-board/task-manager-board';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  tasks : Task[] = [
    { 
    id: 1,
    title: 'Completed Angular task', 
    category: 'Educational',
    priority: 'High', 
    duedate: new Date('09-08-2027'), 
    description: "finish it before 31st of august", 
    status: 'In-Progress', 
    createdAt: new Date('08-23-2026')
  },
  { 
    id: 2,
    title: 'Buy groceries', 
    category: 'Personal',
    priority: 'Medium', 
    duedate: new Date('08-26-2026'), 
    description: "Milk, bread, kanda", 
    status: 'Cancelled', 
    createdAt: new Date('02-08-2026')
  },
  { 
    id: 3,
    title: 'Manageral round', 
    category: 'Work',
    priority: 'Urgent', 
    duedate: new Date('04-10-2026'), 
    description: "book a ticket to bangalore and prepare for interview", 
    status: 'Completed', 
    createdAt: new Date('03-10-2026')
  },
  { 
    id: 4,
    title: 'Start DSA preparation', 
    category: 'Education',
    priority: 'Low', 
    duedate: new Date('12-31-2026'), 
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
    status: 'Pending', 
    createdAt: new Date('04-10-2026')
  }
  ]

  getTasks() : Task[]{
    return this.tasks;
  }

  addTask(task : Task) : void{
    this.tasks.push(task);
  }

  deleteTask(id : number) : void{
    const index = this.tasks.findIndex(t => t.id === id);
    if(index !== -1){
      this.tasks.splice(index,1);
    }
  }
    
  toggleCompletedtask(id: number) : void{
    let task = this.tasks.find(t => t.id === id);
    if(task){
      if(task.status !== 'Completed'){
        task.status = 'Completed';
        task.completedAt = new Date()
      }else{
        task.status = 'Pending';
        delete task.completedAt;
      }
    }
  }
}
