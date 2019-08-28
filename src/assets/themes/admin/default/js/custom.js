
function notifier(options){

     $.notify({
        title: options.title,
        message: options.message,
        icon: options.icon 
      },{
        type: options.type
      });

}

function getStarted(slides) {
  const driver = new Driver({
    animate: false,
    //stageBackground: '#32CD32',
  });
  var finalSlides = [];
  Object.keys(slides).forEach(k => {
    var jsonSlides = {};
    jsonSlides.element = slides[k].element;
    jsonSlides.popover = {
      title: slides[k].title,
      description: slides[k].description,
      position: slides[k].position
    };
    finalSlides.push(jsonSlides);
  });
  // Define the steps for introduction
  driver.defineSteps(finalSlides);
  // Start the introduction
  driver.start();
}

