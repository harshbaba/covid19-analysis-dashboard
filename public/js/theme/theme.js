function showPageBg(){
  $('.page-bg').addClass('active');
}

function hidePageBg(){
  $('.page-bg').removeClass('active');
}

function showPageLoader(){
  $('.page-loader').addClass('active');
}

function hidePageLoader(){
  $('.page-loader').removeClass('active');
}

$(document).ready(function(){

  //header js
  
  $('.toggle-icon').click(function(event){
    var iconSelector = $(this);
    var dataToggle = iconSelector.attr('data-toggle');
    //check cureent item already open
    if(iconSelector.hasClass('active')){
      $('.'+dataToggle).removeClass('active');
      iconSelector.removeClass('active');
      $('body').removeClass('toggle-box-open');
    }
    else{
      //now we have to open that item
      //firstly we will check if any toggle already open, if any then we will close.
      isOpenOtherToggle();
      $('body').addClass('toggle-box-open');
      $('body').attr('data-toggle-info', dataToggle);
      $('.'+dataToggle).addClass('active');
      iconSelector.addClass('active');
    }

    event.preventDefault();
    event.stopPropagation();    
  });

  $(document).on({
    click: function(event){
      if(!($(event.target).hasClass('toggle-box')) && (!$(event.target).parents().hasClass('toggle-box'))){
        isOpenOtherToggle();
      }
    },
    keydown: function(event){
      var keyCode = event.keyCode || event.which;

        if((keyCode == 9)){

          if(event.shiftKey){
            var backwordjumpbyid = $(event.target).attr('backwordjumpbyid');
            if(backwordjumpbyid){
              $('#'+backwordjumpbyid).focus();
              return false;
            }
          }
          else{
            var forwordJumpId = $(event.target).attr('forwordjumpbyid');
            if(forwordJumpId){
              $('#'+forwordJumpId).focus();
              return false;
            }
          }
          
        }

        if(keyCode === 27){
          closePopupsOrSections();
        }
    }
  });

  function isOpenOtherToggle(){
    if($('body').hasClass('toggle-box-open')){
      var toggleBoxClass = $('body').attr('data-toggle-info');
      $('.'+toggleBoxClass).removeClass('active');
      $('.toggle-icon[data-toggle="'+toggleBoxClass+'"]').removeClass('active');
    }
    
  }

  function jumptabById(jumpId){
    $('#'+jumpId).focus();
  }

  function closePopupsOrSections(){
    hidePageBg();
    hideCustomModel();
    jumptabById('contact-us-btn-link');
  }

  

  function showCustomModel(){
    $('.custom-model').addClass('active');
  }

  function hideCustomModel(){
    $('.custom-model').removeClass('active');
  }

  $('.contact-us-link').click(function(){
    showPageBg();
    showCustomModel();
    jumptabById('contactnameinput');
  });

  $('.close-contact-form').click(function(){
    hideCustomModel();
    hidePageBg();
    jumptabById('contact-us-btn-link');
  });

});