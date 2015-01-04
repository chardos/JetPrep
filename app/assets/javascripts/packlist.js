var J = J || {};

J.list = {};

J.list.toggleListItem = function(){

  $('.pack-list').on('click', '.pack-list__checkbox', function(e){
      $(this).parent().toggleClass('is-checked');
  });
}

J.list.closeEdit = function(){
  var textVal = $('.is-editing .pack-list__input').val();
  $('.is-editing .pack-list__label').html(textVal);
  $('.is-editing').removeClass('is-editing');
}

J.list.editListItemInit = function(){

  //open edit mode
  $('.pack-list').on('click', '.pack-list__edit', function(e){
    $(this).parent().addClass('is-editing');
    var labelVal = $(this).siblings('.pack-list__label').html();
    $(this).siblings('.pack-list__input').val(labelVal);
    $(this).siblings('.pack-list__input').focus().select();

  });

  //on document click, close edit
  $(document).on('click', function(e){
    if ( $('.is-editing').length && !$(e.target).closest('.is-editing').length) 
    //if: is-editing is taking place && click is not on the is-editing div 
    { 
      J.list.closeEdit();
    }
  });

  //on enter key, close edit
  $('.pack-list').on('keypress', '.pack-list__input', function(e){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      J.list.closeEdit();
    }
  });

}

J.list.init = function(){
  this.toggleListItem();
  this.editListItemInit();
}

$(document).ready(function(){
  J.list.init(); 
})