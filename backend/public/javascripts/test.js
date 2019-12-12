function getTestData() {
    var req = new XMLHttpRequest();
    req.open('GET', '/test');
    req.addEventListener('load', function(event) {
        console.log(event.target.response);
    });
    req.send();
}