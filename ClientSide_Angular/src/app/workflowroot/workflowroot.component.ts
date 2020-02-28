/*
*ファイル名: workflowroot.component.ts
*作成日：2020.02.17
*
*author: ivs
*/
import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '../route';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

import { Location } from '@angular/common';
export interface DialogData {
  animal: string;
  name: string;
}

// set header api
const headers = new HttpHeaders(
  { "test": "test" }
);

@Component({
  selector: 'app-workflowroot',
  templateUrl: './workflowroot.component.html',
  styleUrls: ['./workflowroot.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'ja-JP' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ], //define datetime to Japan datetime
})

export class WorkflowrootComponent implements OnInit {

  routes: any; //save sponse data
  message: any;
  countListArray: Array<any> = [];
  users: any
  animal: string;
  name: string;
  // editContent: any
  enabled = true;
  isShow = false;
  show = true;
  showListError = false;
  closeResult: string;

  //array only stores 1 object use to add the row
  addNewWorkFlowListArray: Array<any> = [];

  // save object update and create to send to server 
  updateListNowArray: Array<any> = [];

  // error list array error
  errorListArray: Array<any> = [];

  constructor(private modalService: NgbModal, private router: Router, private http: HttpClient,
    private _adapter: DateAdapter<any>, public dialog: MatDialog, private location: Location) {
  }

  getColor(cell) {
    console.log('cell: ' + cell)
    switch (cell) {
      case '':
        return "red";
    }
  }

  /* 
  *function when initialization
  */
  ngOnInit() {

    // this.editContent = true;

    let resp = this.http.get<Route[]>("http://localhost:8888/api/v1/workflowroot", { headers }); //api request data with get method

    resp.subscribe((data: any[]) => {
      console.log('data ne: ' + data);
      this.routes = data["data"];
      let myArrStr = JSON.stringify(Object(this.routes)); // get date from server return

      for (let i = 0; i < data["data"].length; i++) {
        this.countListArray.push(data["data"][i]); //push data to countListArray
      }

      //search workfowID max 
      let maxWorkFlowID = 1;
      for (let i = 0; i < this.countListArray.length; i++) {
        for (let j = i + 1; j < this.countListArray.length; j++) {
          if (this.countListArray[i].workflow_id <= this.countListArray[j].workflow_id) {
            maxWorkFlowID = this.countListArray[j].workflow_id // set maxWorkFlowID
          }
        }
      }

      //use when add row workflow(seq defaul 0, workflowID will +1, version default 1 )
      this.addNewWorkFlowListArray.push({
        seq: 0, workflow_id: maxWorkFlowID + 1, workflow_mei: ''
        , tekiyoukaishi_bi: '', tekiyoushuryou_bi: '', version: 1, yuukou_flg: 0
      })

    });

  }

  /* 
  *add row button
  *Khi thêm thì thêm 1 object vào 1 mảng mới, mảng mới này sẽ được gửi đi khi nhấn đăng ký
  */
  addRow() {
    this.errorListArray.splice(0, 1000);
    this.showListError = false
    if (this.addNewWorkFlowListArray.length > 0) {
      const person = this.addNewWorkFlowListArray[0]; //addNewWorkFlowListArray only store 1 obj, use when add row
      this.routes.push(person); //push to routes array to display on screen

      this.updateListNowArray.push(person) //push to updateListNowArray to send to the server
      console.log('add row - danh sach updateListNowArray: ' + JSON.stringify(this.updateListNowArray))

      this.countListArray.push(person); //array to count list

      this.addNewWorkFlowListArray.splice(0, 1); //clear element of array only stores 1 object used to add the row

      //get max work flow id
      let maxWorkFlowID = 1;
      for (let i = 0; i < this.countListArray.length; i++) {
        for (let j = i + 1; j < this.countListArray.length; j++) {
          if (this.countListArray[i].workflow_id <= this.countListArray[j].workflow_id) {
            maxWorkFlowID = this.countListArray[j].workflow_id
          }
        }
      }

      this.addNewWorkFlowListArray.push({
        seq: 0, workflow_id: maxWorkFlowID + 1, workflow_mei: ''
        , tekiyoukaishi_bi: '', tekiyoushuryou_bi: '', version: 1, yuukou_flg: 0
      })  //push to array only stores 1 object used to add the row

    }
    this.errorListArray.splice(0, 1000); //Clear the list of error arrays
  }
  /*
  *button setting: check flag valid
  */
  checkFlagUpdate(flag: number, route: any, isEditable: any, content2: any) {
    this.errorListArray.splice(0, 1000);
    this.showListError = false
    if (flag == 1) { // case flag = 1 is public status: can not click button
      let W000013 = { //create error object
        idError: "W000013",
        contentError: "公開状態(有効フラグが1：有効)"
      }

      this.errorListArray.push(W000013) // push error obj to errorListArray
      this.showListError = true //display error list on creen 
      route.isEditable = false //disable button

    } else { // case flag = 0 is not public statuc: can click button to update
      route.isEditable = true //able buttton

      //show data change warning
      this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

    }
  }

  /*
  *button workflow update 
  *Khi cập nhập thì sẽ cập trong mảng và lưu đối tượng cập nhật vào 1 mảng mới, mảng mới này sẽ được gửi đi khi nhấn đăng ký
  */
  updateList(seq: number, workflow_id: number, workflow_mei: string, tekiyoukaishi_bi: Date, tekiyoushuryou_bi: Date, version: number, yuukou_flg: number) {
    this.errorListArray.splice(0, 1000); //clean error list
    this.showListError = false //disable error list

    if (yuukou_flg == 0 && seq == 0) { //find and update into updateListNowArray with if is workflow_id and version(updateListNowArray 
      // is not add to database)

      this.updateListNowArray.find(item => item.workflow_id == workflow_id && item.version == version).workflow_mei = workflow_mei;
      this.updateListNowArray.find(item => item.workflow_id == workflow_id && item.version == version).tekiyoukaishi_bi = tekiyoukaishi_bi;
      this.updateListNowArray.find(item => item.workflow_id == workflow_id && item.version == version).tekiyoushuryou_bi = tekiyoushuryou_bi;
      console.log('- Danh sách để gửi đi: ' + JSON.stringify((this.updateListNowArray)))

    } else if (yuukou_flg == 0 && seq != 0) {//find and update into routes with if is workflow_id and version
      //(routes is added to database)

      this.routes.find(item => item.workflow_id == workflow_id && item.version == version).workflow_mei = workflow_mei;
      this.routes.find(item => item.workflow_id == workflow_id && item.version == version).tekiyoukaishi_bi = tekiyoukaishi_bi;
      this.routes.find(item => item.workflow_id == workflow_id && item.version == version).tekiyoushuryou_bi = tekiyoushuryou_bi;

      let data = {
        seq: seq, workflow_id: workflow_id, workflow_mei: workflow_mei, tekiyoukaishi_bi: tekiyoukaishi_bi,
        tekiyoushuryou_bi: tekiyoushuryou_bi, version: version, yuukou_flg: yuukou_flg
      }
      this.updateListNowArray.push(data); //push updated object to updateListNowArray

      console.log('- Danh sách để gửi đi: ' + JSON.stringify((this.updateListNowArray)))

    } else { //case flag =1; public status is can not edit
      let W000013 = {
        idError: "W000004",
        contentError: "公開状態(有効フラグが1：有効)"
      }
      this.errorListArray.push(W000013)
      this.showListError = true

    }

  }

  /*
  *reload page
  */
  reload() {
    location.reload();
  }

  /*
  *button sign up
  */
  signUp() {

    //delete error list
    this.errorListArray.splice(0, 1000);
    this.showListError = false


    // check input
    for (let i = 0; i < this.routes.length; i++) {
      if (
        this.routes[i].workflow_mei == '' ||
        this.routes[i].tekiyoukaishi_bi == '' ||
        this.routes[i].tekiyoushuryou_bi == ''
      ) {
        let W0000XX = {
          idError: "W0000XX",
          contentError: "完全な情報を入力してください" + "       " + "(" + (i + 1) + "行目" + ")"
        }
        this.errorListArray.push(W0000XX)
      }
    }


    //error case W000004: !version, === date -> add error to error list array
    for (let i = 0; i < this.updateListNowArray.length; i++) {
      for (let j = 0; j < this.routes.length; j++) {
        console.log('mili giay: ' + (new Date(this.updateListNowArray[i].tekiyoukaishi_bi).getTime()))
        if (this.updateListNowArray[i].workflow_id == this.routes[j].workflow_id &&
          this.updateListNowArray[i].version != this.routes[j].version &&
          (new Date(this.updateListNowArray[i].tekiyoukaishi_bi).getTime() == new Date(this.routes[j].tekiyoukaishi_bi).getTime() ||
            new Date(this.updateListNowArray[i].tekiyoushuryou_bi).getTime() == new Date(this.routes[j].tekiyoushuryou_bi).getTime())
        ) {
          let W000004 = {
            idError: "W000004",
            contentError: "バージョン違いで期間が重複する場合" + "       " + "(" + (j + 1) + "行目" + ")"
          }
          this.errorListArray.push(W000004);
        }
      }

    }

    //error case W000003: Effective date > expiration date -> add error to error list array
    for (let i = 0; i < this.routes.length; i++) {
      if (new Date(this.routes[i].tekiyoukaishi_bi).getTime() >= new Date(this.routes[i].tekiyoushuryou_bi).getTime()) {
        let W000003 = {
          idError: "W000003",
          contentError: "適用開始日と日付が逆転している場合" + "       " + "(" + (i + 1) + "行目" + ")"
        }
        this.errorListArray.push(W000003)
      }
    }

    // new version but date <= date now
    for (let i = this.updateListNowArray.length - 1; i >= 0; i--) {
      for (let j = this.routes.length - 1; j >= 0; j--) {
        if (this.updateListNowArray[i].seq == 0 &&
          this.updateListNowArray[i].workflow_id == this.routes[j].workflow_id &&
          this.updateListNowArray[i].version > this.routes[j].version &&
          new Date(this.updateListNowArray[i].tekiyoushuryou_bi).getTime() <= new Date(Date.now()).getTime()
        ) {
          let W000006 = {
            idError: "W000006",
            contentError: "最新バージョンで未来日以外の場合" + "(" + (j + 1) + "行目" + ")"
          }
          this.errorListArray.push(W000006)
        }
      }

    }

    //implement a registration
    if (this.errorListArray.length == 0 && this.updateListNowArray.length > 0) { //check not errror and list change is not nulll

      let myArrStr = JSON.stringify((this.updateListNowArray)) //try convert
      // .replace(/]/g, '').replace(/\[/g,'');
      let data = JSON.parse(myArrStr) //return convert
      let resp = this.http.post("http://localhost:8888/api/v1/workflowroot", data, { headers });

      resp.subscribe((data) => {
        this.message = data
        this.isShow = !this.isShow; //show notification of successful registration
        // location.reload();
      });
    } else if (this.updateListNowArray.length == 0) { //list add and update is null
      let errorNull = {
        contentError: "Nothing to update, please test again"
      }
      this.errorListArray.push(errorNull)

      //show error list
      this.showListError = true

    } else {
      this.showListError = true
    }

  }

/*
*button copy and new row
*/
  copyNew(index: any, seq: any, i: any, v: any) {

    // var workFlow =  ({seq: "0",workflow_id: this.routes[index]["workflow_id"],version: this.routes[index]["version"]+1 });
    // console.log('abc '+ JSON.stringify(workFlow))

    this.errorListArray.splice(0, 1000); //clean error list
    this.showListError = false
    if (index >= 0 && seq != 0) { //check index and check seq with condition seq is primary key auto increase added into database
      let max = 1;
      for (let j = 0; j < this.routes.length; j++) {
        if (this.routes[index]["workflow_id"] == this.routes[j]["workflow_id"] &&
          (this.routes[index]["version"] < this.routes[j].version || this.routes[index]["version"] == this.routes[j]["version"])) {
          max = this.routes[j]["version"];
        } //get max version
      }
      this.routes.push({ //push to routes array to display on screen(version +1)
        seq: 0, workflow_id: this.routes[index].workflow_id, workflow_mei: this.routes[index].workflow_mei
        , tekiyoukaishi_bi: '', tekiyoushuryou_bi: '', version: max + 1, yuukou_flg: 0
      })
      this.updateListNowArray.push({ //push to updateListNowArray to send to the server
        seq: 0, workflow_id: this.routes[index].workflow_id, workflow_mei: this.routes[index].workflow_mei
        , tekiyoukaishi_bi: '', tekiyoushuryou_bi: '', version: max + 1, yuukou_flg: 0
      })
      console.log('update list now: ' + JSON.stringify(this.updateListNowArray))
    }
    else { // check seq = 0, row is new add will not able copy and new
      let rowNotAdded = {
        idError: "RND00001",
        contentError: "this workflow not added, please add this workflow!" + "row" + (index + 1)
      }
      this.errorListArray.push(rowNotAdded)
      this.showListError = true
    }


  }

  /*
  *sign up button: Open the confirmation window  
  */
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /*
  *cancel button: cancel the comfirmation window
  */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  /*
  *can use but not used yet
  */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


}

//can use but not used yet
@Component({
  selector: 'workflowroot',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();

  }

}
