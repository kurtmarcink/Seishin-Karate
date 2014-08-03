$(function () {
    $('#submit').click(function(e) {
        var $contactForm = $('#contact-form'),
            spam = $("#foo").val(),
            email = $("#email").val(),
            name = $("#name").val(),
            phone = $("#phone").val(),
            message = $("#message").val()

        if ($contactForm[0].checkValidity() || $contactForm[0].validity.valid) {
            if ($.trim(spam) == null || $.trim(spam) == "") {
                var l = Ladda.create(this);
                l.start();
                $('#spam-alert').slideUp('400');
//                    TODO: change emails
                $.ajax(
                    {
                        type: "POST",
                        url: "https://mandrillapp.com/api/1.0/messages/send-template.json",
                        data: {
                            'key': '0yWpQRnDNFapqK4MXmIcSg',
                            "template_name": "contact-form-template",
                            "template_content": [
                                {
                                    "not": "used"
                                }
                            ],
                            'message': {
                                'from_email': email,
                                'from_name': name,
                                'headers': {
                                    'Reply-To': email
                                },
                                'to': [
                                    {
                                        'email': 'kurt.marcink@gmail.com',
                                        'name': 'Kurt Marcinkiewicz'
                                    }
                                ],
                                "global_merge_vars": [
                                    {
                                        "name": "NAME",
                                        "content": name
                                    },
                                    {
                                        "name": "PHONE",
                                        "content": phone
                                    },
                                    {
                                        "name": "EMAIL",
                                        "content": email
                                    },
                                    {
                                        "name": "MESSAGE",
                                        "content": message
                                    }
                                ]
                            }
                        }
                    })
                    .done(function (response) {
                        if (response[0].status == 'sent' || response.status == 'sent') {
                            $('#success-alert').hide().removeClass('hidden').slideDown('400');
                            $('#contact-form')[0].reset();
                            $("#name").val('');
                            $("#email").val('');
                            $("#phone").val('');
                            $("#message").val('');
                        }
                        else {
                            e.preventDefault();
                            $('#error-alert').hide().removeClass('hidden').slideDown('400');
                            l.stop();
                        }
                    })
                    .fail(function (response) {
                        e.preventDefault();
                        $('#error-alert').hide().removeClass('hidden').slideDown('400');
                        l.stop();
                    })
                    .always(function () {
                        l.stop();
                    });
                return false;
            }
            else {
                e.preventDefault();
                $('#spam-alert').hide().removeClass('hidden').slideDown('400')
                l.stop();
                return false;
            }
        }
    });

    $(".alert").find(".close").on("click", function (e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).closest(".alert").slideUp(400);
    });
});