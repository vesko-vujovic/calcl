/**
 * Main script for calculator app
 * App - Komforno krediti
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
  submitHandler: function(form, event) {
    event.preventDefault();
    $('.results').empty();
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
   var r 		  = calculateR(kamata);
   // R is param from function above, we need this to calculate c variable
   var c  		= calculateC(r);
   var total  = calculateTotal(iznos, otplata, c);
   var kamata = calculateKamata(total, iznos);
   displayResults(total, kamata);
};

function calculateR(r) {
	var r = 1+(r / 100);
	return r;
};

function calculateC(r) {
	var x = 1 / 12;
	var y = Math.pow(r, x);
	return y
};


function calculateTotal(iznos, otplata, c) {
	var x        = Math.pow(c, otplata);
  var total    = iznos * x;
  return total;
}

function calculateKamata(total, iznos) {
  var kamata = total - iznos;
  return kamata;
}

function displayResults(kamata, total) {
	$('.results').append('<p> Ukupno:' + parseFloat(kamata.toFixed(2)) +'€' + '</p>');
	$('.results').append('<p> Vaša kamata iznosi:' + parseFloat(total.toFixed(2)) + '€' + '</p>');
}

});
