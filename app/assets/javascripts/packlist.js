var J = J || {};

J.list = {};

J.list.toggleListItem = function(){

  $('.pack-list').on('click', '.pack-list__checkbox', function(e){
      $(this).parent().toggleClass('is-checked');
      J.list.saveToCookies();
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
      J.list.saveToCookies();
    }
  });

  //on enter key, close edit
  $('.pack-list').on('keypress', '.pack-list__input', function(e){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      J.list.closeEdit();
      J.list.saveToCookies();
    }
  });
}

J.list.addListItemInit = function(){
  $('.js-add-item').on('click', function(){
    var el = '<li class="pack-list__item"><div class="pack-list__checkbox"></div><input class="pack-list__input" type="text"><span class="pack-list__label"></span><span class="pack-list__edit glyphicon glyphicon-pencil" aria-hidden="true"></span><span class="pack-list__delete glyphicon glyphicon-trash" aria-hidden="true"></span></li>'
    $('.pack-list').append(el);
    setTimeout(function(){
      J.list.openEdit( $('.pack-list__item:last').find('.pack-list__edit') );
    },50)
    J.list.saveToCookies();
  });
}

J.list.deleteListItemInit = function(){
  $('.pack-list').on('click', '.pack-list__delete', function(e){
      $(this).parent().remove();
      J.list.saveToCookies();
  });
}

J.list.saveToCookies = function(){
  //save the data
  var saveData = {};
  $('.pack-list__item').each(function(index){
    var label = $(this).find('.pack-list__label').html();
    var checked = $(this).hasClass('is-checked');
    saveData[index]={};
    saveData[index].label = label; 
    saveData[index].checked = checked; 
  });
  //set data in cookie
  $.cookie("list", JSON.stringify( saveData ), { expires : 999 });
}

J.list.constructListItem = function(label, checked){
  var $el = $('<li class="pack-list__item"></li>');
  $el.append('<div class="pack-list__checkbox"></div>');
  $el.append('<div class="pack-list__checkbox"></div>');
  $el.append('<input class="pack-list__input" type="text">');
  $el.append('<span class="pack-list__label">'+ label +'</span>');
  $el.append('<span class="pack-list__edit glyphicon glyphicon-pencil" aria-hidden="true"></span>');
  $el.append('<span class="pack-list__delete glyphicon glyphicon-trash" aria-hidden="true"></span>');
  if(checked){ $el.addClass('is-checked') };
  return $el;
}

J.list.retrieveFromCookies = function(){
  var retrieved = JSON.parse($.cookie().list);
  for (var key in retrieved) {
    var obj = retrieved[key];
    console.log(obj);
    var $el = this.constructListItem( obj.label, obj.checked );
    $('.pack-list').append($el)
    
  }
}

J.list.init = function(){
  this.toggleListItem();
  this.editListItemInit();
  this.deleteListItemInit();
  this.addListItemInit();
  this.retrieveFromCookies();
}

$(document).ready(function(){
  J.list.init(); 
})




