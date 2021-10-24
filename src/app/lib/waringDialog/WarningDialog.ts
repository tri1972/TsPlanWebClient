
import { Component, OnInit, NgZone,Inject } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { title } from 'process';

export class WarningDialog {

    constructor(
        public dialog: MatDialog
    ) {

    }

    public Open(title:String,message:String)
    {
        this.dialog.open(WarningDialogTemplate,
            {'data' : {'title': title , 'message' :message
            }
        });
    }
}

@Component({
    selector: 'dialog-elements-example-dialog',
    templateUrl: './dialog-elements-warning-dialog.html',
})
export class WarningDialogTemplate {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data : any,
        public dialog: MatDialog
    ) 
    {
    }

    ngOnInit(): void 
    {
    }

    Close() 
    {
        this.dialog.closeAll();
    }
}