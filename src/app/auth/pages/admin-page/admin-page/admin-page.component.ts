import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, filter, takeUntil } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AdminService } from 'src/app/auth/services/admin.service';
import { TableService } from 'src/app/auth/services/table.service';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class AdminPageComponent implements OnInit, OnDestroy {
  public users: User[] = [];
  public user?: User;
  private _unsubscribe$ = new Subject<boolean>();
  public editMode?: boolean = false;
  public visible: boolean = false;

  constructor(
    private _adminService: AdminService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
    private _tableReloadService: TableService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getReloadTable()
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }

  getAllUsers() {
    this._adminService
      .getAllUsers()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((user) => (this.users = user));
  }

  deleteUser(id: number) {
    this._adminService
      .deleteUser(id)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => this._tableReloadService.setReloadTable(true));
  }

  editUser(id: number) {
    this.editMode = true;
    this.user = this.users.find((user) => user.id === id);
  }

  exitForm() {
    this.editMode = false;
  }

  onSubmit() {
    if (this.user) {
      this._adminService
        .updateUser(this.user.id!, this.user)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe(
          (updatedUser) => {
            this._messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User updated',
            });
            this.exitForm();
            this._tableReloadService.setReloadTable(true)
          },
          (error) => {
            this._messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error updating user',
            });
          }
        );
    }
  }

  getReloadTable() {
    this._tableReloadService
      .getReloadTable$()
      .pipe(
        takeUntil(this._unsubscribe$),
        filter((resp) => resp)
      )
      .subscribe(() => {
        this.getAllUsers();
      });
  }

  confirmDelete(userId: number) {
    this._confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUser(userId);
        this._messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'User deleted',
        });
      },
      reject: () => {
        this._messageService.add({
          severity: 'warn',
          summary: 'Cancelled',
          detail: 'You have cancelled',
        });
      },
    });
  }
}

