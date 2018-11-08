import { Directive, ElementRef, Renderer,Input,HostListener,Component, forwardRef,Output,EventEmitter } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
declare var $: any;
declare var Chart: any;

@Directive({ 
  selector: '[chart]'
 })


export class ChartDirective{

	  
		
	    @Input() chartType;
		@Input() chartData;
	    constructor(private elRef: ElementRef,renderer: Renderer,private route: ActivatedRoute, private router: Router) { 

	    }
		ngAfterContentInit(): void {
                
				var th = this;
				setTimeout(function(){
					"use strict";
					const chart_data = th.chartData;
					const element = th.elRef.nativeElement.id;
					const current_chart = th.chartType;
					
					if(current_chart == "line")
					{
				
						var data = {
							labels: chart_data.labels,
							datasets: [
								{
									label: "My Second dataset",
									fillColor: "rgba(151,187,205,0.2)",
									strokeColor: "rgba(151,187,205,1)",
									pointColor: "rgba(151,187,205,1)",
									pointStrokeColor: "#fff",
									pointHighlightFill: "#fff",
									pointHighlightStroke: "rgba(151,187,205,1)",
									data: chart_data.data
								}
							]
						};
						var ctxl = $("#"+element).get(0).getContext("2d");
						var lineChart = new Chart(ctxl).Line(data);

					}else if(current_chart == "pie"){
						var pdata = chart_data;
					
						var ctxp = $("#"+element).get(0).getContext("2d");
						var pieChart = new Chart(ctxp).Pie(pdata);

					}
				
				},500);
			

	    }
      



}




