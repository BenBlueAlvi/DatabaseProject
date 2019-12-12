var loginbutton = document.getElementById('login');

function tryLogin(){
    var req = new XMLHttpRequest();
    req.open('POST', '/auth');
    req.body = {username:'hello', password: 'test!'};
    req.addEventListener('load', function(event) {
        console.log(event.target.response);
    });
    req.send({username:'Hello', password:'at'});
}

loginbutton.addEventListener('click', tryLogin);