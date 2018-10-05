console.log("hello world hi there");


window.onload = function() {

    var toogleScreen = false;
    var infoDiv = document.createElement('DIV');
    var infoText = "info div: ";
    var infoNode = document.createTextNode(infoText);

    infoDiv.appendChild(infoNode);

    var btn = document.createElement("BUTTON");
    btn.innerHTML = "btn";
    btn.addEventListener('click', function() {
        toogleScreen = !toogleScreen;
        if (toogleScreen) {
            screenfull.exit();
        } else {
            screenfull.request();

        }

    })

    document.body.appendChild(infoDiv);
    document.body.appendChild(btn);



}();