var J = J || {};

J.list = {};

J.list.toggleListItem = function(){
  $('.pack-list').on('click', '.pack-list__item', function(e){
    if ( !$(event.target).hasClass('pack-list__input') ){ //check its not the input
      $(this).toggleClass('checked');
    };
  });
}

J.list.editListItem = function(){

  $('.pack-list').on('click', '.pack-list__edit', function(e){
    $(this).parent().addClass('editing');
    var labelVal = $(this).siblings('.pack-list__label')
    $(this).siblings('.pack-list__input').val();
    e.stopPropagation();
  })
  
}

J.list.init = function(){
  this.toggleListItem();
  this.editListItem();
}

$(document).ready(function(){
  J.list.init(); 
})