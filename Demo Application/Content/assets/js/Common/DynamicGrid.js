var DynamicGrid = function (newTableId) {
    this.tableId = newTableId;
};

DynamicGrid.prototype = function () {
    var _otable;
    var _settings;

    var init = function (settings, callBack) {
        var thisObj = this;
        _settings = settings;

        var gridSettings = {
            "processing": settings.processing == undefined ? false : settings.processing,
            "serverSide": settings.serverSide,
            "bLengthChange": true,
            "sAjaxSource": settings.sAjaxSource,
            "sTitle": settings.sTitle,
            "fnServerParams": settings.fnServerParams,
            "bSortable": settings.bSortable == undefined ? true : settings.bSortable,
            "aLengthMenu": settings.pageSizeMenu == undefined ? [[10, 25, 50, 100, 1000], [10, 25, 50, 100, "All"]] : settings.pageSizeMenu,
            "iDisplayLength": settings.pageSize == undefined ? (settings.simpleGrid ? 500 : 10) : settings.pageSize,
            "bDestroy": true,
            "bAutoWidth": settings.autoWidth == undefined || settings.autoWidth == false ? false : true,
            "bDeferRender": true,
            "bSortCellsTop": true,
            "ordering": (settings.sortable == undefined || settings.sortable == true ? true : false),
            "aaSorting": settings.sorting != undefined ? settings.sorting : [],
            "aaSortingFixed": settings.sortingFixed != undefined ? settings.sortingFixed : [],
            "columnDefs": [{ orderable: false, targets: ['nosort'] }],
            "scrollCollapse": settings.scrollCollapse,
          //  "oLanguage":{ "sEmptyTable":  "<img src='/Content/assets/img/loaders/default.gif'>" },
            "oClasses": { sLengthSelect: 'form-control', sFilterInput: 'form-control' },
            stateSave: settings.stateSave == undefined ? true : settings.stateSave,
            dom: settings.simpleGrid == true ? 'srt' : (settings.dom == undefined ? 'lBfrtip' : settings.dom),
            fixedColumns: settings.fixedColumns,
            buttons: settings.columnSelector == undefined ? [{ extend: 'colvis', columns: ':gt(0)', text: '', className: 'btn-column-chooser' }] :
                                                    settings.columnSelector != false ?
                                                    [{
                                                        extend: 'colvis', columns: settings.columnSelector.columns == undefined ? ':gt(0)' : settings.columnSelector.columns,
                                                        text: '', className: 'btn-column-chooser'
                                                    }] : [],
            fnDrawCallback: function () {               
                //$(this).css('width', '100%');
                //$(document).unbind('fnDrawCallBack');
                //ShowMessage("success", "success");
                //$.event.trigger({
                //    type: "fnDrawCallback",
                //    message: $('#' + self.tableId),
                //    time: new Date()
                //});
                callBack();
            }
        };
        if (settings.scrollX != undefined)
            gridSettings["scrollX"] = settings.scrollX;
        if (settings.scrollY != undefined)
            gridSettings["scrollY"] = settings.scrollY;

        if (settings.multiSelect) {
            gridSettings["columnDefs"] = [{
                'targets': 0,
                'searchable': false,
                'orderable': false,
                'className': 'dt-body-center',
                'render': function (data, type, full, meta) {
                    return '<input type="checkbox" name="id[]" class="row-check" value="' + $('<div/>').text(data).html() + '">';
                }
            }];
        }
        else {
            gridSettings["columnDefs"] = [{ orderable: false, targets: ['nosort'] }];
        }

        if (settings.hasStudentNameColumn) {
            if (gridSettings["columnDefs"] == undefined) gridSettings["columnDefs"] = [];
            gridSettings["columnDefs"].push({
                'targets': settings.studentNameColIndex == undefined ? 0 : settings.studentNameColIndex,
                'orderable': false,
                'className': 'dt-body-center',
                'render': function (data, type, full, meta) {
                    return globalFunctions.getStudentNameView(data);
                }
            });
        }

        if (settings.columnWidths != undefined) {
            $.merge(gridSettings["columnDefs"], settings.columnWidths);
        }
        if (settings.url != null || settings.url != undefined) {
            gridSettings["sAjaxSource"] = settings.url;
            gridSettings["aoColumns"] = settings.columnData;
        }

        if (settings.enableDateTimeSorting) {
            $.fn.dataTable.moment('dd-mm-yyyy hh:mm A');
            $.fn.dataTable.moment('dd-mm-yyyy');
            $.fn.dataTable.moment('hh:mm A');
        }
        if (settings.enableDateSorting) {
            $.fn.dataTable.moment('dd-mm-yyyy');
        }
        if (settings.enableTimeSorting) {
            $.fn.dataTable.moment('hh:mm A');
        }

        _otable = $('#' + thisObj.tableId).DataTable(gridSettings);
        if (!settings.serverSide)
            _otable.columns.adjust().draw();

        if (settings.columnSelector != undefined && settings.columnSelector != false)
            attachColumnSelector(thisObj.tableId, settings.columnSelector.addToPanel);

        enableEnterKeySearchForFilterTextBox();
        if (settings.columnData != undefined)
            enableInlineEditor(thisObj.tableId, settings.columnData, settings);

        return _otable;
    },

    attachColumnSelector = function (tableId, addToPanel) {
        var colVisBtn = $('#' + tableId + '_wrapper .buttons-colvis');
        if (colVisBtn.length) {
            $('#' + tableId + '_wrapper .buttons-colvis').addClass('fa fa-table');
            $(addToPanel).find('.buttons-colvis').remove();
            $(addToPanel).append($('#' + tableId + '_wrapper .buttons-colvis'));
        }
    },

    enableInlineEditor = function (tableId, columns, settings) {
        var columsForEditor = [], atleastOneColEditable = false;
        $.each(columns, function (idx, col) {
            if (col.editable)
                atleastOneColEditable = true;
            columsForEditor.push({
                name: col.data, editable: col.editable, readonly: col.readonly, alwaysVisible: col.alwaysVisible,
                attributes: col.attributes, editorType: col.editorType, validators: col.validators,
                listSourceUrl: col.listSourceUrl, maxLength: col.maxLength, feedbackText: col.feedbackText,
                reloadList: (col.reloadList == undefined ? false : true), searchable: (col.searchable == undefined ? false : true)
            });
        });
        if (atleastOneColEditable)
            $('#' + tableId).inlineEditor(
                {
                    columns: columsForEditor,
                    enableActiveRowEditorsOnOneClick: settings.enableActiveRowEditorsOnOneClick,
                    enableAddModeAllRows: settings.enableAddModeAllRows,
                    enableEditModeAllRows: settings.enableEditModeAllRows,
                    addNewRow: settings.addNewRow
                });
    },

    addNewEditableRow = function (attributes) {
        $('#' + this.tableId).inlineEditor('addNewRow', attributes);
    },

    enableAddModeAllRows = function () {
        $('#' + this.tableId).inlineEditor('enableAddModeAllRows');
    },

    enableEditModeAllRows = function () {
        $('#' + this.tableId).inlineEditor('enableEditModeAllRows');
    },

    getEditedData = function () {
        return $('#' + this.tableId).inlineEditor('getEditedData');
    },

    getEditedDataByRow = function (row) {
        return $('#' + this.tableId).inlineEditor('getEditedDataByRow', row);
    },

    enableEnterKeySearchForFilterTextBox = function () {
        $('div.dataTables_filter input').off('keyup.DT input.DT');
        $('div.dataTables_filter input').on('keyup', function (e) {
            e.stopPropagation();
            //if (e.keyCode == 13) {
            _otable.search($(this).val()).draw();
            //}
        });
    },

    applyFilter = function (searchValue) {
        if (_otable != undefined)
            _otable.search(searchValue).draw();
    },

    table = function () {
        return _otable;
    };
    return {
        init: init,
        table: table,
        applyFilter: applyFilter,
        addNewEditableRow: addNewEditableRow,
        enableEditModeAllRows: enableEditModeAllRows,
        enableAddModeAllRows: enableAddModeAllRows,
        getEditedData: getEditedData,
        getEditedDataByRow: getEditedDataByRow
    }
}();