export default {
    "mailOptions": {
        "from": "renan.shaolin.25@gmail.com",
        "to": "",
        "cc": "",
        "bcc": "",
        "subject": "Contrato de locação",
        "text": "",
        "attachments": [
            { "filename": "Contrato.PNG", "path": "src/resources/files/contract/contract.PNG" }
        ],
        "template": "contract",
        "context": { "token": "" }
    }, 
    "hbsOptions": {
        "viewEngine": {
            "extName": ".html",
            "partialsDir": "./src/resources/mail/",
            "layoutsDir": "./src/resources/mail/contract/",
            "defaultLayout": "contract.html"
        },
        "viewPath": "./src/resources/mail/contract/",
        "extName": ".html"
    }
};
