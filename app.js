const express = require('express');
const request = require('request');
const app = express();
const myPort = process.env.PORT;
const https = require('https');

//This is for using static files such as images and external stylesheets that are on locl
app.use(express.static("Public"));

//Body parser deprecated, now as a native built in tool
app.use(express.urlencoded({ extended: true }));


//Getting information to the server from belowe directory
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/pages/signup.html`)
})

app.post('/', (req, res) => {
    // console.log(req.body.name);
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };
    const 

    jsonData = JSON.stringify(data)

    const url = `https://us6.api.mailchimp.com/3.0/lists/${YOUR_ID}`; // Here goes your mailchimp ID

    const options = {
        method: "POST",
        auth: `anystring:${YOUR_API_KEY}` //Here goes your api key
    }

    const request = https.request(url, options, (response) => {
        response.on("data", (data) => {
            if (response.statusCode === 200) {
                res.sendFile(`${__dirname}/pages/success.html`)
            } else {
                res.sendFile(`${__dirname}/pages/failure.html`)
            }
        })
    })

    request.write(jsonData);
    request.end();
});

app.post("/goBack", (req, res) => {
    res.redirect("/");
})

//To run the port used listen app.listen method
app.listen(myPort || 3000, () => {
    console.log(`Server is running on port number: ${myPort}`);
})
