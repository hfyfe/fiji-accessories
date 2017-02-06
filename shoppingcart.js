function ShoppingCart () {
  this.basket = new Array() ;
} ;

ShoppingCart.prototype.getBasket = function() {
  return this.basket ;
} ;

ShoppingCart.prototype.addItem = function( product , quantity ) {
var newItem = { product: product , quantity: quantity } ;
  this.basket.push( newItem ) ;
} ;

ShoppingCart.prototype.updateItemQuantity = function ( itemID , quantity ) {

  if ( quantity == 0 ) {
    this.removeItem ( itemID ) ;
    return ;
  } ;

  this.basket[itemID].quantity = quantity ;
} ;

ShoppingCart.prototype.removeItem = function ( itemID ) {
  this.basket.splice( itemID , 1 ) ;
} ;

ShoppingCart.prototype.subtotal = function() {
  var total = 0 ;

  for ( var i = 0 ; i < this.basket.length ; i++ ) {
    total += this.basket[i].product.price * this.basket[i].quantity ;
  } ;

  return total ;
} ;

ShoppingCart.prototype.itemCount = function() {
  var total = 0 ;

  for ( var i = 0 ; i < this.basket.length ; i++ ) {
    total += this.basket[i].quantity ;
  }

  return total ;
} ;

ShoppingCart.prototype.isEmpty = function ( ) {
  return this.basket.length == 0 ;
} ;