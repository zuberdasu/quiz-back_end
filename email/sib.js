//setup to use SendinBlue SDK
const SibApiV3Sdk = require("sib-api-v3-sdk");
let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SIB_API_KEY;

//function to construct and send email
function sendEmail(toAddress, subject, content) {
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = `<html><body>${content}</body></html>`;
  sendSmtpEmail.sender = {
    name: "GCSE Computer Science",
    email: "zuberdasu@yahoo.co.uk",
  };
  sendSmtpEmail.to = [{ email: toAddress, name: toAddress }];

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log(data);
    },
    function (error) {
      console.log(error);
    }
  );
}

module.exports = sendEmail;
