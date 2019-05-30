var weekDaysJson = [];
weekDaysJson.push({ 'Name': 'Tuesday', 'Value': 1, 'bindValue': 2 });
weekDaysJson.push({ 'Name': 'Wednesday', 'Value': 2, 'bindValue': 3 });
weekDaysJson.push({ 'Name': 'Thursday', 'Value': 3, 'bindValue': 4 });
weekDaysJson.push({ 'Name': 'Friday', 'Value': 4, 'bindValue': 5 });
weekDaysJson.push({ 'Name': 'Saturday', 'Value': 5, 'bindValue': 6 });
weekDaysJson.push({ 'Name': 'Sunday', 'Value': 6, 'bindValue': 7 });
weekDaysJson.push({ 'Name': 'Monday', 'Value': 7, 'bindValue': 1 });
var validExtensions = ['jpg', 'jpeg', 'gif', 'png', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf'];
var DocumentvalidExtensions = ['jpg', 'jpeg', 'gif', 'png', 'doc', 'docx','pdf'];
var permissionModel = [];


$(document).ajaxStart(function (xhr, props) {
    CheckSession();
});


function ShowMessage(Cssclass, text) {

    noty({ text: text, layout: "topCenter", type: Cssclass });
    setTimeout(function () {
        $.noty.closeAll();
    }, 5000);
}
//var myVar = setInterval(CheckSession, 120000);

$(function () {
    $("#btnShowProfileInfo").click(function () {        
        if ($("#informer").hasClass('active')) {
            $("#informer").hide();
            $("#informer").removeClass('active');
        }
        else {
            $("#informer").show();
            $("#informer").addClass('active');
        }

    });

    $(".divClosable").hide();

    $("#closeAlert").click(function () {
        $("#result").hide();
    });

    $('.positiveOnly').keypress(function (e) {
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

    var pageHeight = window.innerHeight;
    $('.page-content').css("min-height", pageHeight + "px");

    $("select.selectpicker").attr('data-container', 'body');
    $("select.selectpicker").selectpicker();
    $("select.selectpicker").focus(function () {
        $(this).next(".bootstrap-select").find('.select').focus();
    });
    $('select.selectpicker').selectpicker().change(function () {
        try {
            $(this).valid()
        }
        catch (e) { }
    });

    //$(document).on("click", ".multiselect.dropdown-toggle.btn.btn-default", function (e) {
    //    var $parent = $(this).parent();
    //    if ($($parent).hasClass("open")) {
    //        if ($(this).parent().prev().attr('data-Sorting') == undefined) {
    //            var $ul = $($parent).find("ul");
    //            var $li = $($ul).find("li");
    //            if ($($li).eq("0").find("input[type='text']").length > 0) {
    //                $($ul).html($($li).eq("0"));
    //                $li.splice(0, 1);
    //            }
    //            if ($($li).eq("0").find("label").text().trim().toLowerCase() == "select all") {
    //                $($ul).append($($li).eq("0"));
    //                $li.splice(0, 1);
    //            }

    //            $.each($($li), function (ind, item) {
    //                if ($(item).find("input[type='checkbox']").is(":checked"))
    //                    $($ul).append($(item));
    //            })
    //            $.each($($li), function (ind, item) {
    //                if (!$(item).find("input[type='checkbox']").is(":checked"))
    //                    $($ul).append($(item));
    //            });
    //        }
    //    }
    //    $(this).parent().find(".multiselect-search").focus();
    //});

    $(document).on("click", ".divClosable .btnClosable", function (e) {
        $(this).closest(".divClosable").hide();
    });

    $(".filter-icon").click(function () {
        if ($(this).find('.fa-angle-up').length > 0) {
            $(this).find('.fa').removeClass("fa-angle-up").addClass("fa-angle-down");
            $(this).closest(".panel").find(".panel-body").hide();
        } else {
            $(this).find('.fa').removeClass("fa-angle-down").addClass("fa-angle-up");
            $(this).closest(".panel").find(".panel-body").show();
        }
    });

    

});

function showDivClosable(title, content) {
    if (content != undefined)
        $(".divClosable > .panel > .panel-body").html(content)
    $(".divClosable").find(".panel-title").html("<span class='fa fa-user divClosableTitleSpan'></span> " + title);
    $(".divClosable").slideDown("slow");
}

function bindDatePicker(selector, callBack) {
    $(selector).datepicker({
        dateFormat: 'dd/mm/yyyy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-100:+100',
        buttonImage: "../../Content/images/calender-icon.png",
        showOn: "both",
        buttonImageOnly: true,
        autoclose: true,
        buttonImageText: "Calendar",
        format: 'dd/mm/yyyy',
        todayHighlight: true
    }).on('changeDate', function (selected) {
        if (callBack != undefined) {
            callBack(this, selected);
        }
    });
}

function bindPositiveOnly(selector) {
    $(selector).keypress(function (e) {

        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
};


function bindPercentageOnly(selector) {
    $(selector).keypress(function (e) {

        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (e.which < 48 || e.which > 57)) {
            return false;
        }
        var parts = $(selector).val().split('.');        
        if (parts.length > 1)
        {            
            if (parts[1].length > 1)
                return false;
           
        }
        //else
        if (parseFloat($(selector).val()+e.key) > 100)
        {
            return false;
        }
        
    });
};

function bindMaxAndMinSelector(selector) {
    $(selector).keypress(function (e) {
        var c = String.fromCharCode(e.which);
        if (e.which >= 48 && e.which <= 57) {
            var maxValue = parseFloat($(this).attr('data-Max'));
            var minValue = parseFloat($(this).attr('data-Min'));
            var value = parseFloat($(this).val() + c);
            if (maxValue < value || minValue > value) {
                return false;
            }
        }
        else {
            return false;
        }

    });
};

function bindSelectpicker(selector) {
    $(selector).attr('data-container', 'body');
    $.each($(selector), function () {
        $(this).selectpicker();
        $(this).focus(function () {
            $(this).next(".bootstrap-select").find('.select').focus();
        });
    })
    $(selector).selectpicker().change(function () {
        try {
            $(this).valid()
        }
        catch (e) { }
    });
};

function bindIntgerOnly(selector) {

    $(selector).keydown(function (e) {

        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            if (e.keyCode != 110) {
                return;
            }

        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
};

function getCurrentDateDDMMYYY() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

function removeSpan(id) {
    //var pagingSpan = $(id+'_paginate').find('span:last').html();   
    //if (pagingSpan.indexOf("…") > -1) {
    //    $(id + '_paginate').find('span:last').css("display","none");   //;
    //}

    $(id + '_paginate').find('span').each(function () {
        var pagingSpan = $(this).html()
        if (pagingSpan == "…") {
            $(this).css("display", "none");   //;
        }
    });
}

function blockUiById(id) {
    //$('#' + id).block({
    //    message: '<img style="width:70px;" src="/Content/assets/img/loaders/loading.gif"/>',
    //    css: { 'z-index': '1011', position: 'fixed', padding: '0px', margin: '0px', width: '10%', top: '45%', left: '45%', 'text-align': 'center', color: 'rgb(0, 0, 0)', border: 'none', cursor: 'wait', 'background-color': 'transparent' }
    //});
    pageLoadingFrame("show");
}

function unBlockUiById(id) {
    //$('#' + id).unblock();
    pageLoadingFrame("hide");
}

function pageLoaderFrame() {
    //$.blockUI({ message: '<img style="width:60px" src="/Content/assets/img/loaders/loading.gif"/>', css: { 'z-index': '1011', position: 'fixed', padding: '0px', margin: '0px', width: '10%', top: '50%', left: '50%', 'text-align': 'center', color: 'rgb(0, 0, 0)', border: 'none', cursor: 'wait', 'background-color': 'transparent' } });
    // $.blockUI({ message: '<img src="/Content/assets/img/loaders/default1.gif"/>'});
    pageLoadingFrame("show");
}

function hideLoaderFrame() {
    //$.unblockUI();
    pageLoadingFrame("hide");
}

(function ($) {
    jQuery.fn.extend({
        removeHighlight: function () {
            return this.removeClass('warning').removeClass('success').removeClass('modified').removeClass('active').removeClass('error').removeClass('success');
        },
        setModified: function () {
            return this.removeHighlight().addClass('warning').addClass('modified');
        },
        setBeginSave: function () {
            var processingIcon = $('<div class="processing"></div>');
            this.after(processingIcon);
            processingIcon.css(
                {
                    'left': this.position().left + this.outerWidth() - $('.processing').outerWidth() - 2,
                    'top': this.position().top + (this.outerHeight() - $('.processing').outerHeight()) / 2 + 1
                });
            return this.removeHighlight().addClass('saving');
        },
        setEndSave: function (addModifiedCss) {
            var thisObj = this;
            setTimeout(function () {
                thisObj.removeClass('saving');
                if (addModifiedCss)
                    thisObj.addClass('modified');
                $('.processing').remove();
            }, 500);
            return thisObj;
        },
        setError: function () {
            $('.processing').remove();
            return this.removeHighlight().addClass('error');
        }
    });
}(jQuery));

var globalFunctions = function () {
    var ShowMessage = function (type, text) {
        noty({ text: text, layout: "topCenter", type: type });

        setTimeout(function () {
            $.noty.closeAll();
        }, 4000);
    }

    var showWarningMessage = function (text) {
        noty({ text: text, layout: "topCenter", type: 'warning' });

        setTimeout(function () {
            $.noty.closeAll();
        }, 4000);
    }

    var onFailure = function (data, xhr, status) {
        globalFunctions.ShowMessage("error", "Technical error");
    }

    var loadPopup = function (source, url, header, panelCssClass) {
        // pageLoadingFrame("show");
        $("#modal_Loader").html("");
        $("#modal_Loader").load(url, function () {
            $("#modal_Loader").closest('.modal-dialog').addClass(panelCssClass);
            $("#modal_heading").text(header);
            $('#myModal').modal({ backdrop: 'static' });

            source.trigger('modalLoaded');

            setTimeout(function () {
                // pageLoadingFrame("hide");
            }, 500);
        });
    }

    var enableGradeLoadingOnCycleChange = function (cycleDropdownListId, gradeDropdownListId, triggerChangeEvent, enableBootStrapSelect) {
        enableCascadedDropdownList(cycleDropdownListId, gradeDropdownListId, '/Shared/Shared/GetGradesForCycle', triggerChangeEvent, enableBootStrapSelect);
    }

    var enableClassLoadingOnGradeChange = function (gradeDropdownListId, classDropdownListId, triggerChangeEvent, enableBootStrapSelect) {
        enableCascadedDropdownList(gradeDropdownListId, classDropdownListId, '/Shared/Shared/GetClassesForGrade', triggerChangeEvent, enableBootStrapSelect);
    }

    var enableCascadedDropdownList = function (sourceDropdownListId, destinationDropdownListId, actionUrl, triggerChangeEvent, enableBootStrapSelect) {
        $(document).on("change", "#" + sourceDropdownListId, function () {
            $.ajax({
                url: actionUrl,
                type: 'POST',
                data: {
                    id: $(this).val()
                },
                success: function (data) {
                    data.unshift({ ItemName: "Select" });
                    formElements.feEnableSelect(destinationDropdownListId);
                    formElements.feReloadSelect(destinationDropdownListId, data, '', enableBootStrapSelect);

                    if (triggerChangeEvent)
                        $("#" + destinationDropdownListId).trigger('change');
                },
                error: function (data, xhr, status) {
                    globalFunctions.onFailure(data, xhr, status);
                }
            });
        });
    }

    var enableOptionalClassLoadingOnCurriculumChange = function (curriculumSearchBoxId, optionalClassDropDownListId, enableBootStrapSelect) {
        $(document).bind("selectCurriculum", function (e) {
            if (e.message != null)
                if (e.message.source == curriculumSearchBoxId) {
                    var id = e.message.ItemId;
                    $.ajax({
                        url: '/Shared/Shared/GetElectiveClassesByCurriculum',
                        type: 'POST',
                        data: {
                            id: id
                        },
                        success: function (data) {
                            formElements.feEnableSelect(optionalClassDropDownListId);
                            formElements.feReloadSelect(optionalClassDropDownListId, data, "Select", enableBootStrapSelect);
                        },
                        error: function (data, xhr, status) {
                            globalFunctions.onFailure(data, xhr, status);
                        }
                    })
                }
        });
    }

    var notyDeleteConfirm = function (source, confirmMesage) {
        $(document).unbind('okToDelete');
        noty({
            text: confirmMesage,
            layout: 'topCenter',
            buttons: [
                        {
                            addClass: 'btn btn-success btn-clean',
                            text: 'Ok',
                            onClick: function ($noty) {
                                $.event.trigger({
                                    type: "okToDelete",
                                    message: source,
                                    time: new Date()
                                });
                                $noty.close();

                            }
                        },
                        {
                            addClass: 'btn btn-danger btn-clean',
                            text: 'Cancel',
                            onClick: function ($noty) {
                                $noty.close();
                            }
                        }
            ]

        });
    }

    var deleteItem = function (source, url, tableId, rowId, id) {

        notyDeleteConfirm(source, "Are you sure to delete it");
        $(document).bind('okToDelete', function (e) {
            if (e.message != source) return;
            $.ajax({
                type: 'POST',
                url: url,
                data: { 'id': id },
                async: false,
                success: function (result) {
                    if (result.Success == false)
                        globalFunctions.ShowMessage("error", result.Message);
                    else {
                        var table = $('#' + tableId).DataTable();
                        table.row($(rowId).parents('tr')).remove().draw(false);
                    }
                    setTimeout(function () {
                        pageLoadingFrame("hide");
                    }, 1000);
                },
                error: function (msg) {
                    pageLoadingFrame("hide");
                    globalFunctions.ShowMessage("error", "Technical error");
                }
            });
        });
    }

    var highlightDisabledRow = function (target, disable) {
        if (disable)
            target.addClass("disabled-row");
        else
            target.removeClass("disabled-row");
    }

    var enableGridRowSelection = function (tableId, url) {
        var table = "";
        var selector = "";
        $(document).on('click', '#' + tableId + ' tbody tr', function () {
            table = $('#' + tableId).DataTable();
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
    }

    var selectOnRowSelection = function (url, id) {
        window.open(url + id, '_blank');
    }

    var isNumber = function (value) {
        var regex = /^\d+(?:\.\d{1,4})?$/;
        return regex.test(value);
    }

    var isNumberInRange = function (min, max, value) {
        if (isNumber(min) && isNumber(max) && isNumber(value)) {
            if (value >= min && value <= max)
                return true;
        }
        return false;
    }

    var mergeRows = function mergeRows(tableId, colIndices, mergeRowsById) {
        for (i = 0; i < colIndices.length; i++) {
            var nthChild = colIndices[i];
            $("#" + tableId + " tbody tr").each(function (index, val) {
                var currentRow = $(this);
                if ($(val).find('td:nth-child(' + nthChild + '):hidden').length == 0) {
                    var cnt = 0;
                    $("#" + tableId + " tbody tr").each(function (index, val) {
                        var result;
                        if (mergeRowsById)
                            result = $(currentRow).find('td:nth-child(' + nthChild + ')').attr('data-id') == $(this).find('td:nth-child(' + nthChild + ')').attr('data-id');
                        else
                            result = $.trim($(currentRow).find('td:nth-child(' + nthChild + ')').text()).toUpperCase() == $.trim($(this).find('td:nth-child(' + nthChild + ')').text()).toUpperCase();

                        if (result == true) {
                            cnt = cnt + 1;
                            if (cnt > 1) {
                                $(val).find('td:nth-child(' + nthChild + ')').attr('data-merged', true);
                            }
                        }
                    });
                    if (cnt > 1) {
                        $(currentRow).find('td:nth-child(' + nthChild + ')').attr("rowspan", cnt);
                    }
                }
            });
        }
        $("#" + tableId + " tbody tr").find('td[data-merged=true]').remove();//  hide();
    },

    getStudentNameView = function (studentNameData) {
        var model = jQuery.parseJSON(studentNameData);
        var otherIcons = '';
        $.each(model.IconData, function (idx, icon) {
            if (icon.ImageName != undefined && icon.ImageName.length) {
                var iconPath = icon.Type == "M" ? "\\UserData\\Medical\\Icons\\" : "\\UserData\\SEN\\Icons\\";
                iconPath = iconPath + icon.ImageName;
                var title = (icon.Type == "M" ? translatedResources.medical : translatedResources.SEN) + " - " + icon.Title + " [" + icon.Details + "]";
                otherIcons += '<img src="' + iconPath + '" class="grid-icon" title="' + title + '" />';
            }
        });

        var studentNameView =
        ['<ul class="row studentname-view">',
        '    <li class="name">',
        '        ' + model.StudentName + ' - ' + model.AlternateId,
        '    </li>',
        '    <li><i class="flag ' + model.FlagCssClass + '" title="' + model.Nationality + '"></i></li>',
        '    <li class="gender-icon">',
        '        <span class="fa ' + (model.GenderId == 0 ? 'fa-female' : 'fa-male') + '"></span>',
        '    </li>',
        '    <li class="pull-right">',
        '        ' + model.ClassName,
        '        <i class="fa fa-info-circle student-profile-icon" data-studentid="' + model.StudentId + '" title="' + translatedResources.viewProfile + '"></i>',
        '    </li>',
        '    <li class="icons">' + otherIcons + '</li>',
        '</li>'];
        return studentNameView.join(' ');
    }

    var previewReport = function (url, params) {
        pageLoadingFrame("show");
        setTimeout(function () {
            $.ajax({
                url: url,
                type: 'POST',
                async: true,
                contentType: 'application/json',
                data: JSON.stringify(params),
                success: function (data) { // loading repports in reportsIframe
                    $('#reportsIframe').attr("src", data);
                    $('#reportsIframe').show();
                    $('.reportsDiv').show();
                },
                error: function (data, xhr, status) {
                    pageLoadingFrame("hide");
                    onFailure(data, xhr, status);  //Error Function
                }
            });
        }, 300);
    }

    var previewCRReport = function (url) {
        $("#reportPanel").removeClass("hidden");
        pageLoadingFrame("show");
        $.ajax({
            url: url,
            type: 'GET',
            async: true,
            contentType: 'application/json',
            success: function (data) { // loading repports in reportsIframe

                $('#reportsIframe').attr("src", data);
                $('#reportsIframe').show();
                $('.reportsDiv').show();
                setTimeout(function () {
                    pageLoadingFrame("hide");
                }, 5000);
            },
            error: function (data, xhr, status) {
                onFailure(data, xhr, status);  //Error Function
            }
        });
    }
    return {
        ShowMessage: ShowMessage,
        showWarningMessage: showWarningMessage,
        onFailure: onFailure,
        loadPopup: loadPopup,
        notyDeleteConfirm: notyDeleteConfirm,
        deleteItem: deleteItem,
        highlightDisabledRow: highlightDisabledRow,
        enableGradeLoadingOnCycleChange: enableGradeLoadingOnCycleChange,
        enableClassLoadingOnGradeChange: enableClassLoadingOnGradeChange,
        enableOptionalClassLoadingOnCurriculumChange: enableOptionalClassLoadingOnCurriculumChange,
        enableGridRowSelection: enableGridRowSelection,
        enableCascadedDropdownList: enableCascadedDropdownList,
        isNumberInRange: isNumberInRange,
        isNumber: isNumber,
        mergeRows: mergeRows,
        selectOnRowSelection: selectOnRowSelection,
        getStudentNameView: getStudentNameView,
        previewReport: previewReport,
        previewCRReport:previewCRReport
    }
}();

function FilterCityDropDown(sourceSelector, targetedSelector, selectedText, onlyText) {
    var id = $(sourceSelector).val();
    $.ajax({
        dataType: 'json',
        type: 'POST',
        async: false,
        data: { CountryID: id },
        url: '/Common/FilterCityDropDown',
        success: function (data) {
            var text = '<option>' + selectedText + '</option>';
            if (onlyText) {
                $.each(data, function (ind, item) {
                    text = text + '<option value="' + item.Text + '">' + item.Text + '</option>';
                });

            } else {
                $.each(data, function (ind, item) {
                    text = text + '<option value="' + item.Value + '">' + item.Text + '</option>';
                });
            }
            $(targetedSelector).html(text);
            RefreshSelect(targetedSelector);
        },
        error: function (data) {
            ShowMessage("error", "Some technical error occurred");
        }
    });
}

function SearchTable(e, tableid, colIndex) {
    var key = $(e).val();
    var Table = $('#' + tableid)
    if (parseInt(colIndex) >= 0) {
        if (key.match('')) {
            var regx = new RegExp(key, 'i');
            $(Table).find('tbody tr').each(function () {
                var $tr = $(this);
                if (!$tr.children('td:eq(' + colIndex + ')').text().match(regx)) {
                    $tr.hide();
                }
                else {
                    $tr.show();
                }
            })
        }
        else {
            $(Table).find('tbody tr').show();
        }
    }
    else {
        if (key.match('')) {
            var regx = new RegExp(key, 'i');
            $(Table).find('tbody tr').each(function () {
                var $tr = $(this);
                if (!$tr.children('td').text().match(regx)) {
                    $tr.hide();
                }
                else {
                    $tr.show();
                }
            })
        }
        else {
            $(Table).find('tbody tr').show();
        }
    }

}

function RefreshSelect(selector) {
    try {
        if ($(selector).hasClass('selectpicker') || $(selector).hasClass('selectpickerddl'))
            $(selector).selectpicker('refresh');

    } catch (e) {
        var type = e.message;
    }
}

function DisabledSelect(selector, mode) {
    try {
        $(selector).attr('disabled', mode).selectpicker('refresh');
    } catch (e) {
    }
};

function handleValidationMsg(formId) {
    $.each($(formId).find('select.validator'), function () {
    });
}

function CloseClosetModel(selector) {
    var modelType = $(selector).closest('.modal');
    $(modelType).modal("hide");
}

function setDropDown() {
    $('.page-content-wrap').css({
        'overflow': 'inherit'
    });
}

function addDifferenceType(title, typeId, ddlID, url) {
    //$("div.tooltip").hide();
    $("#hdnDropDownReloadId").val(ddlID);
    $("#hdnDropDownId").val(typeId);
    $("#modal_Loader1").load(url);
    $("#myModal1").modal("show");
    $("#modal_heading1").text(title);
}

function getSelectedIds(selector) {
    var ArrayIds = [];
    $(selector + ' ul li input[type="checkbox"]').each(function (ind, item) {
        var chk = $(item);
        var value = chk.val();
        var txt = chk.parent('label').text().trim().toLowerCase();
        if (chk.is(":checked")) {
            if (txt != 'select all')
                ArrayIds.push(value);
        }
    });
    return ArrayIds;
}

function selectMultiSelect(selector, stringIds) {
    var dataarray = stringIds.split(",");
    $(selector).val(dataarray);
    $(selector).multiselect("refresh");
}

function getExportIcon(mode, exportExel, exportPdf, exportWord) {
    var divContent = ""
    if (mode == "1") {
        divContent = "<div class='pull-right'>" +
                             "<span onclick='" + exportPdf + "' title='Export to Pdf' class='fa fa-file-pdf-o fa-2x text-danger cursorPointer icon-Export'></span>" +
                             "</div>" +
                             "<div class='pull-right' style='padding-right:6px;'>" +
                             "<span onclick='" + exportExel + "'  title='Export to Excel' class='fa fa-file-excel-o fa-2x text-success cursorPointer icon-Export'></div>"
    }
    if (mode == "2") {
        divContent = "<div class='pull-right'>" +
                             "<span onclick='" + exportPdf + "' title='Export to Pdf' class='fa fa-file-pdf-o fa-2x text-danger cursorPointer icon-Export'></span>" +
                             "</div>" +
                             "<div class='pull-right' style='padding-right:6px;'>" +
                             "<span onclick='" + exportExel + "'  title='Export to Excel' class='fa fa-file-excel-o fa-2x text-success cursorPointer icon-Export'></div>" +
                             "<div class='pull-right' style='padding-right:6px;'>" +
                             "<span onclick='" + exportWord + "'  title='Export to Word' class='fa fa-file-word-o fa-2x text-Primary-label cursorPointer icon-Export'></div>"
    }
    return divContent;
}

function SearchHtml(id, e, pattern, filterClass) {
    var val = $.trim($(e).val()).replace(/ +/g, ' ').toLowerCase();
    var $emp = $(pattern);
    var filterClass = ' ' + filterClass;
    $emp.show().filter(function () {
        var text = $(this, +filterClass).text().trim().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
    }).hide();
}

function checkUrlPermission(url, mode, message) {
    checkPermission(url, mode, function (retdata) {
        if (retdata)
            window.location.href = url;
        else
            ShowMessage("error", message);
    });
}

function checkPermission(url, mode, callBack) {
    $.ajax({
        url: '/Home/CheckUrlPermission?url=' + url + "&mode=" + mode,
        success: function (data) {
            callBack(data);
        },
        error: function (data) { }
    });

}

function customShowMessage(Cssclass, text, showtime, alignStyle) {
    noty({ text: text, layout: "topCenter", type: Cssclass, onClickTemp: "function" });
    textAlignNotyMessage(alignStyle);
    setTimeout(function () {
        $.noty.closeAll();
        textAlignNotyMessage("center");
    }, showtime);

}

function textAlignNotyMessage(mode) {
    if (mode == "left") {
        $(".noty_message").css({
            "text-align": "left",
            "line-height": "18px"
        })
    }
    if (mode == "center") {
        $(".noty_message").css({
            "text-align": "center",
            "line-height": "14px"
        })
    }
}

function calculatePercentageAmount(percentage, value) {
    return ((parseFloat(percentage) * parseFloat(value)) / 100);
}

function getAmountFormateSetting(callBack) {
    var degitAfterDecimal = 0
    $.ajax({
        dataType: 'json',
        url: '/Common/GetDecimalPointSetting',
        success: function (data) {
            var amountSetting = data.split('.')
            if (amountSetting.length > 1) {
                degitAfterDecimal = amountSetting[1].length;
            } else {
                degitAfterDecimal = 0;
            }
            return callBack(degitAfterDecimal);
        },
        error: function (data) { }
    });
}

function findItemInArray(arr, key, val) {
    for (var ai, i = arr.length; i--;)
        if ((ai = arr[i]) && ai[key] == val)
            return true;
    return false;
}

function newTabWindow(href) {
    $('#hdnTempLink').attr('href', href);
    document.getElementById("hdnTempLink").click();
}

function toggleCheckBox(selector) {
    if ($(selector).is(":checked"))
        $(selector).prop("checked", false);
    else
        $(selector).prop("checked", true);
}

function RemoveElement(jsonElement, name, value) {
    var array = $.map(jsonElement, function (v, i) {
        return v[name] === value ? null : v;
    });
    jsonElement.length = 0; //clear original array
    jsonElement.push.apply(jsonElement, array); //push all elements except the one we want to delete
    return jsonElement;
}

function bindCharsOnly(selector) {    
    $(selector).keydown(function (e) {
        if (e.ctrlKey || e.altKey) {
            e.preventDefault();
        } else {
            var key = e.keyCode;
            if (!((key == 8) || (key == 9) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
                e.preventDefault();
            }
        }
    });
}

function CheckSession() {
    $.ajax({
        dataType: 'json',
        url: '/Common/CheckSession',
        success: function (data) {
            if (data) {
                window.location = "/Account/UserLogin";
            }
        },
        error: function (data) { }
    })
}
function StartPanelLoader(selecter) {    
    var panel = $(selecter).closest(".panel");
    panel_refresh(panel);
    $('.panel-refresh-layer').show();
}

function StopPanelLoader(selecter) {
    var panel = $(selecter).parents(".panel");
    panel.find(".panel-refresh-layer").remove();
    panel.removeClass("panel-refreshing");
}

jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "date-uk-pre": function (a) {
        var ukDatea = a.split('/');
        return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
    },

    "date-uk-asc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "date-uk-desc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    },

    "Int-pre": function (a) {
        return (a.replace(/\D/g, '')) * 1;
    },

    "Int-asc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "Int-desc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});


function ChangePassword(EmployeeId) {   
    $("#modal_Loader").load("/ViewEmployeeProfile/ChangeEmployeePassword/" + EmployeeId);
    $("#myModal").modal("show");
    $("#modal_heading").text('Change Password');
}

function ViewProfileChannel(id) {
    $.ajax({
        dataType: 'json',
        type: 'POST',
        data: { EMployeeID: id },
        url: '/Common/SetActiveEmployeeIDSesson',
        success: function (data) {
            if (data.success == true) {
                window.location.href = "/ViewEmployeeProfile/Index/";
            }
        },
        error: function (data) {
            ShowMessage("error", "Some technical error occurred");
        }
    });
}
