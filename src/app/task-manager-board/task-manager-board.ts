import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task{
  id: any;
  title: string;
  category: string;
  priority: string;
  duedate: Date;
  description: string;
  status : string;
  createdAt : Date;
  // optional fields
  completedAt? : Date;  
}

@Component({
  selector: 'app-task-manager-board',
  imports: [FormsModule, CommonModule],
  templateUrl: './task-manager-board.html',
  styleUrl: './task-manager-board.css'
})

export class TaskManagerBoard {
  title : string = "Task manager";
  // lightmodeurl = '/light-mode-icon.jpg';
  lightmodeurl = '/light-mode-icon-removebg.png|';
  darkmodeurl = '/dark-mode-icon.png';

  isInvalidTitle: boolean | undefined;
  isInvalidCategory: boolean | undefined;
  isInvalidPriority: boolean | undefined;
  isInvalidDuedate: boolean | undefined;

  today = this.toDateInputValue(new Date());

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
    },
  ]

  // Dropdown options

  categories : string[] = ['Work', 'Personal', 'Shopping', 'Health', 'Finance', 'Education', 'Other'];
  priorities : string[] = ['Low', 'Medium', 'High', 'Urgent'];
  statuses : string[] = ['Pending', 'In-Progress', 'Completed', 'Cancelled'];

  //form data
  newTask :{
    title : string,
    description : string,
    category: string,
    priority: string,
    duedate: string,
    status: string
  }={
    title : '',
    description : '',
    category: '',
    priority: 'Medium',
    duedate: '',
    status: 'Pending'
  };


  // filter controls
  filterStatus : string ='All';
  filterCategory: string ='All';
  filterPriority : string = 'All';
  showCompleted : boolean = true;


  //methods
  getCompletedTaskCount() : number{
    return this.tasks.filter(task => task.status === 'Completed').length;
  }

  getPendingTaskCount() : number{
    return this.tasks.filter(task => task.status === 'Pending').length;
  }

  getOverdueTaskCount() : number{
   return this.tasks.filter(task => task.duedate < new Date() && task.status !== 'Completed').length;
  }

  getCompletionRate() : number {
    if(this.getCompletedTaskCount() === 0) return 0;
    return Math.round((this.getCompletedTaskCount() / this.tasks.length) * 100);
  }

  getProductivityrate() : string {
    const rate = this.getCompletionRate();
    if(rate >= 80) return 'Excellent';
    else if(rate >= 60) return 'Good';
    else if(rate >= 40) return 'Average';
    else return 'Poor';
  }

  validateTitle(title: any) : void{
    this.isInvalidTitle = true;
    if(title !== '' ) {
      this.isInvalidTitle = false;
    }
  }

  validateCategory(category: any) : void{
      this. isInvalidCategory = true;
    if(category !== ''){
      this.isInvalidCategory = false; 
    }
  }

  validatePriority(priority: any) : void{
    this.isInvalidPriority = true;
    if(priority !== '' ) {
      this.isInvalidPriority = false;
    }
  }


  private toDateInputValue(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  validateDate(duedate: string): void {
    this.isInvalidDuedate = !duedate;
  }

  addTask() : void{
    if(!this.newTask.title || !this.newTask.category || !this.newTask.duedate ){
      return;
    }

    const task: Task = {
      id: this.tasks.length + 1,
      title: this.newTask.title,
      category: this.newTask.category,
      priority: this.newTask.priority,
      duedate: new Date(this.newTask.duedate),
      description: this.newTask.description,
      status: this.newTask.status,
      createdAt: new Date()
    };

    this.tasks.push(task);
    this.clearForm();
  
  }

  clearForm(){
    this.newTask ={
    title : '',
    description : '',
    category: '',
    priority: 'Medium',
    duedate: '',
    status: 'Pending'
  };
  }

  filteredTasks() : Task[]{
    let filtered = [...this.tasks];

    if(this.filterStatus !== 'All'){
      filtered = filtered.filter(task => task.status === this.filterStatus);
    }

    if(this.filterCategory !== 'All'){
      filtered = filtered.filter(task => task.category === this.filterCategory);
    }

    if(this.filterPriority !== 'All'){
      filtered = filtered.filter(task => task.priority === this.filterPriority);
    }

    if(!this.showCompleted){
      filtered = filtered.filter(task => task.status !== 'Completed');
    }
    // console.log(filtered);
    return filtered;
    
  }

  deleteTask(taskId: number): void{
    let seletedTask = this.tasks.find(task => task.id === taskId);
    this.tasks.pop();
    console.log(seletedTask);
  }
}
