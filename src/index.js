import screenfull from 'screenfull';
// console.log(screenfull);

function init() {
    // init info div for debub
    var infoDiv = document.createElement('DIV');
    infoDiv.style.position = 'absolute';
    infoDiv.style.left = '0px';
    infoDiv.style.top = '20px';
    infoDiv.style.width = '100%';
    infoDiv.style.zIndex = '100';

    var infoText = "info div: ";
    infoText += " width : " + window.innerWidth;
    infoText += " height : " + window.innerHeight;
    infoText += " DPI : ";
    var infoNode = document.createTextNode(infoText);


    infoDiv.appendChild(infoNode);

    document.body.appendChild(infoDiv);

    // init screen full toggle button
    var btn = document.createElement('BUTTON');
    btn.innerHTML = "[sreen full]";
    btn.style.position = 'absolute';
    btn.style.left = '0px';
    btn.style.top = '0px';
    btn.addEventListener('click', function() {
        // screenfull.request();
        screenfull.toggle();
    });

    document.body.appendChild(btn);

}
window.onload = function() {
    init();
}();