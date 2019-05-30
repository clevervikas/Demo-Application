
$(document).ready(function () {

    //function to change color of dropdown after focus
    $('select').focus(function () {
        $(this).next('span').css('border', '1px solid #ffc50c');
    });

    //function to change color of dropdown after focus gone
    $('select').blur(function () {
        $(this).next('span').css('border', '1px solid #cacbcd');
    });

  

});

function DropDownSpan() {
    $('.select').each(function () {
       
        //var title = $(this).attr('title');
        var title = $(this).text();
        //alert(title);
        if ($('option:selected', this).val() != '') {
            title = $('option:selected', this).text();
            
        }
        else {
            title = $(this).children().first().text();
        }
        $(this).css({ 'z-index': 10, 'opacity': 0, '-khtml-appearance': 'none' }).after('<span class="select ddtext"><span class="select_inner">' + title + '</span></span>').change(function () {
            
            val = $('option:selected', this).text();
            $(this).next().text(val);
        });        
    });
}
