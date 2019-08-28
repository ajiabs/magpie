import { Directive, ElementRef, Renderer,Input,HostListener,Component, forwardRef,Output,EventEmitter, Renderer2 } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionService } from './../../services/admin/section.service';
import { environment } from '../../../../src/environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
declare var $: any;
declare var loadImage: any;

@Directive({ 
  selector: '[image-canvas]',
  })


export class ImageCanvasDirective{

    @Input() imageId;
    constructor(private elRef: ElementRef,private renderer: Renderer2,private route: ActivatedRoute, private router: Router,private service:SectionService) { 
    }
    ngAfterContentInit(): void {
      
      var options = {
        maxWidth: 250,
        maxHeight: 200,
        canvas: true,
        pixelRatio: window.devicePixelRatio,
        downsamplingRatio: 0.5,
        orientation: true
      }     
      var image_Id = this.imageId;
      this.service.getImage(image_Id,this.router.url).subscribe(result => {

        var image_Url= environment.upload_url+'uploads/'+result[0].files_name;       
        
        var th = this;
        loadImage(
          image_Url,
            function (img, data) {
                if(img.type === "error") {
                    console.error("Error loading image " + image_Url);
                } else {
                    // this.elRef.nativeElement.appendChild(img);
                    th.renderer.appendChild(th.elRef.nativeElement, img);
                }
            },
            options
        );
      });            
    }
}




