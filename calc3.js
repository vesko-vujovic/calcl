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
   var koef 		= calculateKoef(kamata);
   var x        = calculateX(koef, otplata);
   var anuitet  = calculateAnuitet(iznos, x, koef);
   var total    = calculateTotal(anuitet, otplata);
   $('.results').empty();
   displayResults(anuitet, total);
   
   //displayResults( total);
};

function calculateKoef(kamata) {
	var koef  = kamata / 1200;
	return koef;
};

function calculateX(koef, otplata) {
	var x = (1 + koef)
  var y = Math.pow(x, otplata);
	return y
};


function calculateAnuitet(iznos, x, koef) {

  var anuitet  = (iznos * x / (x - 1) * koef * 100) / 100; 
	return parseFloat(anuitet.toFixed(2));
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
