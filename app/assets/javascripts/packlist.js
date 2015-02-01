var J = J || {};
J.list = J.list || {};

J.list.saveToDatabase = function(){
  //get all list items put in object
  var saveData = {};
  $('.pack-list__item').each(function(index){
    var label = $(this).find('.pack-list__label').html();
    var checked = $(this).hasClass('is-checked');
    saveData[index]={};
    saveData[index].label = label; 
    saveData[index].checked = checked; 
  });

  //If logged in: save data in DB
  if ( jQuery.cookie("signed_in") == 1 ){
    console.log('signed in')
    $.ajax({
      url: "pack_list/save_to_db", 
      type: "POST",
      data: { list: JSON.stringify( saveData ) },
      success: function(result){
        console.log(result);
      }
    });
  }
  //If not logged in: save data in COOKIE
  else if ( jQuery.cookie("signed_in") == 0 ){
    console.log('signed out')
    $.cookie("list", JSON.stringify( saveData ), { expires : 999 });
  }
}


J.list.retrieveFromDatabase = function(){
  
  var retrieved;
  function constructList(){
    for (var key in retrieved) {
      var obj = retrieved[key];
      console.log(obj);
      var $el = J.list.constructListItem( obj.label, obj.checked );
      $('.pack-list').append($el)
    }
  }

  //If logged in: retrieve data from DB
  if ( $.cookie("signed_in") == 1 ){
    $.ajax({
      url: "pack_list/retrieve_from_db", 
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
  else if ( $.cookie("signed_in") == 0 ){
    if ( $.cookie().list ){
      retrieved = JSON.parse($.cookie().list);
    }
    constructList();
  }
  //If just registered: retrieve data from COOKIES, then save to DB.
  else if ( $.cookie("signed_in") == 'Just registered'){
    if ( $.cookie().list ){
      retrieved = JSON.parse( $.cookie().list );
    }
    constructList();
    $.cookie("signed_in", 1);
    J.list.saveToDatabase();
    $.removeCookie("list");
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
  this.toggleListItem();
  this.editListItemInit();
  this.deleteListItemInit();
  this.addListItemInit();
  this.retrieveFromDatabase();
  this.sortableInit();

  
}

$(document).ready(function(){
  J.list.init(); 
})




