$(document).ready(function(){

  var stripp = function(ting) {
    ting = ting.replace('$','');
    ting = ting.replace('.','');
    ting = ting.replace(' ','');
    return ting;
  };

  var centsToDollars= function(cents) {
    return "$" +(cents/100.00).toFixed(2);
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

  var masterList = [
    {name: 'Salmon', price: 6899},
    {name: 'Tuna', price: 5120},
    {name: 'Carp', price: 4001},
    {name: 'Pork', price: 5050},
    {name: 'Beef', price: 4020},
    {name: 'Chicken', price: 2511},
    {name: 'Cereal', price: 4503},
    {name: 'Milk', price: 2011},
    {name: 'Sugar', price: 1001}
  ];
  
// updates subtotals and total in html
  var refreshTotals = function(){
    $('#total-price').text(centsToDollars(totalPrice()));
    for (i in subtotal){
      $($('.cc-item .total-cost')[i]).text(centsToDollars(subtotal[i]));
    };
  };

  var hihi = function(){
    var i=0;
    var located = false;
    $('.dropdown-menu li').removeClass('disabled');
    while (i<$('.item-name').length){
      j=0;
      located = false;
      while (j<$('.dropdown-menu li').length){
        if ($.trim($($('.item-name')[i]).text())==$($('.dropdown-menu li a')[j]).text()){
          $($('.dropdown-menu li')[j]).addClass('disabled');
        }
        j++;
      }
      i++;
    }
  };
  hihi();

// removes parent rows from button clicks
  $(document).on('click','.cc-button',function() {
    $(this).parent().remove();
    refreshTotals();
    hihi();
  });

  $('.quantity').blur(function(){
    refreshTotals();
    hihi();
  });

  var itemRow =  function(item,price){
    return '<div id="'+item+'" class="row col-xs-12 cc-nomargin cc-item"><div class="item-name col-xs-2">'+item+'</div><div class="item-price col-xs-3">'+centsToDollars(price)+'</div><div class="item-qty col-xs-2"><input type="number" min="0" max="100" value="0" class="quantity col-xs-12"></div><div class="total-cost col-xs-3">$00.00</div><button class="cc-button col-xs-2">Remove</button></div>'
  };

  $('.dropdown-menu').on('click', 'a', function(){
    var i = 0;
    while (i < masterList.length) {
      if ($.trim($(this).text()) == masterList[i].name) {
        $('.cc-header').after(itemRow($.trim($(this).text()),masterList[i].price));
      }
      i++;
    }
  });
  

});


// console.log(treeFunct.hihi);
/*
$('#salmon.item-price');
$('#salmon').data("price")
$($('.quantity')[0]).val();
*/