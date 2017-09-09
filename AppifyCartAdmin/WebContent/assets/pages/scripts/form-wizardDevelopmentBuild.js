var FormWizard = function() {
    return {
        init: function() {
            function e(e) {
                return e.id ? "<img class='flag' src='../../assets/global/img/flags/" + e.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + e.text : e.text
            }
            if (jQuery().bootstrapWizard) {
                $("#country_list").select2({
                    placeholder: "Select",
                    allowClear: !0,
                    formatResult: e,
                    width: "auto",
                    formatSelection: e,
                    escapeMarkup: function(e) {
                        return e
                    }
                });
                var r = $("#submit_form"),
                    t = $(".alert-danger", r),
                    i = $(".alert-success", r);
                r.validate({
                    doNotHideMessage: !0,
                    errorElement: "span",
                    errorClass: "help-block help-block-error",
                    focusInvalid: !1,
                    rules: {
                        username: {
                            minlength: 5,
                            required: !0
                        },
                        store_website: {
                            required: !0
                        },
                        name_of_app: {
                            required: !0
                        },
                        store_api_key: {
                            required: !0
                        },
                        store_api_password: {
                            required: !0
                        },
                        passphrase: {
                            required: !0
                        },
                        androidAliasName: {
                            required: !0
                        },
                        appIconFile: {
                            required: !0
                        },
                        splashScreenFile: {
                            required: !0
                        },
                        bundleId: {
                            required: !0
                        },
                        iosCertificate: {
                            required: !0
                        },
                        androidKeyStore: {
                            required: !0
                        },
                        iosProvProfile: {
                            required: !0
                        },
                        password: {
                            minlength: 5,
                            required: !0
                        },
                        rpassword: {
                            minlength: 5,
                            required: !0,
                            equalTo: "#submit_form_password"
                        },
                        fullname: {
                            required: !0
                        },
                        email: {
                            required: !0,
                            email: !0
                        },
                        phone: {
                            required: !0
                        },
                        gender: {
                            required: !0
                        },
                        address: {
                            required: !0
                        },
                        city: {
                            required: !0
                        },
                        country: {
                            required: !0
                        },
                        card_name: {
                            required: !0
                        },
                        card_number: {
                            minlength: 16,
                            maxlength: 16,
                            required: !0
                        },
                        card_cvc: {
                            digits: !0,
                            required: !0,
                            minlength: 3,
                            maxlength: 4
                        },
                        card_expiry_date: {
                            required: !0
                        },
                        "payment[]": {
                            required: !0,
                            minlength: 1
                        }
                    },
                    messages: {
                        "payment[]": {
                            required: "Please select at least one option",
                            minlength: jQuery.validator.format("Please select at least one option")
                        }
                    },
                    errorPlacement: function(e, r) {
                        "gender" == r.attr("name") ? e.insertAfter("#form_gender_error") : "payment[]" == r.attr("name") ? e.insertAfter("#form_payment_error") : e.insertAfter(r)
                    },
                    invalidHandler: function(e, r) {
                        i.hide(), t.show(), App.scrollTo(t, -200)
                    },
                    highlight: function(e) {
                        $(e).closest(".form-group").removeClass("has-success").addClass("has-error")
                    },
                    unhighlight: function(e) {
                        $(e).closest(".form-group").removeClass("has-error")
                    },
                    success: function(e) {
                        "gender" == e.attr("for") || "payment[]" == e.attr("for") ? (e.closest(".form-group").removeClass("has-error").addClass("has-success"), e.remove()) : e.addClass("valid").closest(".form-group").removeClass("has-error").addClass("has-success")
                    },
                    submitHandler: function(e) {
                        i.show(), t.hide(), e[0].submit()
                    }
                });
                var a = function() {
                        $("#tab4 .form-control-static", r).each(function() {
                            var e = $('[name="' + $(this).attr("data-display") + '"]', r);
                            if (e.is(":radio") && (e = $('[name="' + $(this).attr("data-display") + '"]:checked', r)), e.is(":text") || e.is("textarea")) $(this).html(e.val());
                            else if (e.is("select")) $(this).html(e.find("option:selected").text());
                            else if (e.is(":radio") && e.is(":checked")) $(this).html(e.attr("data-title"));
                            else if ("payment[]" == $(this).attr("data-display")) {
                                var t = [];
                                $('[name="payment[]"]:checked', r).each(function() {
                                    t.push($(this).attr("data-title"))
                                }), $(this).html(t.join("<br>"))
                            }
                        })
                    },
                    o = function(e, r, t) {
                        var i = r.find("li").length,
                            o = t + 1;
                        $(".step-title", $("#form_wizard_1")).text("Step " + (t + 1) + " of " + i), jQuery("li", $("#form_wizard_1")).removeClass("done");
                        for (var s = r.find("li"), n = 0; n < t; n++) jQuery(s[n]).addClass("done");
                        1 == o ? $("#form_wizard_1").find(".button-previous").hide() : $("#form_wizard_1").find(".button-previous").show(), o >= i ? ($("#form_wizard_1").find(".button-next").hide(), $("#form_wizard_1").find(".button-submit").show(), a()) : ($("#form_wizard_1").find(".button-next").show(), $("#form_wizard_1").find(".button-submit").hide()), App.scrollTo($(".page-title"))
                    };
                $("#form_wizard_1").bootstrapWizard({
                    nextSelector: ".button-next",
                    previousSelector: ".button-previous",
                    onTabClick: function(e, r, t, i) {
                        return !1
                    },
                    onNext: function(e, a, s) {
                        return i.hide(), t.hide(), 0 != r.valid() && void o(e, a, s)
                    },
                    onPrevious: function(e, r, a) {
                        i.hide(), t.hide(), o(e, r, a)
                    },
                    onTabShow: function(e, r, t) {
                        var i = r.find("li").length,
                            a = t + 1,
                            o = a / i * 100;
                        $("#form_wizard_1").find(".progress-bar").css({
                            width: o + "%"
                        })
                    }
                }), $("#form_wizard_1").find(".button-previous").hide(), $("#form_wizard_1 .button-submit").click(function() {}).hide(), $("#country_list", r).change(function() {
                    r.validate().element($(this))
                })
            }
        }
    }
}();
jQuery(document).ready(function() {
    FormWizard.init()
});