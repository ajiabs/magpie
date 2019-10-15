import { FormControl } from '@angular/forms';

export class ImageValidator {
  static imageSizeValidator(maxSize: number) {
    return function (input: FormControl) {

      if (typeof input.value === 'object' && input.value[0]) {
        var flag_type = true;

       
        Object.keys(input.value).forEach(key=>{
           if(input.value[key].size/1024/1024 >maxSize )
             {  
                flag_type = false;

                return {maxSize: true};
             }
        });
        return flag_type ? null : {maxSize: true};

        
      }
      return null;


     
    };
  }

  static imageExtensionValidator(whiteListImageExtension: Array<string>) {
    return function(input: FormControl) {
    
      if (typeof input.value === 'object' && input.value[0]) {
        var flag_type = true;
        Object.keys(input.value).forEach(key=>{
           if(!whiteListImageExtension.includes(input.value[key].type) )
             {  flag_type  = false;
                return {extension: true};
             }
        });

        return flag_type ? null : {extension: true};
      }
      return null;
    };
  }
}