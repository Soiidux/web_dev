const http = require("http");

const server = http.createServer(function (req, res) {
    console.log("Incoming request....");
    console.log(req.method);
    console.log(req.url);
    switch (req.method){
        case 'GET':
            {
                if(req.url === '/') return res.end("Homepage");
                if(req.url === '/contact-us') return res.end("Contact Us Page");
                if(req.url === '/about-us') return res.end("About Us Page");
            }
        case 'POST':
            {
                if(req.url === '/login') return res.end("Login Page")
            }
    }
    res.end("Here is your response");
});

server.listen(4000, () => {
    console.log("Server started at port 4000");
});
