import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task{
  id: number;
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
  styleUrl: './task-manager-board.css',
})

export class TaskManagerBoard {
  title : string = "Task manager";
  // lightmodeurl = '/light-mode-icon.jpg';
  lightmodeurl = '/light-mode-icon-removebg.png|';
  darkmodeurl = '/dark-mode-icon.png';

  isInvalidTitle : any;
  isInvalidCategory : any;
  isInvalidPriority : any;
  isInvalidDuedate : any;

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
      priority: 'Medium', 
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
    duedate: string | Date,
    status: string
  }  ={
    title : '',
    description : '',
    category: '',
    priority: 'medium',
    duedate: '',
    status: 'pending'
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

  validateTitle($event: any) : void{
    this.isInvalidTitle = true;
    if($event.target.value !== '' ) {
      this.isInvalidTitle = false;
    }
  }

  validateCategory($event: any) : void{
      this. isInvalidCategory = true;
    if($event.target.value !== 'All'){
      this.isInvalidCategory = false; 
    }
  }

  validatePriority($event: any) : void{
    this.isInvalidPriority = true;
    if($event.target.value !== 'All' ) {
      this.isInvalidPriority = false;
    }
  }

  validateDate($event: any) : void{
    this.isInvalidDuedate = true;
    const current = new Date() ;
    console.log(current);
    if($event.target.value !== '' && $event.target.value >= current){
      this.isInvalidDuedate = false;
    }
    console.log($event.target.value);
  }
}
