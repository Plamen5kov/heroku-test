$(document).ready(function () {

    function getAssignmentData() {
        return {
            name_of_subject: $("#post_assignment_1").val(),
            title_of_assignment: $("#post_assignment_2").val(),
            evaluation: $("#post_assignment_3").val(),
            file: $("#post_assignment_4").val()
        }
    }

    function getDevelopmentData() {
        return {
            what_do_i_need_to_learn: $("#post_development_plan_1").val(),
            what_will_i_do_to_achieve_this: $("#post_development_plan_2").val(),
            what_resources_or_support_will_i_need: $("#post_development_plan_3").val(),
            what_will_my_success_criteria_be: $("#post_development_plan_4").val(),
            target_dates_for_review_and_completion: $("#post_development_plan_5").val()
        }
    }

    function getDevelopmentRecordsData() {
        return {
            key_dates: $("#post_development_record_1").val(),
            what_did_you_do: $("#post_development_record_2").val(),
            why: $("#post_development_record_3").val(),
            what_did_you_learn_from_this: $("#post_development_record_4").val(),
            how_will_you_use_this: $("#post_development_record_5").val(),
        }
    }

    function getCurrentAssignmentValues(rootView) {
        return {
            name_of_subject: rootView.find("[fieldName=name_of_subject]").text(),
            title_of_assignment: rootView.find("[fieldName=title_of_assignment]").text(),
            evaluation: rootView.find("[fieldName=evaluation]").text(),
            file: rootView.find("[fieldName=file]").attr("href")
        }
    }

    function getCurrentDevelopmentValues(rootView) {
        return {
            what_do_i_need_to_learn: rootView.find("[fieldName=what_do_i_need_to_learn]").text(),
            what_will_i_do_to_achieve_this: rootView.find("[fieldName=what_will_i_do_to_achieve_this]").text(),
            what_resources_or_support_will_i_need: rootView.find("[fieldName=what_resources_or_support_will_i_need]").text(),
            what_will_my_success_criteria_be: rootView.find("[fieldName=what_will_my_success_criteria_be]").text(),
            target_dates_for_review_and_completion: rootView.find("[fieldName=target_dates_for_review_and_completion]").text(),
        }
    }

    function getCurrentDevelopmentRecordsValues(rootView) {
        return {
            key_dates: rootView.find("[fieldName=key_dates]").text(),
            what_did_you_do: rootView.find("[fieldName=what_did_you_do]").text(),
            why: rootView.find("[fieldName=why]").text(),
            what_did_you_learn_from_this: rootView.find("[fieldName=what_did_you_learn_from_this]").text(),
            how_will_you_use_this: rootView.find("[fieldName=how_will_you_use_this]").text(),
        }
    }

    function doRequestWithData(method, data, url) {
        $.ajax({
            url: url,
            type: method,
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(data),
            success: function () {
                location.reload();
            }
        })
    }
    $("body").on('click', '#update_assignment_btn', function () {
        var data = getAssignmentData();
        var clickedBtnID = $(this).attr('entityId');
        data.id = clickedBtnID;
        doRequestWithData('PUT', data, '/assignments');
        $("#assignmentEditForm").show()
    });

    $("body").on('click', '#update_development_btn', function () {
        var data = getDevelopmentData();
        var clickedBtnID = $(this).attr('entityId');
        data.id = clickedBtnID;
        doRequestWithData('PUT', data, '/development_plan');
        $("#developmentEditForm").show()
    });

    $("body").on('click', '#update_developmentRecords_btn', function () {
        var data = getDevelopmentRecordsData();
        var clickedBtnID = $(this).attr('entityId');
        data.id = clickedBtnID;
        doRequestWithData('PUT', data, '/development_record');
        $("#developmentRecordsEditForm").show()
    });

    $('a[entityId]').click(function () {
        var clickedBtnID = $(this).attr('entityId');
        var id = $(this).attr('id');

        if (id == "delete_assignment_btn") {
            data = { id: clickedBtnID };
            doRequestWithData('DELETE', data, '/assignments');
        }
        if (id == "edit_assignment_btn") {
            var data = getCurrentAssignmentValues($("#" + clickedBtnID));
            $("#assignmentEditForm").hide()
            var $clone = $('#assignmentEditForm').clone()
            $clone.find("[fieldName=name_of_subject]").text(data.name_of_subject)
            $clone.find("[fieldName=title_of_assignment]").text(data.title_of_assignment)
            $clone.find("[fieldName=evaluation]").text(data.evaluation)
            $clone.find("[fieldName=file]").text(data.file)
            $clone.find("#post_assignment_btn")
                .attr("id", "update_assignment_btn")
                .attr('entityId', clickedBtnID);
            $("#" + clickedBtnID).replaceWith($clone.html())
        }

        if (id == "delete_development_btn") {
            data = { id: clickedBtnID };
            doRequestWithData('DELETE', data, '/development_plan');
        }
        if (id == "edit_development_btn") {
            var data = getCurrentDevelopmentValues($("#" + clickedBtnID));
            $("#developmentEditForm").hide()
            var $clone = $('#developmentEditForm').clone()
            $clone.find("[fieldName=what_do_i_need_to_learn]").text(data.what_do_i_need_to_learn)
            $clone.find("[fieldName=what_will_i_do_to_achieve_this]").text(data.what_will_i_do_to_achieve_this)
            $clone.find("[fieldName=what_resources_or_support_will_i_need]").text(data.what_resources_or_support_will_i_need)
            $clone.find("[fieldName=what_will_my_success_criteria_be]").text(data.what_will_my_success_criteria_be)
            $clone.find("[fieldName=target_dates_for_review_and_completion]").text(data.target_dates_for_review_and_completion)
            $clone.find("#post_development_plan_btn")
                .attr("id", "update_development_btn")
                .attr('entityId', clickedBtnID);
            $("#" + clickedBtnID).replaceWith($clone.html())
        }


        if (id == "delete_developmentRecords_btn") {
            data = { id: clickedBtnID };
            doRequestWithData('DELETE', data, '/development_record');
        }
        if (id == "edit_developmentRecords_btn") {
            var data = getCurrentDevelopmentRecordsValues($("#" + clickedBtnID));
            $("#developmentRecordsEditForm").hide()
            var $clone = $('#developmentRecordsEditForm').clone()
            $clone.find("[fieldName=key_dates]").text(data.key_dates)
            $clone.find("[fieldName=what_did_you_do]").text(data.what_did_you_do)
            $clone.find("[fieldName=why]").text(data.why)
            $clone.find("[fieldName=what_did_you_learn_from_this]").text(data.what_did_you_learn_from_this)
            $clone.find("[fieldName=how_will_you_use_this]").text(data.how_will_you_use_this)
            $clone.find("#post_development_record_btn")
                .attr("id", "update_developmentRecords_btn")
                .attr('entityId', clickedBtnID);
            $("#" + clickedBtnID).replaceWith($clone.html())
        }
    });

    $("#post_assignment_btn").click(function () {
        var data = getAssignmentData();
        doRequestWithData('POST', data, '/assignments');
    });
    $("#post_development_plan_btn").click(function () {
        var data = getDevelopmentData();
        doRequestWithData('POST', data, '/development_plan');
    });
    $("#post_development_record_btn").click(function () {
        var data = getDevelopmentRecordsData();
        doRequestWithData('POST', data, '/development_record');
    });
    $("#login_btn").click(function () {
        var data = {
            username: $("#username").val(),
            password: $("#password").val()
        }
        $.ajax({
            url: '/admin',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(data)
        })
    });
    $("#logout_btn").click(function () {
        $.ajax({
            url: '/logout',
            type: 'POST',
            contentType: 'application/json;charset=utf-8'
        })
    });
});