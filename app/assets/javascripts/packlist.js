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
J.list.openEdit = function($el){
  $el.parent().addClass('is-editing');
  var labelVal = $el.siblings('.pack-list__label').html();
  $el.siblings('.pack-list__input').val(labelVal);
  $el.siblings('.pack-list__input').focus().select();
}
J.list.editListItemInit = function(){

  //open edit mode
  $('.pack-list').on('click', '.pack-list__edit', function(e){
    J.list.openEdit( $(this) );
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

J.list.addListItem = function(){
  $('.js-add-item').on('click', function(){
    var el = '<li class="pack-list__item"><div class="pack-list__checkbox"></div><input class="pack-list__input" type="text"><span class="pack-list__label"></span><span class="pack-list__edit glyphicon glyphicon-pencil" aria-hidden="true"></span><span class="pack-list__delete glyphicon glyphicon-trash" aria-hidden="true"></span></li>'
    $('.pack-list').append(el);
    setTimeout(function(){
      J.list.openEdit( $('.pack-list__item:last').find('.pack-list__edit') );
    },50)
  });
}

J.list.deleteListItem = function(){
  $('.pack-list').on('click', '.pack-list__delete', function(e){
      $(this).parent().remove();
  });
}

J.list.init = function(){
  this.toggleListItem();
  this.editListItemInit();
  this.deleteListItem();
  this.addListItem();
}

$(document).ready(function(){
  J.list.init(); 
})




