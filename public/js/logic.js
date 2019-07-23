$(document).ready(function () {
    $("#post_assignment_btn").click(function () {
        var data = {
            name_of_subject: $("#post_assignment_1").val(),
            title_of_assignment: $("#post_assignment_2").val(),
            evaluation: $("#post_assignment_3").val(),
            file: $("#post_assignment_4").val()
        }
        $.ajax({
            url: '/assignments',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(data),
            success: function () {
                location.reload();
            }
        })
    });
    $("#post_development_plan_btn").click(function () {
        var data = {
            what_do_i_need_to_learn: $("#post_development_plan_1").val(),
            what_will_i_do_to_achieve_this: $("#post_development_plan_2").val(),
            what_resources_or_support_will_i_need: $("#post_development_plan_3").val(),
            what_will_my_success_criteria_be: $("#post_development_plan_4").val(),
            target_dates_for_review_and_completion: $("#post_development_plan_5").val()
        }
        $.ajax({
            url: '/development_plan',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(data),
            success: function () {
                location.reload();
            }
        })
    });
    $("#post_development_record_btn").click(function () {
        var data = {
            key_dates: $("#post_development_record_1").val(),
            what_did_you_do: $("#post_development_record_2").val(),
            why: $("#post_development_record_3").val(),
            what_did_you_learn_from_this: $("#post_development_record_4").val(),
            how_will_you_use_this: $("#post_development_record_5").val()
        }
        $.ajax({
            url: '/development_record',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(data),
            success: function () {
                location.reload();
            }
        })
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