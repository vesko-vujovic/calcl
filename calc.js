/**
 * Main script for calculator app
 */

$(document).ready(function() {

// Validation rules for this app 
$("#myForm").validate(
{
  rules: {
    kredit: {
    	required: true,
    	digits:   true
    },
    stopa: {
    	required: true,
    	number:   true  
    },
    otplata: {
    	required: true,
    	number:   true 
    }

  },
  messages: {
    kredit: {
    	required: "*Polje ne smije da bude prazno",
    	digits:   "*Molimo vas unesite cijeli broj"
    },
    stopa: {
    	required: "*Polje ne smije da bude prazno",
    	number:   "*Molimo vas unesite broj" 
    },
    otplata: {
    	required: "*Polje ne smije da bude prazno",
    	number:   "*Molimo vas unesite broj" 
    }
  },
  submitHandler: function(form) {
  	// Get value of iznos
  	var iznos   = $(form).find('.firstfield input').val();
  	// Get value of kamata 
  	var kamata  = $(form).find('.secondfield input').val();
  	// Get value of otplata
  	var otplata = $(form).find('.thirdfield input').val();
   	
  	// Call function that will calculate total sum
  	calculateAnnual(iznos, kamata, otplata);

  }


});


// Calculate annual amount
function calculateAnnual(iznos, kamata, otplata) {
   var r 		= calculateR(kamata);
   // R is param from function above, we need this to calculate c variable
   var c  		= calculateC(r);
   var r2 		= calculateR2(c);
   var anuitet  = calculateAnuitet(iznos, otplata, r2);
   var total    = calculateTotal(anuitet, otplata);

   displayResults(anuitet, total);
};

function calculateR(r) {
	var r = 1+(r / 100);
	return r;
};

function calculateC(r) {
	var x = 1 / 12;
	var y = Math.pow(r, x);
	y = (y-1) * 100;

	return y
};

function calculateR2(c) {
	var x = 1 + (c / 100);
	return x;
};

function calculateAnuitet(iznos, otplata, r2) {
	var x     = r2 - 1;
	var y     = Math.pow(r2, otplata);
	var total = iznos * (x * y) / (y - 1);
        total = parseFloat(total.toFixed(2));

	return total;
}

function calculateTotal(anuitet, otplata) {
	var total = anuitet * otplata;
	    total = parseFloat(total.toFixed(2));

	return total;
}

function displayResults(anuitet, total) {
	$('.results').append('<p> Vaša mjesecna rata iznosi:' + anuitet +'€' + '</p>');
	$('.results').append('<p> Ukupno:' + total + '€' + '</p>')
}



















});
