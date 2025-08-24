import { NewOrder } from '../types/productTypes';
import { adminUsersForEmails } from '../config/mainUserInformation';
import { mailApiDomain, mailApiKey } from '../config/envImports';
import Mailgun from "mailgun.js"
import FormData from "form-data";


export const sendEmailForBuyingProduct = async (newOrder: NewOrder) => {
    try {
        const mailgun = new Mailgun(FormData);
        const mg = mailgun.client({
            username: "api",
            key: mailApiKey
        });
    
        const msg = {
            to: adminUsersForEmails.map((user) => user.email),
            from: 'Reward Cabinet <email-sender@newtamparewardcabinet.com>',
            subject: `Reward Cabinet Order: ${newOrder.order.firstNameOfChild}`,
            html: `<strong>Reward Cabinet Order</strong><br />
            Child's First Name: ${newOrder.order.firstNameOfChild}<br />
            Child's Last Name: ${newOrder.order.lastNameOfChild}<br />
            Parent's First Name: ${newOrder.order.firstNameOfParent}<br />
            Parent's Last Name: ${newOrder.order.lastNameOfParent}<br />
            Email Address of Parent: ${newOrder.order.emailAddressOfParent}<br />
            <br />
            Street Address: ${newOrder.order.streetAddress}<br />
            City: ${newOrder.order.city}<br />
            State: ${newOrder.order.state}<br />
            Zip Code: ${newOrder.order.zipCode}<br />
            <br />
            <strong>Product Info</strong><br />
            Title: ${newOrder.product.title}<br />
            Amazon Title: ${newOrder.product.amazonTitle}<br />
            ASIN: ${newOrder.product.asin}<br />
            Price: ${newOrder.product.price}<br />
            Reward Card Price: ${newOrder.product.rewardCardPrice}<br />
            Link: <a href=${newOrder.product.link}>To Product</a><br />
            `,
        };
    
        const data = await mg.messages.create(mailApiDomain, {
            from: "Mailgun Sandbox <postmaster@sandbox21bd50bb72ac4ac78cbf19535d0508a5.mailgun.org>",
            to: ["Matt Williamson <mathnasiumntdb3@gmail.com>"],
            subject: "Hello Matt Williamson",
            text: "Congratulations Matt Williamson, you just sent an email with Mailgun! You are truly awesome!",
            });

        console.log(data); // logs response data
        return 'success';
    } catch (err) {
        console.error("There was an error sending the email.", err);
        return 'Failure';
    }
};
