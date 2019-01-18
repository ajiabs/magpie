
function notifier(options){

     $.notify({
        title: options.title,
        message: options.message,
        icon: options.icon 
      },{
        type: options.type
      });

}
