$(document).ready(function(){
  $('#loading').hide();

  // Initialize Parse with your Parse application & javascript keys
  Parse.initialize("f9zCB2b5yON9UXnowr3n5cw6sMk3pc8WUBXM6GnG", "dsqsZGdh3dcauVqwvFqGavxEFwlUEi7NOZGqdp6A");
  // Setup the form to watch for the submit event
  $('#partners').submit(function(e){
    e.preventDefault();

    $('#form-button').hide();
    // $('#loading').removeClass('hidden');
    $('#loading').show();

    // Grab the elements from the form to make up
    // an object containing name, email and message
    var data = {
      firstname: document.getElementById('firstname').value,
      lastname: document.getElementById('lastname').value,
      city: document.getElementById('city').value,
      phone: document.getElementById('phone').value,
      zipcode: document.getElementById('zip').value,
      email: document.getElementById('email').value
    };

    // Run our Parse Cloud Code and
    // pass our 'data' object to it
    Parse.Cloud.run("partners", data, {
      success: function(object) {
        document.location.href = 'partner_thanks.html';
      },
      error: function(object, error) {
        $('#form-button').show();
        $('#loading').hide();
        console.log(error);
        $('#response').html('Error! We couldn\'t add your invite request!').addClass('error').fadeIn('fast');
      }
    });
  });

});