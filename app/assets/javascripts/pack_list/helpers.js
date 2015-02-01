var J = J || {};
J.list = J.list || {};


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