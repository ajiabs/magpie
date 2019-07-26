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
 
}