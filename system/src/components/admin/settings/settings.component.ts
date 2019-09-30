import { Component, OnInit, Input, Output, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SectionService } from './../../../../../system/src/services/admin/section.service';
import { ImageValidator } from './../../../../../system/src/validators/image.validators';
declare var notifier: any;
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
declare var swal: any;
declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class MagpieSettingsComponent implements OnInit {
  @Input()


  columns: any;
  isDeveloper: boolean = false;
  file_inputs: any[];
  settingsForm: FormGroup;
  settings_form_data: any;
  devs: any;
  navigationSubscription: any;


  constructor(public route: ActivatedRoute, public router: Router, public fb: FormBuilder, public http: HttpClient, public section_service: SectionService, public ref: ChangeDetectorRef) {
    this.settingsForm = this.fb.group({});
    this.section_service.getSettings('/admin/general-settings').subscribe(res => {
      var column_validation = {};

      Object(res).forEach(rowItem => {
        var validation_array = [];
        validation_array.push(Validators.required);
        if (rowItem.type == 'email')
          validation_array.push(Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'));
        if (rowItem.type == 'image') {
          validation_array.push(ImageValidator.imageExtensionValidator(["image/jpeg", "image/jpg", "image/png"]));
          validation_array.push(ImageValidator.imageSizeValidator(1));
        }
        column_validation[rowItem.slug] = ['', validation_array];

      });
      this.settingsForm = this.fb.group(column_validation);
    });
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        if (this.router.url == '/admin/settings')
          this.init();
      }
    });

  }

  ngOnInit() {
    if (localStorage.getItem("userDetails['roles_id']") == '1')
      this.isDeveloper = true;
    this.init();

  }

  onFileChangeEvent = (fileInput: any, field) => {
    var files = [];
    for (var index = 0; index < fileInput.target.files.length; index++) {

      files.push(fileInput.target.files[index]);
    }
    this.settings_form_data[field] = files;

    this.ref.detectChanges();
  }


  settingsUpdate = () => {

    this.section_service.updateSettings(this.settings_form_data, '/admin/general-settings').subscribe(res => {

      this.ngOnInit();
    });
    new notifier({ title: "Update! ", message: "Settings has been updated.", icon: 'fa fa-check', type: "success" });

  }


  init = () => {

    var th_service = this.section_service;
    var th_router = this.router;
    var settings_data = {};
    var developer_data = {};
    var th_files = [];

    this.section_service.getCurrentRolePermissionMenus('roles', localStorage.getItem("userDetails['roles_id']")).subscribe(res1 => {

      var current_route = this.router.url.split('/')[2].split("-").join(" ");
      current_route = current_route.toLowerCase().replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
      });


      var current_module = JSON.parse(res1[0].permissions).sections.filter(itm => itm.name == current_route);
      var menus_actions = [];
      current_module[0].actions.forEach(function (menuItem) {
        menus_actions.push(menuItem.label);
        menus_actions[menuItem['label']] = menuItem.perm == 'true' ? true : false;
      });

      if (menus_actions['Index']) {

        this.section_service.getSettings('/admin/general-settings').subscribe(res => {
          Object(res).forEach(rowItem => {

            var developers = [];

            // column_validation[rowItem.slug] = ['', Validators.required ];
            var row_slug = rowItem.slug;
            if (rowItem.type == 'image')
              th_files.push(rowItem.slug);

            if ((rowItem.type == 'hidden') && (rowItem.value != undefined)) {
              var devArray = JSON.parse(rowItem.value);
              devArray.selected_mails.forEach(dev => {
                developers.push(dev);
              });
              developer_data[row_slug] = developers;
            }
            settings_data[row_slug] = rowItem.value;
          });
          this.devs = developer_data;
          this.settings_form_data = settings_data;
          this.settings_form_data['file_fields'] = th_files;
          this.columns = res;

        });
      }
      else
        this.router.navigate(['/admin/dashboard']);

    });

  }

  onTagAdded = (field, event) => {
    if (event.value != undefined && event.value.length > 0) {
      this.devs[field].push(event.value);
      this.settings_form_data[field] = JSON.stringify({ "selected_mails": this.devs[field] });
    }
    else
      this.settings_form_data[field] = "";
  }

  onTagRemove = (field, event) => {
    var item;
    if (typeof (event) == "object") item = event.value;
    else item = event;

    var index = this.devs[field].indexOf(item);
    if (index > -1) this.devs[field].splice(index, 1);

    if (this.devs[field].length > 0)
      this.settings_form_data[field] = JSON.stringify({ "selected_mails": this.devs[field] });
    else
      this.settings_form_data[field] = "";
  }

}