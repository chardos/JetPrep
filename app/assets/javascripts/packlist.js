var J = J || {};
J.list = J.list || {};
J.list.saveToDatabase = function(retrieved){
  //get all list items put in object
  var saveData = {};
  $('.pack-list__item').each(function(index){
    var label = $(this).find('.pack-list__label').html();
    var checked = $(this).hasClass('is-checked');
    saveData[index]={};
    saveData[index].label = label; 
    saveData[index].checked = checked; 
  });

  // if retrieved supplied
  if (arguments.length > 0){
    saveData = retrieved;
    $.removeCookie("list");
  }



  //If logged in: save data in DB
  if ( $.cookie("logged_in") == 1 ){
    console.log('signed in')
    $.ajax({
      url: "/pack_list/save_to_db", 
      type: "POST",
      data: { list: JSON.stringify( saveData ) },
      success: function(result){
        console.log(result);
      }
    });
  }
  //If not logged in: save data in COOKIE
  else if ( $.cookie("logged_in") == 0 ){
    console.log('signed out')
    $.cookie("list", JSON.stringify( saveData ), { expires : 999, path: '/' });
  }
}


J.list.retrieveFromDatabase = function(){
  var retrieved;
  function constructList(){
    $('.pack-list').empty();
    for (var key in retrieved) {
      console.log('yeap');
      var obj = retrieved[key];
      console.log(obj);
      var $el = J.list.constructListItem( obj.label, obj.checked );
      $('.pack-list').append($el);
    }
  }
  //If logged in: retrieve data from DB
  if ( $.cookie("logged_in") == 1 ){
    console.log('retrieving from DB');
    $.ajax({
      url: "/pack_list/retrieve_from_db", 
      type: "POST",
      success: function(result){
        if (result){
          retrieved = JSON.parse(result)
        }
        constructList();
      }
    });
  }
  //If not logged in: retrieve data from COOKIES
  else if ( $.cookie("logged_in") == 0 ){
    console.log('retrieving from cookies');
    if ( $.cookie('list') ){
      retrieved = JSON.parse($.cookie('list'));
    }
    constructList();
  }
  //If just registered: retrieve data from COOKIES, then save to DB.
  else if ( $.cookie("logged_in") == 'Just registered'){
    console.log('js: just registered');
    console.log($.cookie('list'));
    if ( $.cookie('list') ){
      retrieved = JSON.parse($.cookie('list'));
    }
    $.cookie("logged_in", 1);
    J.list.saveToDatabase(retrieved);
  }
  
}

J.list.sortableInit = function () {
  var list = $('.pack-list')[0];
  Sortable.create(list, {
    animation: 150,
    onUpdate: function (e){
      J.list.saveToDatabase();
    }
  }); 
}

J.list.init = function(){
  if ( $('#pack_list').length > 0 ){
    this.toggleListItemInit();
    this.editListItemInit();
    this.deleteListItemInit();
    this.addListItemInit();
    this.sortableInit();
  }
  this.retrieveFromDatabase();
  
}
$(document).on('ready', function () {

    J.list.init(); 
})




