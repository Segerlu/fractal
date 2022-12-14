function setup() {
    createCanvas(windowWidth*.99, windowHeight*.75);
    background(0);
    noLoop();

    let angleContainer = createDiv("Angle:");
    angleContainer.addClass("container");
    angleSlider = createSlider(0, TWO_PI, PI / 4, 0.01);
    angleSlider.addClass("inputs");
    angleContainer.child(angleSlider);

    let sizeContainer = createDiv("Zoom:");
    sizeContainer.addClass("container");
    sizeSlider = createSlider(50, 500, 100, 10);
    sizeSlider.addClass("inputs");
    sizeContainer.child(sizeSlider);

    let branchContainer = createDiv("Branches:");
    branchContainer.addClass("container");
    branchSlider = createSlider(0.4, 0.75, 0.6, .01);
    branchSlider.addClass("inputs");
    branchContainer.child(branchSlider);

    let radioContainer = createDiv("Which way do you want to tree to lean?");
    radioContainer.addClass("container");
    lean = createRadio();
    // lean.addClass("inputs");
    lean.option('left');
    lean.option('center');
    lean.option('right');
    lean.style('width', '800px');
    radioContainer.child(lean);

    let inputs = selectAll(".inputs");

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].input(redraw);
        // console.log(inputs[i]);
    }
    lean.input(redraw);
}        

function draw() {

    background(0);
    let length = sizeSlider.value();
    let angle = angleSlider.value();
    let offset = branchSlider.value();
    stroke(255);
    translate(width / 2, height)
    drawLine(angle, length, offset);
}

function drawLine(angle, length, offset) {

    if (length > 3) {
        line(0, 0, 0, -length);
        translate(0, -length);

        push();
        if (lean.value() === "left") {
            rotate(angle / 2);
        } else {
            rotate(angle);
        }
        drawLine(angle, length * offset, offset)
        pop();

        push();
        if (lean.value() === "right") {
            rotate(-angle / 2);
        } else {
            rotate(-angle);
        }
        drawLine(angle, length * offset, offset)
        pop();
    }

}

function windowResized() {
    createCanvas(windowWidth*.99, windowHeight*.75);
    redraw();
}