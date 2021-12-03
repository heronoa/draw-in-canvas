/* BRIEFING:
- WHEN THE MOUSE DOWN IS ACTIVE SO IS THE DRAWING MODE;
- WHEN THE MOUSE MOVE ON ADN THE DRAWING MODE IS ACTIVE THEN DRAW.
- WHEN THE MOUSE UP DEACTIVE THE DRAWING MODE;
*/

// INITIAL DATA
let chooseColor = document.querySelector('input.color') as HTMLInputElement, 
currentColor = chooseColor.value, 
paintingArea: HTMLCanvasElement = document.querySelector('#tela'),
ctx = paintingArea.getContext('2d'),
drawingMode = false,
mouseX = 0,
mouseY = 0,
widthChose:HTMLInputElement = document.querySelector('.lineWid'),
lineWidth:number = parseInt(widthChose.value);


// EVENTS
chooseColor.addEventListener('change', () => currentColor = chooseColor.value)

widthChose.addEventListener('change', () => lineWidth = parseInt(widthChose.value) )



paintingArea.addEventListener('mousedown', (e)=>{
    drawingMode = true
    mouseX = e.pageX - paintingArea.offsetLeft;
    mouseY = e.pageY - paintingArea.offsetTop; 
});

paintingArea.addEventListener('mousemove', (e)=>{
    if(drawingMode)
        draw(e.pageX, e.pageY);
});

paintingArea.addEventListener('mouseup', ()=>drawingMode = false);

document.querySelectorAll('.mybtn')[0].addEventListener('click', clearDraw);

document.querySelectorAll('.mybtn')[1].addEventListener('click', downloadCanvas)

//FUNCTIONS


    /* THE EVENT LISTENER GIVES TO US THE POSITION OF THE MOUSE IN ALL PAGE, BUT WE NEED THE
    POSITION ON THE CANVAS SO WE NEED TO COMPESATE THAT */

function draw(x:number, y:number) {
    let pointX = x - paintingArea.offsetLeft,
    pointY = y - paintingArea.offsetTop;

    // Draw
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
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
}

function downloadCanvas() {
    const a = document.createElement('a')
    let url = paintingArea.toDataURL('image/png');
    a.href = url
    a.download = url.split('/').pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
