function setup() {
    createCanvas(800, 800);
    background(0);
    noLoop();

    let angleContainer = createDiv("Angle:");
    angleContainer.addClass("container");
    angleSlider = createSlider(0, TWO_PI, PI/4, 0.01);
    angleSlider.addClass("sliders");
    angleContainer.child(angleSlider);

    let sizeContainer = createDiv("Zoom:");
    sizeContainer.addClass("container");
    sizeSlider = createSlider(50, 500, 100, 10);
    sizeSlider.addClass("sliders");
    sizeContainer.child(sizeSlider);

    let branchContainer = createDiv("Branches:");
    branchContainer.addClass("container");
    branchSlider = createSlider(0.4, 0.8, 0.6, .01);
    branchSlider.addClass("sliders");
    branchContainer.child(branchSlider);

    branchSlider.input(redraw);
    angleSlider.input(redraw);
    sizeSlider.input(redraw);
}

function draw() {

    background(0);
    let length = sizeSlider.value();
    let angle = angleSlider.value();
    let offset = branchSlider.value();
    stroke(255);
    translate(width/2, height)
    drawLine(angle, length, offset);
}

function drawLine(angle, length, offset) {

    if (length > 5) {
        line(0, 0, 0, -length);
        translate(0, -length);
        push();
        rotate(angle);
        drawLine(angle, length * offset, offset)
        pop();
        push();
        rotate(-angle);
        drawLine(angle, length * offset, offset)
        pop();
    }   

}