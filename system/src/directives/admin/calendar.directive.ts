import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;
declare var fullCalendar: any;
@Directive({
  selector: '[calendar]'
})
export class CalendarDirective {

  @Input() header;
  @Input() editable;
  @Input() droppable;
  @Output() customEventChange: EventEmitter<any> = new EventEmitter();

  constructor(private elRef: ElementRef) { }

  ngAfterContentInit(): void {

 
      "use strict";
      const header = this.header;
      const element = this.elRef.nativeElement.id;
      const editable = this.editable;
      const droppable = this.droppable;
      let id;
      let title;
      $('#calendar').fullCalendar({
        // header:header, 
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        editable: editable,
        droppable: droppable,
        drop: function () {
          if ($('#drop-remove').is(':checked')) {
            $(this).remove();
          }
        },
        eventClick: function (event) {
          title = event.title;
        }

      });

      console.log(this.customEventChange)
      if (this.customEventChange != undefined)
        this.customEventChange.emit(JSON.stringify({ "title": title }));

  
  }



}
