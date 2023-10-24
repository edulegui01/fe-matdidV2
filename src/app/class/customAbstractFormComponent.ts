import { GlobalMessage } from './global-message';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServiceBase } from './serviceAbstract';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { GlobalService } from '../global-service/global.service';
import { CustomDialogComponent } from '../components/custom-dialog/components/custom-dialog.component';
import { Settings } from './settings';
import { first } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';
import { MENU_URLS } from '../components/navbar/routes';


export abstract class CustomAbstractFormComponent implements OnDestroy {

    entityForm: FormGroup = null;
    colsSize = 2;
    entityData = null;
    pe = null;
    viewText = GlobalMessage.VIEW_LABELS;
    params = null;
    lockValues = null;
    createDefaultMessage = 'EL REGISTRO';
    updateDefaultMessage = 'EL REGISTRO';

    menuOptions = {
        menuUrl: '',
        listar: '',
        editar: '',
        nuevo: '',
        eliminar: '',
        menuDict: ''
    };

    frmBuilder: FormBuilder;
    entityService: ServiceBase;
    routerInstance: Router;
    dialogInstance!: MatDialog;
    snackbarInstance!: MatSnackBar;
    globalSrvInstance!: GlobalService;
    dialogRef: any;
    //matDialog!: MatDialogRef<any>;  //para popup

    /*frmBuilder!: FormBuilder;
    entityService!: ServiceBase<any>;
    routerInstance: Router;
    dialogInstance!: MatDialog;
    snackbarInstance!: MatSnackBar;
    globalSrvInstance!: GlobalService;
    dialogRef: any;
    matDialog!: MatDialogRef<any>;  //para popup*/


    constructor(menuUrl: any, router: Router) {
        this.buildMenuPathOptions(menuUrl);
        this.routerInstance = router;

        if (this.routerInstance.getCurrentNavigation()) {
            this.params = this.routerInstance.getCurrentNavigation().extras.state
                ? this.routerInstance.getCurrentNavigation().extras.state : null;

            if (this.params) {
                this.entityData = this.params;
            }
        }
    }

    buildMenuPathOptions(menuUrl: any) {
        this.menuOptions = {
            menuUrl: menuUrl.URL_BASE,
            listar: menuUrl.LISTAR['PERMISO'],
            editar: menuUrl.EDITAR['PERMISO'],
            nuevo: menuUrl.NUEVO['PERMISO'],
            eliminar: menuUrl.ELIMINAR['PERMISO'],
            menuDict: menuUrl
        };
    }

    ngOnDestroy() {
        if (this.entityService.editForm) {
            this.entityService.editForm = false;
        }
        this.params = null;
        this.entityData = null;
    }

    onResize() {
        this.colsSize = window.innerWidth <= 400 ? 1 : 2;
    }

    doCreate(entity: any) {

        //PREGUNTA SI CARGAR EL FORMULARIO SI EL ESTADO SE ENCUENTRA EN ACTIVO.
        if (entity.hasOwnProperty('activo')) {
            entity.activo = true;
        }

        if (this.entityForm.invalid) {
            this.snackbarInstance.open(this.viewText.INVALID_FORM
                , 'OK'
                , {
                    duration: Settings.SHORT_TIME
                    , panelClass: Settings.FAILED_MESSAGE_CLASS
                }
            );
            return;
        }

        this.dialogInstance.open(CustomDialogComponent, {
            width: Settings.DIALOG_MEDIUM,
            data: {
                typeDialog: 'confirm',
                title: this.viewText.ATTENTION,
                message: `${this.viewText.CONFIRM_CREATE} <b>${this.createDefaultMessage}</b>?.`,
            },
        }).afterClosed().pipe(first()).subscribe(data => {
            if (data) {
                this.entityService.create(entity).pipe(first()).subscribe(result => {
                    this.entityData = null;
                    this.resetForm();
                });
            }
        });
    }

    doUpdate(entity: any) {

        if (this.entityForm.invalid) {
            this.snackbarInstance.open(this.viewText.INVALID_FORM
                , 'OK'
                , {
                    duration: Settings.SHORT_TIME
                    , panelClass: Settings.FAILED_MESSAGE_CLASS
                }
            );
            return;
        }

        this.dialogInstance.open(CustomDialogComponent, {
            width: Settings.DIALOG_MEDIUM,
            data: {
                typeDialog: 'confirm',
                title: this.viewText.ATTENTION,
                message: `${this.viewText.CONFIRM_EDIT} <b>${this.createDefaultMessage}</b>?.`,
            },
        }).afterClosed().pipe(first()).subscribe(data => {
            if (data) {
                entity.id = this.entityData.id;
                const isSame = this.globalSrvInstance.compareTwoObjectIsSame(this.entityData, entity);

                if (!isSame) {
                    this.entityService.update(entity).pipe(first()).subscribe(result => {
                        this.entityData = null;
                        this.params = null;
                        this.resetForm();//LIMPIA EL FORMULARIO.
                        this.closeEdit();//SALE DE LA PÁGINA.
                    });
                }
            }
        });
    }

    resetForm() {
        this.entityForm.reset();
    }

    getErrorMessage(controlName: string) {
        const msg = this.entityForm.controls[controlName].hasError('required') ? 'EL CAMPO NO PUEDE ESTAR VACIO' : '';
        if (msg) {
            this.entityForm.controls[controlName].markAsTouched();
        }
        return msg;
    }

    closeEdit() {
        this.routerInstance.navigate(['../' + this.menuOptions.menuUrl]);
    }

    abstract buildForm(entity: any);
    abstract create();
    abstract update();
    abstract getFormValues();


}