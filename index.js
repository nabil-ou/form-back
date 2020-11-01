require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const api_key = process.env.MAILGUN_API_KEY; /* VOTRE CLÉ API */
const domain = process.env.MAILGUN_DOMAIN; /* VOTRE DOMAINE SANDBOX */
const mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

const app = express();

app.use(cors());
app.use(formidable());

app.get("/", (req, res) => {
  res.send("server is up!");
});

app.post("/", (req, res) => {
  const { firstname, lastname, email, subject, message } = req.fields;
  const data = {
    from: `${firstname} ${lastname} <${email}>`,
    to: "nabil.outaous@gmail.com",
    subject: subject,
    text: message,
  };
  /* ENVOI DE L'OBJET VIA MAILGUN */
  mailgun.messages().send(data, (error, body) => {
    if (!error) {
      return res.json(body);
    }
    res.status(401).json(error);
  });
});

app.listen(process.env.PORT, () => {
  console.log(" server started");
});
