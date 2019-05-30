// Author By Shailesh 
$(document).ready(function () {
    //code to disallow first space entry
    $("input").on("keypress", function (e) {
        if (e.which === 32 && !this.value.length)
            e.preventDefault();
    });




 /* datepicker */
//    $( "#datepicker" ).datepicker({
//      showOn: "button",
//      buttonImage: "images/calender-icon.png",
//      buttonImageOnly: true
//  });

//    $( "#datepicker-to" ).datepicker({
//      showOn: "button",
//      buttonImage: "images/calender-icon.png",
//      buttonImageOnly: true
//  });

  //$('.select').each(function () {
  //    //var title = $(this).attr('title');
  //    var title = $(this).text();
  //    //alert(title);
  //    if ($('option:selected', this).val() != '') {
  //        title = $('option:selected', this).text();
  //    }
  //    else {
  //        title = $(this).children().first().text();
  //    }
  //    $(this).css({ 'z-index': 10, 'opacity': 0, '-khtml-appearance': 'none' }).after('<span class="select ddtext">' + title + '</span>').change(function () {
  //        val = $('option:selected', this).text();
  //        $(this).next().text(val);
  //    })
  //});

 

//  $("#menu-nav-tab").html($(".menu-nav").html());
//  $("#nav-trigger span").click(function () {
//      if ($("#menu-nav-tab ul").hasClass("expanded")) {
//          $("#menu-nav-tab ul.expanded").removeClass("expanded").slideUp(250);
//          $(this).removeClass("open");
//      } else {
//          $("#menu-nav-tab ul").addClass("expanded").slideDown(250);
//          $(this).addClass("open");
//      }
  // });

});