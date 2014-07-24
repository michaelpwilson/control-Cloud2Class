$(document).ready(function (){

$( ".lesson").draggable({
    revert: "invalid",
    // start: function(){
    // Make the original transparent to avoid re-flowing of the elements
    // This makes the illusion of dragging the original item
    //    $(this).css({opacity:1});
    // },
    // stop: function(){
    // Show original after dragging stops
    //    $(this).css({opacity:0});
    // }
});

$( ".empty_slot" ).droppable({
      accept: ".lesson",
      activeClass: "ui-state-hover",
      hoverClass: "ui-state-active",
      greedy: true,
      drop: function( event, ui ) {
      $(this).droppable( "option", "disabled", true );
       classid = $(this).data("classid");
        ui.draggable.draggable( "destroy" );
	 $( this )
         .addClass( "ui-state-highlight" )
           .html( "Dropped!" );
	var request = $.ajax({
	url: "lesson/start",
	type: "POST",
	data: {
         "lesson_id"   : ui.draggable.data("lessonid"),
	"class_id"   : classid,
	 "lesson_type" : ui.draggable.data("type"),
	}
        });
	request.done(function(err, msg) {
  	   alert(msg);
	});
      },
      out : function(event, ui) {
        $(this).droppable( "option", "disabled", false );
      },
      revert: function (event, ui) { 
	$(this).droppable( "option", "disabled", true );
	$(".lesson").css({opacity:0});
      }
});


$( ".touch" ).mouseover(function() {
$(this).popover('show');
});
$( ".touch" ).mouseout(function() {
$(this).popover('hide');
});
$( ".people" ).mouseover(function() {
$(this).popover('show');
});
$( ".people" ).mouseout(function() {
$(this).popover('hide');
});
$(".row").sortable({
      connectWith: "div[class^='col-sm-']",
      handle: ".panel-heading",
      placeholder: "portlet-placeholder ui-corner-all"
});
$( ".portlet" )
      .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
      .find( ".portlet-header" )
        .addClass( "ui-widget-header ui-corner-all" )
        .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
 
    $( ".portlet-toggle" ).click(function() {
      var icon = $( this );
      icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
      icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
    });

    var items = [
        "Online teaching and training environments",
        "Virtual training desktops",
        "For you and your whole class",
        "Access exercises and worksheets",
        "Upload and download files",
        "Manage Lessons",
        "Browser-Based...",
        "...Remote Desktop environments...",
        "...and Console Cloud ",
        "Online teaching and training environments",
        "Creating the Technologists<br>of the future",
        " ",
],
        $text = $( '#text-change p' );
        delay = 3;
        textLoop(delay);

function textLoop ( delay ) {
        $.each( items, function (i, elm ){
            $text.delay( delay*1E3).fadeOut();
            $text.queue(function(){
           if(i == 11){
                $("#text-change").addClass("touch");
		$(".c2c-jq").fadeOut();
           } else if(i == 0){
                $("#text-change").removeClass("touch");
           }
	   if(i == 10){ 
	   $(".c2c-jq").fadeIn();
	   $text.css("margin-top", "20px");
	   }
                $text.html( items[i] );
                $text.dequeue();
            });
            $text.fadeIn();
            $text.queue(function(){
                if ( i == items.length -1 ) {
                    textLoop(delay);
                }
                $text.dequeue();
            });
        });
}
panelFader();
function panelFader () {
        $(".img-clamp").fadeIn(500, function () {
        $(".img-clamp").delay(3000).fadeOut(500, function () {
$(".img-clamp").removeClass("people").addClass("touch").fadeIn(500, function () {
        $(".img-clamp").fadeOut(500, function () {
$(".img-clamp").addClass("people").removeClass("touch");
        });
        });
        });
           setTimeout(panelFader, 1000);
        });
    }

});


