(function($) {
  
  $.fn.validate = function(args) {

  	/* Load the default options. */
  	var options = $.extend({}, $.fn.validate.defaults, args);
    var jQ = jQuery;
    return this.each(function() {
      /***** Plugin Goes Here *********/
      jQ(this).submit(function(){
        jQ(this).find(".error").remove();
        var valid=true;
        
        jQ(this).find(".validate").each(function(){
          el = jQ(this);
          if(el.hasClass("valid-email")) {
            if(!valid_email(el.val())) {
              add_error(el, options.email_error_message);
              valid=false;
            }
          }
          if(el.hasClass("valid-date")) {
            if(!valid_date(el.val(), options.date_format)) {
              add_error(el, options.date_error_message);
              valid=false;
            }
          }
          if(el.hasClass("valid-required")) {
            if(!valid_required(el.val())) {
              add_error(el, options.required_error_message);
              valid=false;
            }
          }
          if(el.hasClass("valid-number")) {
            if(!valid_number(el.val())) {
              add_error(el, options.number_error_message);
              valid=false;
            }
          }
        });
        return valid;
      });
       
    });
  
  };
  
  function add_error(el, message) {
    el.after("<span class='error'>"+message+"</span>");
  }
  
  function valid_email(email) {
    var email_pattern  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(email.match(email_pattern)) return true;
    return false;
  };
  
  function valid_number(number) {
    var number_pattern = /^([0-9\s])+$/;
    if(number.match(number_pattern)) return true;
    return false;
  };
  
  function valid_required(val) {
    if(val.length>0) return true;
    return false;
  }
  
  function valid_date(date_passed, date_format) {
    if(date_format == "mm/dd/yyyy") var date_pattern  = /(0[1-9]|1[012])+\/(0[1-9]|[12][0-9]|3[01])+\/(19|20)\d\d/;
    if(date_format == "dd/mm/yyyy") var date_pattern  = /(0[1-9]|[12][0-9]|3[01])+\/(0[1-9]|1[012])+\/(19|20)\d\d/;
    if(date_passed.match(date_pattern)) return true;
    return false;
  };
  
  $.fn.validate.defaults = {
  	email_error_message: 'not a valid email address',
  	text_error_message: 'must be text only',
  	number_error_message: 'not a valid number',
  	date_error_message: 'not a valid date',
  	required_error_message: 'is a required field',
  	date_format: "dd/mm/yyyy"
  };
  
})(jQuery);

