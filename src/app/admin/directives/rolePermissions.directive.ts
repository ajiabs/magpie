import { Directive, ElementRef, Renderer,Input,HostListener,Component, forwardRef,Output,EventEmitter } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Directive({ 
  selector: '[role-permissions]',
   host: {
        '(input)': 'onPress($event)'
    }
 })


export class RolePermissionsDirective{

	    @Input() formColumn;
	    @Input() customData;
	    @Input() customValidate;
	    @Input() allMenus;

	 

	   
	    constructor(private elRef: ElementRef,renderer: Renderer,private route: ActivatedRoute, private router: Router) { 

	    }
		 ngAfterContentInit(): void {

		
		  var menus = this.allMenus;
		  var section = [];
        
		 
		  for(var i=0;i<menus.length;i++){

		
			
			if(menus[i].status != 'inactive'){
					var menu_actions = JSON.parse(menus[i].actions).selected_values;
					var tmp_actions = [];
					

					if(this.customData != undefined && this.customData != '' ){
						var item = JSON.parse(this.customData).sections;
						var filtered_menu = item.filter(itm => itm.name == menus[i].name);	
					
					}
					
					
					
					for(var j =0;j< menu_actions.length;j++){
						
						var menu_perm_name = menus[i].name.split(' ').join('-')+'-'+menu_actions[j];
						var menu_perm = "false";
						if(this.customData != undefined && this.customData != '' ){
							var item = JSON.parse(this.customData).sections;
							if(filtered_menu.length>0){
								var filtered_menu_actions = filtered_menu[0].actions.filter(itm => itm.name == menus[i].name.split(' ').join('-')+'-'+menu_actions[j]);
								if(filtered_menu_actions.length>0)
								menu_perm = filtered_menu_actions[0].perm;
							}
						}
					

						tmp_actions.push({"name":menu_perm_name,"perm":menu_perm,"label":menu_actions[j]});
						
					}
					
					section.push({"name":menus[i].name,"actions":tmp_actions});
				}
		}
		
		

		var permissions = {
			"sections": section
		}

        var str = "";
	    for(var i=0; i<permissions.sections.length; i++) {
	        str+="<div><h6>"+permissions.sections[i].name+"</h6>";
	        for(var j=0;j<permissions.sections[i].actions.length;j++){
	           var perm =  permissions.sections[i].actions[j].perm == 'true'?'checked':'';
	           str+="<div class='form-check col-md-3'><label class='form-check-label'><input  class='form-check-input role_permissions' type='checkbox' data-name='"+permissions.sections[i].actions[j].name.split(" ").join("-")+"' data-perm='"+permissions.sections[i].actions[j].perm+"' data-label='"+permissions.sections[i].actions[j].label+"' "+perm+"   >"+permissions.sections[i].actions[j].label+"</label></div>";
	        }
	       str+="</div>"; 
	    }
      

		 var required = this.formColumn.validations[0].required == 'true'?true:false;
		 this.elRef.nativeElement.innerHTML = '<label class="control-label">'+this.formColumn.label+'<span *ngIf="'+required+'" class="required_field">*</span></label>'+str;
		
	    }
    
	    @Output() customDataChange: EventEmitter<any> = new EventEmitter();
	    @Output() customValidateChange: EventEmitter<any> = new EventEmitter();
		onPress(event){
	    	 let elements = this.elRef.nativeElement.querySelectorAll('.role_permissions'); 
             let temp_sections = [];
             let temp_actions  = [];
             let temp_perms  = [];
             let i = 0;
             let j = 0;
			 let permision_checked = false;
			 let temp = false;
	    	 elements.forEach(element => {
	    	     if(element.checked)
				  permision_checked = true;
				  var element_dataset = element.dataset.name.split('-');
				  var current_section;
    	 		  if(element_dataset.length>2)
				   current_section = element_dataset[0]+' '+element_dataset[1];
				  else
				   current_section = element_dataset[0];
				  
				
                  if(i == 0)
				   temp_sections.push(current_section);
				   
				
				  if((temp_sections.indexOf(current_section)  == -1 && i >0)){
					if(j==0)
					 temp_perms.push({"name":temp_sections[j],"actions":temp_actions});
					
					temp_sections.push(current_section); 
					j =  temp_sections.indexOf(current_section); 
					temp_actions = [];
					temp = true;

					
				  }
				    temp_actions.push({"name":element.dataset.name,"perm":element.checked.toString(),"label":element.dataset.label});
				    if(temp){
					  temp_perms.push({"name":temp_sections[j],"actions":temp_actions});
					  temp = false;
					}
				  
	    	       i++;
 	
			 });

		
			
          //this.elRef.nativeElement.querySelector('#permissions').value
          if(permision_checked)
		    this.customDataChange.emit(JSON.stringify({"sections":temp_perms}));
		  else
		     this.customDataChange.emit("");
		  this.customValidateChange.emit(true);
		}
	   


}




