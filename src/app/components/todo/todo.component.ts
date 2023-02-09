import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { withJsonpSupport } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITranslateHistory } from 'src/app/models/TranslateHistory';
import { ITranslateLanguage } from 'src/app/models/translateLanguage';
import { TranslateLanguageService } from 'src/app/services/translate-language.service';
import { UserTaskService } from 'src/app/services/user-task.service';
import { UserService } from 'src/app/services/user.service';
import { ITask } from '../../models/task';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  allTasks: any[] = [];
  todotasks: ITask[] = [];
  inprogress: ITask[] = [];
  done: ITask[] = [];
  updateId!: any;
  isEditEnabled: boolean = false;
  taskToBeUpdated!: ITask;
  addedTask!: ITask;
  translatedText: string = '';
  translateHistory: ITranslateHistory[] = [];

  constructor(
    private fb: FormBuilder,
    private userTaskService: UserTaskService,
    private usrService: UserService,
    private translateLanguageService: TranslateLanguageService
  ) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required],
    });

    this.userTaskService
      .getUserTasks(Number(this.usrService.getValue('userId')))
      .subscribe({
        next: (res) => {
          //copying user task response data to array
          this.allTasks = res;

          this.allTasks.map((item) => {
            if (item.userTaskStatusId == 1) {
              this.todotasks.push({
                id: item.id,
                taskDescription: item.taskDescription,
                userId: item.userId,
                userTaskStatusId: item.userTaskStatusId,
              });
            } else if (item.userTaskStatusId == 2) {
              this.inprogress.push({
                id: item.id,
                taskDescription: item.taskDescription,
                userId: item.userId,
                userTaskStatusId: item.userTaskStatusId,
              });
            } else if (item.userTaskStatusId == 3) {
              this.done.push({
                id: item.id,
                taskDescription: item.taskDescription,
                userId: item.userId,
                userTaskStatusId: item.userTaskStatusId,
              });
            }
          });
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
  }

  addTask() {
    //Add task to database
    this.userTaskService
      .addUserTask({
        taskDescription: this.todoForm.value.item,
        userId: Number(this.usrService.getValue('userId')),
      })
      .subscribe({
        next: (res) => {
          this.addedTask = res;
          this.todotasks.push(this.addedTask);
          this.translatedText = '';
          this.todoForm.reset();
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
  }

  translateTask() {
    //call Google Translate API to translate text from English to Hindi
    this.translateLanguageService
      .translate({
        q: this.todoForm.value.item,
        source: 'en',
        target: 'hi',
        format: 'text',
      })
      .subscribe({
        next: (res) => {
           this.translatedText = res.data.translations[0].translatedText;
          

          //Record user translate activity into database
          this.translateLanguageService
            .addTranslateHistory({
              userId: Number(this.usrService.getValue('userId')),
              fromLanguage: 'English',
              fromText: this.todoForm.value.item,
              toLanguage: 'Hindi',
              toText: this.translatedText,
            })
            .subscribe({
              next: (res) => {
                //History Saved Successfully
              },
              error: (err) => {
                alert(err?.error.message);
                this.translatedText = '';
              },
            });
        },
        error: (err) => {
          alert(err?.error.message);
          this.translatedText = '';
        },
      });
  }
  OnEdit(item: ITask, i: number) {
    this.todoForm.controls['item'].setValue(item.taskDescription);
    this.updateId = i;
    this.isEditEnabled = true;
  }
  updateTask() {
    this.todotasks[this.updateId].taskDescription = this.todoForm.value.item;

    //Update task to database
    this.userTaskService
      .updateUserTask(this.todotasks[this.updateId])
      .subscribe({
        next: (res) => {
          this.todoForm.reset();
          this.updateId = undefined;
          this.translatedText = '';
          this.isEditEnabled = false;
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
  }

  deleteTask(i: number) {
    // remove clicked item

    this.userTaskService.deleteUserTask(this.todotasks[i].id).subscribe({
      next: (res) => {
        this.todotasks.splice(i, 1);
      },
      error: (err) => {
        alert(err?.error.message);
      },
    });
  }
  deleteInProgressTask(i: number) {
    // remove clicked item

    this.inprogress.splice(i, 1);
  }
  deletedone(i: number) {
    // remove clicked item

    this.done.splice(i, 1);
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      //Selected task to be updated
      this.taskToBeUpdated = event.previousContainer.data[event.previousIndex];

      //Container where it is being dropped so we need to update status accordingly
      if (event.container.id == 'cdk-drop-list-0') {
        this.taskToBeUpdated.userTaskStatusId = 1;
      } else if (event.container.id == 'cdk-drop-list-1') {
        this.taskToBeUpdated.userTaskStatusId = 2;
      } else if (event.container.id == 'cdk-drop-list-2') {
        this.taskToBeUpdated.userTaskStatusId = 3;
      }

      this.userTaskService.updateUserTask(this.taskToBeUpdated).subscribe({
        next: (res) => {
          console.log('update successful');
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
