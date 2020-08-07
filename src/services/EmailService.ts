export const sendEmailForBuyingProduct = async () => {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: 'slidergs@gmail.com',
        from: 'Reward Cabinet <email-sender@newtamparewardcabinet.com>',
        subject: 'This is the subject',
        html: '<strong>I like this HTML</strong> but maybe this will work too!',
    };

    sgMail.send(msg);
    return 'success';
};
