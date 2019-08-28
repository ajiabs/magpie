import { Directive, ElementRef, Renderer,Input,HostListener,Component, forwardRef,Output,EventEmitter } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
declare var $: any;

@Directive({ 
  selector: '[menu-toggle]',
   host: {
        '(input)': 'onPress($event)'
    }
 })


export class MenuToggleDirective{

	  
		@Input() isLast: boolean;
		
	   
	    constructor(private elRef: ElementRef,renderer: Renderer,private route: ActivatedRoute, private router: Router) { 

	    }
		ngAfterContentInit(): void {
			if (this.isLast){

					"use strict";
					var treeviewMenu = $('.app-menu');
					treeviewMenu.find("li:first").removeClass('is-expanded');
					// Toggle Sidebar
					$('[data-toggle="sidebar"]').click(function(event) {
						event.preventDefault();
						$('.app').toggleClass('sidenav-toggled');
					});
	
					// Activate sidebar treeview toggle
					$("[data-toggle='treeview']").click(function(event) {
						event.preventDefault();
						if(!$(this).parent().hasClass('is-expanded')) {
							treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
						}
						$(this).parent().toggleClass('is-expanded');

					
						
					});
					

						$(".sub_menus").click(function (event){
							if(window.innerWidth <=730)
							$('.app').toggleClass('sidenav-toggled');
						});

					
	
					// // Set initial active toggle
				    // $("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');
					// $('.app-menu').find("a.active").closest('.treeview').toggleClass('is-expanded');
                  
				}

			

	    }
      



}




