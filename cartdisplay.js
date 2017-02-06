var fadeOutTime = 600 ;

function bindCartFunctions ( shoppingCart ) {

  bindCartHeader ( shoppingCart ) ;
  bindAddToCart ( shoppingCart ) ;
  bindQuantityButtons ( shoppingCart ) ;

} ;

function bindCartHeader ( shoppingCart ) {
  $("#cartLink").on( "mouseover" , function( e ) {
    showCart( shoppingCart ) ;
  }) ;

  $("#cart").on( "mouseleave" , function( e ) {
    hideCart() ;
  }) ;
} ;

function showCart( shoppingCart ) {
  renderShoppingCart( shoppingCart ) ;
  $("#cart").show() ;
} ;

function hideCart() {
  $("#cart").hide() ;
} ;

function bindAddToCart ( shoppingCart ) {
  $("#productGrid").on("click","input", function() {
    $thisinput = $(this)
    var product = {
                    name: $(this).closest(".productTile").find(".productName").text() ,
                    price: parseFloat($(this).closest(".productTile").find(".productPrice").text().substring(1))
                  } ;

    shoppingCart.addItem( product, 1 ) ;
    $thisinput.addClass('buttonItemAdded');
    $thisinput.val('Item Added!');

    $thisinput.fadeOut( fadeOutTime , function() {
       $thisinput.attr("class","button").fadeIn();
       $thisinput.val("Add To Cart").fadeIn() ;
     });

    renderShoppingCart( shoppingCart ) ;
    updateCartHeaderQuantity ( shoppingCart.itemCount() ) ;
  }) ;
} ;

function bindQuantityButtons ( shoppingCart ) {
  $("#cart").on("focusout","select", function() {

    shoppingCart.updateItemQuantity( $(this).closest(".cartItem").attr("itemID") , parseInt($(this).val()) ) ;

    renderShoppingCart( shoppingCart ) ;
    updateCartHeaderQuantity ( shoppingCart.itemCount() ) ;
  }) ;
} ;

function updateCartHeaderQuantity (quantity) {
  $("#cartQuantity").text("Cart (" + quantity + ")") ;
} ;

function renderShoppingCart ( shoppingCart ) {
  if ( !shoppingCart.isEmpty() ) {
      resizeCart( shoppingCart ) ;
      renderItemsInCart( shoppingCart ) ;
      renderCartSummary( shoppingCart ) ;
  } else {
    renderEmptyCart () ;
  } ;
} ;

function renderEmptyCart () {
   $("#cartItems").css('visibility', 'hidden') ;
   $("#cartBottom").css('visibility', 'hidden') ;
} ;

function resizeCart ( shoppingCart ) {

  var headerHeight = $("#cartHeader").height() ;
  var itemsHeight = $(".cartItem").height() * shoppingCart.getBasket().length + 20 ;
  var summaryHeight = 2 * $("#cartBottom").height() ;
  var height = headerHeight + itemsHeight + summaryHeight ;

  $("#cart").height( height ) ;
  $("#cartItems").height( itemsHeight );
} ;

function renderItemsInCart ( shoppingCart ) {
  $("#cartItems").css({
     visibility: 'visible',
   });
  var $itemTemplate = $(".cartItem").first().clone() ;
  var $itemList = $("#cartItems") ;
  $itemList.empty() ;

  for ( var i = 0 ; i < shoppingCart.getBasket().length ; i++ ) {
    var $newNode = $itemTemplate.clone() ;
    $newNode.attr( 'class' , "cartItem" ) ;
    $newNode.attr( 'itemid' , i ) ;
    $newNode.find(".itemName").text( shoppingCart.getBasket()[i].product.name ) ;
    $newNode.find(".itemPrice").text( "$" + shoppingCart.getBasket()[i].product.price.toFixed(2)) ;
    $newNode.find(".itemQuantity").val( shoppingCart.getBasket()[i].quantity ) ;
    $itemList.append( $newNode) ;
  } ;
} ;

function renderCartSummary ( shoppingCart ) {
  $("#cartBottom").css({
     visibility: 'visible',
   }) ;
  $("#subtotal").text( "$" + shoppingCart.subtotal().toFixed(2) ) ;
} ;