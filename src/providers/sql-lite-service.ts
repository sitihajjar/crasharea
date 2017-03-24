import {SQLite} from 'ionic-native';
import {GlobalService} from './global-service';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
//noinspection TypeScriptCheckImport
import {vsprintf} from 'sprintf-js';

/*
 Generated class for the SQLiteService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class SQLiteService {
  dbName:string = "ionWaLM.db";
  dbLocation:string = "default";
  sql:string = "";
  public data:Array<Object>;

  constructor(public db:SQLite, public http:Http, public globalService:GlobalService) {

  }

  init() {
    // let db = new SQLite();
    this.db.openDatabase({
      name: this.dbName,
      location: this.dbLocation
    }).then(() => {
      // create user table
      /*this.db.executeSql("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT)", {}).then((data) => {
        this.globalService.modal("TABLE CREATED: ", data);
      }, (error) => {
        this.globalService.alert("Error", "Unable to execute sql", error);
      });*/
      // create push data table
      this.db.executeSql("CREATE TABLE IF NOT EXISTS push (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT, created_at VARCHAR(32))", {}).then((data) => {
        // this.globalService.modal(JSON.stringify(data),"TABLE CREATED: ").present();
      }, (error) => {
        this.globalService.alert("Error", "Unable to execute sql", error).present();
      });
    }, (error) => {
      this.globalService.alert("Unable to open database", error).present();
    });
  }

  insert(table:string, fields:any = [], values:any = []):any {
    var valuePlaceholder = "";
    // console.log(vsprintf("The first 4 letters of the english alphabet are: %s, %s, %s and %s", ["a", "b", "c", "d"]));
    this.sql = vsprintf("INSERT INTO %s(%s) ", [table, fields.join(',')]);
    values.forEach((value:any)=> {
      valuePlaceholder += "?,";
    });
    valuePlaceholder = valuePlaceholder.slice(0, -1);
    this.sql += vsprintf(" VALUES(%s);", [valuePlaceholder]);

    return this.db.executeSql(this.sql, values).then((data) => {
      // this.globalService.modal(JSON.stringify(data), "INSERTED").present();
      return data;
    }, (error) => {
      this.globalService.alert("Error", JSON.stringify(error.err)).present();
    });
  }

  /*
   * @params conditions [field=>value]
   * */
  query(sql:string):any {
    this.sql = sql;
    return this.db.executeSql(this.sql, []).then((resData) => {
      this.data = [];
      if (resData.rows.length > 0) {
        return resData;
        /*for(var i = 0; i < data.rows.length; i++) {
         this.data.push({firstname: data.rows.item(i).firstname, lastname: data.rows.item(i).lastname});
         }*/
      }
    }, (error) => {
      // this.globalService.alert("Error", "Unable to read data.").present();
    });
  }

}
