var J = J || {};

J.list = {};

J.list.toggleListItem = function(){

  $('.pack-list').on('click', '.pack-list__checkbox', function(e){
      $(this).parent().toggleClass('is-checked');
  });
}

J.list.editListItem = function(){

  //open edit mode
  $('.pack-list').on('click', '.pack-list__edit', function(e){
    $(this).parent().addClass('is-editing');
    var labelVal = $(this).siblings('.pack-list__label').html();
    $(this).siblings('.pack-list__input').val(labelVal);
    $(this).siblings('.pack-list__input').focus().select();

  });

  //close edit mode
  $(document).on('click', function(e){
    if ( $('.is-editing').length &&
        !$(e.target).closest('.is-editing').length) 
         //is-editing is taking place && click is not on the is-editing div 
    { 
      var textVal = $('.is-editing .pack-list__input').val();
      $('.is-editing .pack-list__label').html(textVal);
      $('.is-editing').removeClass('is-editing');
    }
  })

}

J.list.init = function(){
  this.toggleListItem();
  this.editListItem();
}

$(document).ready(function(){
  J.list.init(); 
})