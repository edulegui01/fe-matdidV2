import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
    templateUrl: '../templates/custom-dialog.component.html',
    styleUrls: ['../styles/custom-dialog.component.scss'],
})
export class CustomDialogComponent {

    // parametros que vienen al dialog
    params:any = null;

    constructor(
        public dialogRef: MatDialogRef<CustomDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        console.log(data);
        this.params = this.getDefaultValues(data);
    }

    accept() {
        this.close(true);
    }

    close(data:any = null): void {
        this.dialogRef.close(data);
    }

    getDefaultValues(d: DialogData) {

        let defaultValues: DialogData;

        // si d es null se muestra el siguiente contenido por defecto y se retorna
        if (!d) {
            d = {
                typeDialog: 'confirm',
                title: 'Asignar titulo',
                message: 'Asignar cuerpo de mensaje',
                buttonText: { left: 'ACEPTAR', right: 'CANCELAR' },
                hideCloseButton: false,
                customItem: null,
            };

            // retorno de valores por defecto
            return d;
        }

        // si d tiene algun valor entonces se recuperan los valores a mostrar
        defaultValues = {
            typeDialog: d.typeDialog ? d.typeDialog : 'info',
            title: d.title ? d.title : 'Asignar titulo para la ventana',
            message: d.message ? d.message : 'Asignar Mensaje',
            buttonText: d.buttonText ? { left: d.buttonText.left, right: d.buttonText.right } : { left: 'ACEPTAR', right: 'CANCELAR' },
            hideCloseButton: d.hideCloseButton ? d.hideCloseButton : false,
            customItem: d.customItem ? d.customItem : null,
        };

        return defaultValues;
    }
}

/**
 * Interface que representa los tipos de datos esperados
 * para crear el dialog.
 * typeDialog: info: muestra informacion con un boton de aceptar.
 *              confirm: muestra info mas boton de aceptar-cancelar
 * title: el titulo del dialog.
 * message: texto a mostrar en el dialog.
 * buttonText: texto personalizado para los botones, por default left: aceptar/ right: cancelar.
 * hideCloseButton: oculta el boton de cerrar, no debe cerrarse el dialog a menos que se pulsen los botones de accion
 * customItem: puede contener cualquier tipo dato (objeto, lista, etc), sirve para enviar estructuras complejas
 *              que requieran iteracion o mostrar valores adicionales.
 */
export interface DialogData {
    typeDialog: string;
    title: string;
    message: string;
    buttonText: { left: string, right: string };
    hideCloseButton: boolean;
    customItem: any;
}
