$(document).ready(
    function() {
	$('.dresser li div').hide();
	$('.dresser h3').click(
	    function() {
		var drawer = $(this).parent('li');
		if ($(drawer).hasClass('open')) { // close drawer
		    $(drawer).removeClass('open');
		    $(drawer).find('div').hide();
		}
		else { // open drawer
		    $(drawer).addClass('open');		    
		    $(drawer).find('div').show();
		}		
	    }
	);	
    }
);
