import { Directive, ElementRef, Renderer,Input,HostListener,Component, forwardRef,Output,EventEmitter } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
declare var $: any;
declare var datepicker: any;

@Directive({ 
  selector: '[date-picker]',
  host: {
	'(input)': 'onChange($event)'
	}
 })


export class DatepickerDirective{

	  
		@Input() dateFormat;
		@Input() formColumn;
		@Input() dateId;
		@Input() customData;
		@Input() dateValue;
	    constructor(private elRef: ElementRef,renderer: Renderer,private route: ActivatedRoute, private router: Router) { 

	    }
		ngAfterContentInit(): void {
           
				const element = this.dateId;
				const data_change = this.customDataChange;
				const data_value = this.dateValue != undefined?this.dateValue:'';
				var required = this.formColumn.validations[0].required == 'true'?true:false;
				this.elRef.nativeElement.innerHTML = '<input class="form-control" value="'+data_value+'"  id="data_'+element+'">';
				const date_format = this.dateFormat;
				setTimeout(function(){
					"use strict";
					$("#data_"+element).datepicker({
						format:date_format,
						autoclose: true,
						todayHighlight: true
					}).on("changeDate", function(e) {
						data_change.emit(this.value);
						
					});
				
				},300);
			

		}
		@Output() customDataChange: EventEmitter<any> = new EventEmitter();
		
		
		



}




