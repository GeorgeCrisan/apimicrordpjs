let express = require('express');
let path = require('path');
let moment = require('moment');
let app = express();
let emptyresponse = {
    unix: null,
    natural: null
}




app.use(express.static(path.join(__dirname, 'views')));

app.get('/favicon.ico', (req, res) => {
    res.send('404');
});

app.get('/:dateQ', (req, res) => {
    let unix = null;
    let natural = null;

    let parameters = req.params.dateQ;

    let testfirst = /^[^a-zA-Z]/g.test(parameters);

    if (testfirst) {
        console.log('is unix');
        unix = Number(parameters);
        natural = moment.utc(unix * 1000).format('MMM D, YYYY');
        if (natural === "Invalid date")
            natural = null;

        res.send(JSON.stringify({
            unix: unix,
            natural: natural
        }));

    } else {

        if (moment.utc(parameters, 'MMMM D,YYYY').isValid()) {

            console.log('here format valid');

            natural = parameters;

            unix = Number(moment.utc(natural, 'MMMM D,YYYY').format('X'));

            console.log(natural + 'men that date has passed ');

            if (isNaN(natural[natural.length - 1])) {

                console.log('format has passed but with wrong format');
                unix = null;
                natural = null;
                res.send({
                    unix: unix,
                    natural: natural
    
                });

                return false;
            }


            res.send(JSON.stringify({
            unix: unix,
            natural: natural
        }));
        } else {

            unix = null;
            natural = null;
            res.send(JSON.stringify({
            unix: unix,
            natural: natural
        }));
        }
    }




});


app.listen(process.env.PORT || 8080);
