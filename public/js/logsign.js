
var middlePart = document.getElementsByClassName('way')[0];
var firstPart = document.getElementsByClassName('main_left')[0];
var finalPart = document.getElementsByClassName('main_right')[0];

function dclick(e) {

    if (e.textContent == "signup") {
        middlePart.classList.add('pull');
        firstPart.classList.add('hid');
        finalPart.classList.add('dis');
        e.textContent = "login";
    } else {
        e.textContent = "signup";
        middlePart.classList.remove('pull');
        firstPart.classList.remove('hid');
        finalPart.classList.remove('dis');
    }
}
