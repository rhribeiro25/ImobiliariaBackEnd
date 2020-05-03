export default {
    mailOptions: {
        from: "renan.shaolin.25@gmail.com",
        to: "",
        cc: "",
        bcc: "",
        subject: "Recuperação de senha",
        text: "",
        template: "forgotPassword",
        context: { "token": "" }
    }, 
    hbsOptions: {
        viewEngine: {
            extName: ".html",
            partialsDir: "./src/resources/mail/",
            layoutsDir: "./src/resources/mail/auth/",
            defaultLayout: "forgotPassword.html"
        },
        viewPath: "./src/resources/mail/auth/",
        extName: ".html"
    }
};
