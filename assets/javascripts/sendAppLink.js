$(document).ready(function(){
  $('#loading').hide();

  // Initialize Parse with your Parse application & javascript keys
  Parse.initialize("f9zCB2b5yON9UXnowr3n5cw6sMk3pc8WUBXM6GnG", "dsqsZGdh3dcauVqwvFqGavxEFwlUEi7NOZGqdp6A");
  // Setup the form to watch for the submit event
  $('#register').submit(function(e){
    e.preventDefault();
    $('#response').html('').removeClass('error').removeClass('success');
    // Grab the elements from the form to make up
    // an object containing name, email and message
    var phone = document.getElementById('phone').value || '';

    phone = phone.replace(/[^0-9]/g, '').substr(-10);

    if (!phone || phone.length < 10){
      $('#response').html('You have to enter a valid US cell phone number!').addClass('error').fadeIn('fast');
      return;
    }

    phone = '+1' + phone;

    $('#form-button').hide();
    // $('#loading').removeClass('hidden');
    $('#loading').show();

    // Run our Parse Cloud Code
    Parse.Cloud.run("linkByMessage", {phone: phone}, {
      success: function(object) {
        $('#response').html('We just sent you a SMS!').addClass('success').fadeIn('fast');
        $('#loading').hide();
      },
      error: function(error) {
        var jsonError = JSON.parse(error.message);
        $('#form-button').show();
        $('#loading').hide();
        console.log(jsonError);
        $('#response').html(jsonError.description).addClass('error').fadeIn('fast');
      }
    });
  });

});