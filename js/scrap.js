//SCRAP
//TARGETING MEDIA QUERIES AND CSS PROPERTIES
           function myFunction(x, y, z) {
            if (x.matches && phase === phases.crustType) { // If media query & phase matches
                //document.body.style.backgroundColor = "yellow";
                doughSpan.style.marginLeft = "17em";
                return x;
                
            } else if (y.matches && phase === phases.crustType) {
                doughSpan.style.marginLeft = "13em";
                return y;
                       
            } else if (z.matches && phase === phases.crustType ) {
                doughSpan.style.marginLeft = "12em";
                return z;
                       
            } else {
                //document.body.style.backgroundColor = "pink";
                doughSpan.style.marginLeft = "0em";
            }
               return;
        }
        function noMargin(noMarginZone) {
            if (noMarginZone.matches && phase === phases.crustType) { // If media query & phase matches
                //document.body.style.backgroundColor = "yellow";
                doughSpan.style.marginLeft = "0em";  
            } 
        }
    var x = window.matchMedia("(min-width: 1200px)");
    var y = window.matchMedia("(min-width: 992px)");
    var z = window.matchMedia("(min-width: 768px)");
    var noMarginZone = window.matchMedia("(max-width: 767px)");
        
        myFunction(x, y, z) // Call listener function at run time
        noMargin(noMarginZone)
        x.addListener(myFunction); // Attach listener function on state changes
        y.addListener(myFunction);
        z.addListener(myFunction);
        noMarginZone.addListener(noMargin);


 x.addListener(function (e) {
        if (e.matches && phase === phases.crustType) {

            doughSpan.style.marginLeft = "17em";
            document.body.style.backgroundColor = 'red';
        }
        else {
            doughSpan.style.marginLeft = "0em";
            
        }

    });
    y.addListener(function (e) {
        if (e.matches && phase === phases.crustType) {

            doughSpan.style.marginLeft = "13em";
            document.body.style.backgroundColor = 'yellow';
        }
        else {
            doughSpan.style.marginLeft = "0em";
            
        }

    });
    z.addListener(function (e) {
        if (e.matches && phase === phases.crustType) {
            doughSpan.style.marginLeft = "12em";
            document.body.style.backgroundColor = 'green';
        }
        else {
            doughSpan.style.marginLeft = "0em";
            
        }

    });



// KIND OF WORKS but must resize window get the next size down/up and has complications with 0 margin.
/*
function largeScreen(x) {
        if (x.matches && phase === phases.crustType) { 
                
            doughSpan.style.marginLeft = "17em";
            document.body.style.backgroundColor = 'red';     
        } 
        else { 
                
            doughSpan.style.marginLeft = "0em";
            document.body.style.backgroundColor = 'none';
        } 
    }
    largeScreen(x);
    x.addListener(largeScreen);
    
    function mediumScreen(y) {
        if (y.matches && phase === phases.crustType) { 
                
            doughSpan.style.marginLeft = "16em";
            document.body.style.backgroundColor = 'yellow';
                
        }
         else { 
                
            doughSpan.style.marginLeft = "0em";
            document.body.style.backgroundColor = 'none';
        } 
    }
    mediumScreen(y);
    y.addListener(mediumScreen);
    
     function smallScreen (z) {
        if (z.matches && phase === phases.crustType) { 
                
            doughSpan.style.marginLeft = "15em";
            document.body.style.backgroundColor = 'green';
                
        } 
          else { 
                
            doughSpan.style.marginLeft = "0em";   
            document.body.style.backgroundColor = 'none';
        } 
    }
    
     smallScreen(z);
     z.addListener(smallScreen);
     */

   
    /*
    x.addListener(largeScreen);
    y.addListener(mediumScreen);
    z.addListener(smallScreen);
    */
    //noMarginZone.addListener(noMargin);

//sets class BUT in wrong phase.

function setPhase(newPhase/*, phase*/) {
    "use strict";
    phase = newPhase;
    //var doughSpan = $('doughSpan');
    //set class
    //doughSpan.classList.toggle("phaseCrustType", phase === phases.crustType);
    //set class
    updateDisplay();
}
