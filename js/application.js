$(document).ready(function(){

  var stripp = function(ting) {
    ting = ting.replace('$','');
    ting = ting.replace('.','');
    ting = ting.replace(' ','');
    return ting;
  };

  var centsToDollars= function(cents) {
    return "$" +(cents/100.00)+".00";
  };

  var subtotal = [];

  var totalPrice = function() {
    var i = 0;
    total = 0;
    while (i < $('.item-price').length) {
      // console.log($(itemPriceHTML[i]).text());
      subtotal[i] = stripp($($('.item-price')[i]).text()) * Number($($('.quantity')[i]).val())
      total += stripp($($('.item-price')[i]).text()) * Number($($('.quantity')[i]).val());
      i++;
    }
    return total;
  };

  var hihi = function(){
    $('#total-price').text(centsToDollars(totalPrice()));
    for (i in subtotal){
      $($('.cc-item .total-cost')[i]).text(centsToDollars(subtotal[i]));
    };
  };

  $('.cc-button').click(function() {
    $(this).parent().remove();
    hihi();
  });

  $('.quantity').blur(function(){
    hihi();
  });

});


// console.log(treeFunct.hihi);
/*
$('#salmon.item-price');
$('#salmon').data("price")
$($('.quantity')[0]).val();
*/