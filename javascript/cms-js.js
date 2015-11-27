var modifiedStatus = null;
var fieldName = null;

(function ($) {

    $.entwine(function ($) {

        // Once the TinyMCE editor has loaded, add a save button to the fullscreen editor window
        $('#mce_fullscreen_toolbar3').entwine({
            onmatch: function () {
                var $input = $('<div id="ajax-save-wrap"><input id="ajax-content-save" type="button" value="Save" ' +
                    'style="margin-left: 60px;margin-bottom: 5px;" ' +
                    'class="action ss-ui-alternate ui-button ui-widget ui-state-default ui-button-text-icon-primary ss-ui-action-constructive ss-ui-button" />' +
                    '<span id="ajax-saved-at" style="padding: 5px 10px;margin-left: 10px;"></span></div>');
                var container = $('#mce_fullscreen_toolbar3 tr');
                $input.appendTo(container);
            }
        });
    });

    // Entering Fullscreen:
    $('body').on('click', $('.mceButton.mceButtonEnabled.mce_fullscreen'), function (e) {

        // detect form field to be edited
        var parent = $(e.target).closest('div.field.htmleditor');
        fieldName = parent.find('textarea.htmleditor').attr('name');

        // detect and store whether the CMS is in a 'changed' state
        if ($('form.cms-edit-form').hasClass('changed')) {
            modifiedStatus = 'changed';
        } else {
            modifiedStatus = null;
        }
    })

    // Exiting Fullscreen: Detect and store whether the CMS is in a 'changed' state
    $('body').on('click', '#Form_EditForm_Content_fullscreen', function () {

        if (modifiedStatus == 'changed') {
            if ($('form.cms-edit-form').hasClass('changed')) {
                modifiedStatus = 'changed';
            } else {
                modifiedStatus = null;
            }
        } else {
            $('form.cms-edit-form').removeClass('changed');
        }
    })

    // Send the content of the tinyMCE editor to the custom controller
    $('body').on('click', '#ajax-content-save', function (e) {

        $('#ajax-save-wrap').append('<img id="ajax-waiting" style="vertical-align: middle;" src="themes/dia-theme/images/waiting.gif">');

        var pageID = document.getElementById("Form_EditForm_ID").value;
        var content = tinyMCE.get("mce_fullscreen").getContent(); // get the content

        var request = $.ajax({
            url: $('base').attr('href') + "CustomController/ajaxSaveContent",
            type: 'POST',
            data: {
                'id': pageID,
                'text': content,
                'field': fieldName

            },
            success: function (result) {

                if (result == true) {

                    var now = new Date(Date.now());
                    var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

                    $('#ajax-waiting').remove();
                    $('#ajax-saved-at').html('Saved at: ' + formatted);

                    if (modifiedStatus == 'changed') {
                        if ($('form.cms-edit-form').hasClass('changed')) {
                        }
                        else {
                            $('form.cms-edit-form').addClass('changed');
                        }
                    } else {
                        $('form.cms-edit-form').removeClass('changed');
                    }
                } else {
                    $('#ajax-waiting').remove();
                    $('#ajax-saved-at').html('');
                    alert('Failed to save!\n\nPlease check your edit permissions with an administrator.');
                }
            },
            failure: function () {
                $('#ajax-waiting').remove();
                alert("Failed to save... please use the main save button");
            }
        });
        e.preventDefault;

    });

    window.onbeforeunload = function (e) {
        var form = $('.cms-edit-form');
        form.trigger('beforesubmitform');
        if (form.is('.changed')) return ss.i18n._t('LeftAndMain.CONFIRMUNSAVEDSHORT');
    };

})(jQuery);

