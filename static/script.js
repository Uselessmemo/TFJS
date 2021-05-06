const pred_containers = document.getElementsByClassName("prediction");

var last_pred = -1;

console.log(predicted);

function render_prediction(predicted) {
    if (predicted != -1) {
        pred_containers[predicted].classList.toggle('active-prediction');
    }

    if (last_pred != -1) {
        pred_containers[last_pred].classList.toggle('active-prediction');
    }

    last_pred = predicted;
}

const clear_button = document.getElementById("clear-button");

clear_button.addEventListener('click', () => {
    predicted = -1;
    last_pred = -1;
    for (i = 0; i < 10; i++) {
        pred_containers[i].classList.remove('active-prediction');
    }
    ctx.clearRect(0, 0, 400, 400);
    canvas_repr.src = canvas.toDataURL();
})