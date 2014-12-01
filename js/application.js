$(document).ready(function(){

  var stripp = function(ting) {
    ting = ting.replace('$','');
    ting = ting.replace('.','');
    ting = ting.replace(' ','');
    return ting;
  };

  var centsToDollars= function(cents) {
    if (cents > 0) {
      return "$" +(cents/100.00).toFixed(2);
    }
    else {
      return "$00.00";
    }
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

  var itemRow =  function(item,price){
    return '<div id="'+item+'" class="row col-xs-12 cc-nomargin cc-item"><div class="item-name col-xs-2">'+item+'</div><div class="item-price col-xs-3">'+centsToDollars(price)+'</div><div class="item-qty col-xs-2"><input type="number" min="0" max="100" value="0" class="quantity col-xs-12"></div><div class="total-cost col-xs-3">$00.00</div><button class="cc-button col-xs-2">Remove</button></div>'
  };

  var listRow = function(item){
    return '<li role="presentation"><a class="cc-menu-list" role="menuitem" tabindex="-1" href="#">'+item+'</a></li>'
  };

  var totalPrice = function() {
    var subtotal = [];
    var i = 0;
    total = 0;
    $('.cc-item').removeClass('cc-item-even');
    $('.quantity').removeClass('quantity-even');
    // $('.dropdown-menu')[i].remove();
    while (i < masterList.length) {
      j=0;
      while (j < $('.item-name').length){
        if ($.trim($($('.item-name')[i]).text()) === masterList[j].name){
          subtotal[i] = masterList[j].price * Number($($('.quantity')[i]).val());
          total += masterList[j].price * Number($($('.quantity')[i]).val());
          $($('.cc-item .item-price')[i]).text(centsToDollars(masterList[j].price));
          $($('.cc-item .total-cost')[i]).text(centsToDollars(subtotal[i]));
        }
        j++;
      }
      if (i%2==0){
        $($('.cc-item')[i]).addClass('cc-item-even');
        $($('.quantity')[i]).addClass('quantity-even');
      }
      // $('.dropdown-menu').append(listRow(masterList[i].name));
      i++;
    }
    $($('#total-price')).text(centsToDollars(total));
  };

// updates subtotals and total in html
  // var hihi = function(){
  //   var i=0;
  //   var located = false;
  //   $('.dropdown-menu li').removeClass('disabled');
  //   while (i<$('.item-name').length){
  //     j=0;
  //     located = false;
  //     while (j<$('.dropdown-menu li').length){
  //       if ($.trim($($('.item-name')[i]).text())==$($('.dropdown-menu li a')[j]).text()){
  //         $($('.dropdown-menu li')[j]).addClass('disabled');
  //       }
  //       j++;
  //     }
  //     i++;
  //   }
  // };
  // hihi();
  totalPrice();

  $('.dropdown-menu').on('click', 'a', function(){
    var i = 0;
    while (i < masterList.length) {
      if ($.trim($(this).text()) == masterList[i].name) {
        $('.cc-header').after(itemRow($.trim($(this).text()),masterList[i].price));
      }
      i++;
      // hihi();
      totalPrice();
    }
  });

// removes parent rows from button clicks
  $(document).on('click','.cc-button',function() {
    $(this).parent().remove();
    // hihi();
    totalPrice();
  });

  $(document).on('blur','.quantity',function(){
    // hihi();
    totalPrice();
  });

  
});


// console.log(treeFunct.hihi);
/*
$('#salmon.item-price');
$('#salmon').data("price")
$($('.quantity')[0]).val();
*/