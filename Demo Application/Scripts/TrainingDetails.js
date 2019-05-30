$(document).ready(function () {
   
    var EmployeeId = $("#EmployeeID").val();
    getOngoingTrainingGrid(EmployeeId)
    getTrainingHistoryGrid(EmployeeId)
});





var oOngoingTrainingTable;

function getOngoingTrainingGrid(EmployeeId) {

    oOngoingTrainingTable = $('#tbl_OngoingTraining').dataTable({
        "dom": 'rt<".divFooter"<".col-md-4 pageEntries"i><".col-md-4 pageNo"p><".col-md-4 perPage"l>>',
        "language": {
            "lengthMenu": "Records per page _MENU_ ",
        },
        "sAjaxSource": "/ProfessionalTraining/GetOngoingTrainingList",
        "fnServerParams": function (aoData) {
            aoData.push({ "name": "EmployeeID", "value": EmployeeId });
        },
        "aoColumns": [
            //{ "mData": "Actions", "sTitle": "Actions" },
            { "mData": "EmployeeID", "bVisible": false, "bSortable": false, "sTitle": "EmployeeID" },
            { "mData": "EmployeeAlternativeID", "bVisible": false, "bSortable": false, "sTitle": "EmployeeAlternativeID" },
            { "mData": "EmployeeTrainingID", "bVisible": false, "bSortable": false, "sTitle": "EmployeeTrainingID" },
            { "mData": "Fullname", "bSortable": false, "sTitle": "Fullname" },
            { "mData": "isAssign", "bSortable": false, "sTitle": "Is Assign" },
            { "mData": "CourseTitleName", "bSortable": false, "sTitle": "Course Name" },
            { "mData": "StartDate", "sTitle": "Start Date" },
            { "mData": "EndDate", "bSortable": false, "sTitle": "End Date" },
            { "mData": "Trainee", "bSortable": false, "sTitle": "Trainer" }

        ],
        "processing": true,
        "serverSide": true,
        "ajax": "/ProfessionalTraining/OngoingTraining",
        "aLengthMenu": [[10, 25, 50, 100, 1000], [10, 25, 50, 100, "All"]],
        "iDisplayLength": 10,
        "bDestroy": true,
        "bFilter": false,
        "bInfo": true,
        "bSortCellsTop": true
    });
}



var oTrainingHistoryTable;

function getTrainingHistoryGrid(EmployeeId) {

    oTrainingHistoryTable = $('#tbl_TrainingHistory').dataTable({
        "dom": 'rt<".divFooter"<".col-md-4 pageEntries"i><".col-md-4 pageNo"p><".col-md-4 perPage"l>>',
        "language": {
            "lengthMenu": "Records per page _MENU_ ",
        },
        "sAjaxSource": "/ProfessionalTraining/GetTrainingHistoryList",
        "fnServerParams": function (aoData) {
            aoData.push({ "name": "EmployeeID", "value": EmployeeId });
        },
        "aoColumns": [
            { "mData": "EmployeeID", "bVisible": false, "bSortable": false, "sTitle": "EmployeeID" },
            { "mData": "EmployeeAlternativeID", "bVisible": false, "bSortable": false, "sTitle": "EmployeeAlternativeID" },
            { "mData": "EmployeeTrainingID", "bVisible": false, "bSortable": false, "sTitle": "EmployeeTrainingID" },
            { "mData": "Fullname", "bSortable": false, "sTitle": "Fullname" },
            { "mData": "isAssign", "bSortable": false, "sTitle": "Is Assign" },
            { "mData": "CourseTitleName", "bSortable": false, "sTitle": "Course Name" },
            { "mData": "StartDate", "sTitle": "Start Date" },
            { "mData": "EndDate", "bSortable": false, "sTitle": "End Date" },
            { "mData": "Trainee", "bSortable": false, "sTitle": "Trainer" }
        ],
        "processing": true,
        "serverSide": true,
        "ajax": "/ProfessionalTraining/GetTrainingHistoryList",
        "aLengthMenu": [[10, 25, 50, 100, 1000], [10, 25, 50, 100, "All"]],
        "iDisplayLength": 10,
        "bDestroy": true,
        "bFilter": false,
        "bInfo": true,
        "bSortCellsTop": true
    });
}
