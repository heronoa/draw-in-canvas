var chooseColor = document.querySelector('input.color'), currentColor = chooseColor.value, paintingArea = document.querySelector('#tela'), ctx = paintingArea.getContext('2d'), drawingMode = false, mouseX = 0, mouseY = 0, widthChose = document.querySelector('.lineWid'), lineWidth = parseInt(widthChose.value);
chooseColor.addEventListener('change', function () { return currentColor = chooseColor.value; });
widthChose.addEventListener('change', function () { return lineWidth = parseInt(widthChose.value); });
paintingArea.addEventListener('mousedown', function (e) {
    drawingMode = true;
    mouseX = e.pageX - paintingArea.offsetLeft;
    mouseY = e.pageY - paintingArea.offsetTop;
});
paintingArea.addEventListener('mousemove', function (e) {
    if (drawingMode)
        draw(e.pageX, e.pageY);
});
paintingArea.addEventListener('mouseup', function () { return drawingMode = false; });
document.querySelector('.clear').addEventListener('click', clearDraw);
function draw(x, y) {
    var pointX = x - paintingArea.offsetLeft, pointY = y - paintingArea.offsetTop;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = 'round';
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke();
    mouseX = pointX;
    mouseY = pointY;
}
function clearDraw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
