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

		 //console.log(this.allMenus.sectionsModules);
		 //for(i=0;i<this.allMenus.menus.length;i++){
		  // console.log(this.allMenus.menus[i].url);
		// }

		 //his.allMenus.sectionsModules.find(function (obj) { return obj.id === 3; });



		  var permissions = {
			    "sections": [{
			        "name": "Users",
					"actions":  [{"name":"Users-Edit","perm":"true","label":"Edit"},{"name":"Users-Add","perm":"false","label":"Add"}]
			    },
			    {
			        "name": "Roles",
					"actions":  [{"name":"Roles-Edit","perm":"false","label":"Edit"},{"name":"Roles-Add","perm":"true","label":"Add"}]
			    }]
			}

        var str = "";
	    for(var i=0; i<permissions.sections.length; i++) {
	        str+="<div><h6>"+permissions.sections[i].name+"</h6>";
	        for(var j=0;j<permissions.sections[i].actions.length;j++){
	           var perm =  permissions.sections[i].actions[j].perm == 'true'?'checked':'';
	           str+="<div class='form-check col-md-3'><label class='form-check-label'><input  class='form-check-input role_permissions' type='checkbox' data-name='"+permissions.sections[i].actions[j].name+"' data-perm='"+permissions.sections[i].actions[j].perm+"' data-label='"+permissions.sections[i].actions[j].label+"' "+perm+"   >"+permissions.sections[i].actions[j].label+"</label></div>";
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
	    	 elements.forEach(element => {
	    	     if(element.checked)
	    	      permision_checked = true;
    	 		 
                  var current_section = element.dataset.name.split('-')[0];
                  if(i == 0)
                   temp_sections.push(current_section);
	    	      if((temp_sections.indexOf(current_section)  == -1 && i >0) || (i+1 == elements.length)){

	    	        if((i+1 == elements.length))
	    	          temp_actions.push({"name":element.dataset.name,"perm":element.checked.toString(),"label":element.dataset.label});

	    	        temp_perms.push({"name":temp_sections[j],"actions":temp_actions});
	    	        temp_actions  = [];
	    	        j++;
	    	        temp_sections.push(current_section);
	    	      }
	    	       temp_actions.push({"name":element.dataset.name,"perm":element.checked.toString(),"label":element.dataset.label});
             
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




