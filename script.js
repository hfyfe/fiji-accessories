var baseURL = "http://sneakpeeq-sites.s3.amazonaws.com/" ;
var api = "interviews/ce/feeds/store.js" ;

$(document).ready( function() {

  var shoppingCart = new ShoppingCart();
  bindCartFunctions( shoppingCart ) ;

  bindHeaderScroll() ;

  getPageContent ( baseURL + api ) ;
});

function bindHeaderScroll ( ) {
  $(window).scroll( function() {

      var fromTopPx = $("#hero").height() - $(".header").height() ;
      var scrolledFromtop = $(window).scrollTop() ;
      if( scrolledFromtop > fromTopPx ) {
        $('.header').css( 'background-image' , $("#hero").css( 'background-image' ) ) ;
      } else {
        $('.header').css( 'background-image' , ''  ) ;
      } ;
  });
} ;