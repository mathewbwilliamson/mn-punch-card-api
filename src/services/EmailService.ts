export const sendEmailForBuyingProduct = async (orderMessage: any) => {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log('\x1b[41m%s \x1b[0m', '[matt] orderMessage', orderMessage);
    const msg = {
        to: 'slidergs@gmail.com',
        from: 'Reward Cabinet <email-sender@newtamparewardcabinet.com>',
        subject: 'This is the subject',
        html: '<strong>I like this HTML</strong> but maybe this will work too!',
    };

    sgMail.send(msg);
    return 'success';
};
