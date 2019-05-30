var SimpleGrid = function (newTableId) {
    this.tableId = newTableId;
};

SimpleGrid.prototype = function () {
    var _otable;
    var init = function (settings) {
        if (settings == undefined || settings == null)
            settings = {};
        var thisObj = this;
        var gridSettings = {
            "processing": settings.processing == undefined ? false : settings.processing,
            "serverSide": settings.serverSide,
            "sTitle": settings.sTitle,
            "bLengthChange": true,
            "aLengthMenu": settings.pageSizeMenu == undefined ? [[10, 50, 100, -1], [10, 50, 100, "All"]] : settings.pageSizeMenu,
            "iDisplayLength": settings.dom != undefined && settings.dom.indexOf('p') >= 0 && settings.pageSize == undefined ? 10 :
                (settings.pageSize == undefined ? 500 : settings.pageSize),
            "bDestroy": true,
            "bAutoWidth": settings.autoWidth == undefined || settings.autoWidth == false ? false : true,
            "bDeferRender": true,
            "bSortCellsTop": true,
            "ordering": (settings.sortable == undefined || settings.sortable == true ? true : false),
            "aaSorting": settings.sorting != undefined ? settings.sorting : [[0, "asc"]],
            "aaSortingFixed": settings.sortingFixed != undefined ? settings.sortingFixed : [],
            "columnDefs": [{ orderable: false, targets: ['nosort'] }],
            "scrollCollapse": settings.scrollCollapse,
            //"oLanguage": { "sEmptyTable": translatedResources.noData },
            "oClasses": { sLengthSelect: 'form-control', sFilterInput: 'form-control' },
            stateSave: settings.stateSave == undefined ? false : settings.stateSave,
            dom: settings.dom == undefined ? 'srt' : settings.dom,
            fixedColumns: settings.fixedColumns,
            fnDrawCallback: function () {
                $(this).css('width', '100%');
                $(document).unbind('fnDrawCallBack');

                $.event.trigger({
                    type: "fnDrawCallback",
                    message: $('#' + thisObj.tableId),
                    time: new Date()
                });
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
                    return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data).html() + '">';
                }
            }]
        }
        else {
            gridSettings["columnDefs"] = [{ orderable: false, targets: ['nosort'] }];
        }

        if (settings.hasStudentNameColumn) {
            if (gridSettings["columnDefs"] == undefined) gridSettings["columnDefs"] = [];
            gridSettings["columnDefs"].push({
                'targets': settings.studentNameColIndex == undefined ? 0 : settings.studentNameColIndex,
                'searchable': false,
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

        enableEnterKeySearchForFilterTextBox();
        if (settings.columnData != undefined)
            enableInlineEditor(thisObj.tableId, settings.columnData, settings.enableActiveRowEditorsOnOneClick);

        return _otable;
    },

    enableInlineEditor = function (tableId, columns, settings) {
        var columsForEditor = [], atleastOneColEditable = false;
        $.each(columns, function (idx, col) {
            if (col.editable)
                atleastOneColEditable = true;
            columsForEditor.push({
                name: col.data, editable: col.editable, readonly: col.readonly, alwaysVisible: col.alwaysVisible,
                attributes: col.attributes, editorType: col.editorType, validators: col.validators,
                listSourceUrl: col.listSourceUrl, maxLength: col.maxLength, feedbackText: col.feedbackText
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
            if (e.keyCode == 13) {
                _otable.search($(this).val()).draw();
            }
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
        enableAddModeAllRows: enableAddModeAllRows,
        getEditedData: getEditedData
    }
}();