var baseURL = "http://sneakpeeq-sites.s3.amazonaws.com/" ;
var mobilePageSize = 450 ;

function getPageContent ( url ) {

  $.ajax({
    url: url
  })
  .done( function(response) {
    renderPageInformation( $.parseJSON(response) );
  })
  .fail(function() {
    console.log("error");
  })
} ;

function renderPageInformation( response ) {
  updatePageData( response ) ;
  renderHeroImage( response ) ;
  renderProducts( response ) ;
} ;

function updatePageData ( response ) {
  $("#pageSummary").text( response.extraInfo ) ;
  $(document).prop("title", response.pageTitle ) ;
  //FINISH
} ;

function renderHeroImage ( response ) {
  var url = baseURL;

  if( $(window).width() <= mobilePageSize ) {
    url += response.bannerImageMobile.ref ;
  } else {
    url += response.bannerImage.ref ;
  } ;
  $("#hero").css( 'background-image' , 'url(' + url  + ')' ) ;
}

function renderProducts ( response ) {
  for ( var i = 0 ; i < response.products.length ; i++ ) {
    renderProduct( response.products[i] ) ;
  } ;
} ;

function renderProduct ( productObject ) {
  renderNewProduct( ) ;
  renderImage ( productObject ) ;
  renderDescription (  productObject ) ;
} ;

function renderNewProduct ( ) {
  var $currentProduct = $("#productGrid").children().first().clone() ;
  $currentProduct.attr('class',"productTile") ;
  $("#productGrid").append( $currentProduct ) ;
  console.log ( $("#productGrid").children().length ) ;
} ;

function renderImage ( productObject ) {
  $("#productGrid").children().last().find("img").attr('src', parseProductURLString( productObject.mainImage.ref ) ) ;
} ;

function parseProductURLString ( string ) {
  return "https://" + string.substring( 2 , string.length ) ;
} ;

function renderDescription ( productObject ) {
  var $current = $("#productGrid").children().last() ;
  $current.find('.productName').text( productObject.name ) ;
  $current.find('.productPrice').text( "$" + (productObject.defaultPriceInCents / 100.00).toFixed(2) );
} ;