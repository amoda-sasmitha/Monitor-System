$(function() {
    "use strict";

    //****************************
    /* Top navbar Theme Change function Start */
    //****************************
    function handlenavbarbg() {
        if ( $('#main-wrapper').attr('data-navbarbg') == 'skin6' ) {
            // do this
            $(".topbar .navbar").addClass('navbar-dark');
            $(".topbar .navbar").removeClass('navbar-light');
        } else {
            // do that    
        }    
    };

    handlenavbarbg();
});