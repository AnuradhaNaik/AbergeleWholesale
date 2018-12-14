
var gt = 0; //gt=grand total
var cn=0; //cn = cart notifications
$(document).ready(function (argument) {

	$('.item-confirm').click(function (argument) {
		var conf = $(this);
		var qty = conf.prev();
		var cup = qty.prev();
		var size = cup.prev();
		var productname = conf.parent().parent().parent().prev().prev().prev();
		var price = conf.parent().parent().parent().prev().prev().prev().prev();
		price = price.html();
		price = parseInt(price);
		var qty_int = parseInt(qty.val());
		var subtotal = qty_int * price;

		if (qty.val() == '') alert('Enter quantity before confirming');
		else {
			var all = '';
			if(size.hasClass('all-product-size')){
                var allsizes=(size.parent().parent().children().length)-1;
                subtotal = subtotal * allsizes;
                all ="All "+allsizes+" sizes";

			}
			 if (cup.val() == 'All') {
				
				var allcups = $(cup).children().length - 1;
				subtotal = subtotal * allcups;
				all = all+" & "+allcups + ' variations';
			}

			var append = '<tr>' + '<td>' + productname.html() + ' ' + size.html() + ' ' + cup.val() + ' ' + all + '</td>' + '<td>' + qty.val() + '</td>' + '<td class="currency">' + price + '</td>' + '<td  class="subtotal currency">' + subtotal + '</td>' + ' <td class="cart-delete"><span onclick="deleteitem(this)">-</span></td> ' + '</tr>';
            cn=cn+1;
            $('.cart-notifications').html(cn);
            $('.cart-notifications').addClass('show');
			$('#ordered-items').append(append);
			gt = subtotal + gt;
            
			// <td>$34</td>
			// <td>$500</td>


			qty.val('');
		}
	});


	$('.item-desc-placeholder').click(function (argument) {
		var p = $(this);
		p = p.parents('.item-desc-group')
		p.toggleClass('open');
	});

	$('#cart').click(function (argument) {
		var p = $(this);
		$('#grand-total').html(gt);
		$('#cart-overview').toggleClass('open');

		p.toggleClass('open');

	});


});


function deleteitem(argument) {

	var p = $(argument);
	var subtotal = p.parent().parent().find('.subtotal').html();
	gt = gt - subtotal;

	console.log(subtotal);
	if (gt < 0) gt = 0;
	$('#grand-total').html(gt);
	p.parent().parent().remove();
	// body...
}