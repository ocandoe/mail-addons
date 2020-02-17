/* Copyright 2016 x620 <https://github.com/x620>
 * Copyright 2016-2017 Ivan Yelizariev <https://it-projects.info/team/yelizariev>
 * Copyright 2017 Artyom Losev <https://it-projects.info/>
 * Copyright 2019 Artem Rafailov <https://it-projects.info/team/Ommo73/>
 * License MIT (https://opensource.org/licenses/MIT). */
odoo.define("mail_to.MailTo", function(require) {
    "use strict";

    var base_obj = require("mail_base.base");

    base_obj.MailTools.include({
        make_message: function(data) {
            var msg = this._super(data);
            msg.partner_ids = data.partner_ids;
            msg.channel_names = data.channel_names;
            msg.recipients = data.partner_ids.concat(data.channel_names);
            if (!msg.partner_ids && !msg.channel_names) {
                return msg;
            }

            var more_recipients = "";
            // Value which define more recipients
            msg.more_recipients_value = 4;
            for (var i = 0; i < msg.recipients.length; i++) {
                if (i >= msg.more_recipients_value) {
                    // Append names
                    more_recipients += msg.recipients[i][1];
                    // Separate them with semicolon
                    if (i < msg.recipients.length - 1) {
                        more_recipients += "; ";
                    }
                }
            }

            msg.more_recipients = more_recipients;
            return msg;
        },
    });
});
