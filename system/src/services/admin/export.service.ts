import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import  { environment } from './../../../../src/environments/environment';
import 'rxjs/add/observable/of';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


var server_url = environment.server_url;



@Injectable()
export class ExportService {

    constructor(private http: HttpClient) { }

    //orientation is either portrait or landscape

    export_pdf = (content, orientation = 'portrait', file_name) =>{

        var doc = new jsPDF({
            orientation: orientation,
        });      
        
        doc.autoTable(content);
        doc.save(file_name);
        return {success: true, msg: 'Exported successfully'};
    }
    
    export_csv = (rows, current_route, options) =>{
        new Angular5Csv(rows, current_route, options)
        return {success: true, msg: 'Exported successfully'};
    }

    export_xlsx = (json: any[], excelFileName: string) =>{
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        //  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        const data: Blob = new Blob([excelBuffer], {
            type: EXCEL_TYPE
          });
          FileSaver.saveAs(data, excelFileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);

  
            return {success: true, msg: 'Exported successfully'};
    }
 
}