let model;

const modelURL = 'http://localhost:5000/model';

const predict = async (modelURL) => {
    if (!model) model = await tf.loadLayersModel(modelURL);
}

predict(modelURL);

function resize(){
    return tf.browser.fromPixels(ctx.getImageData(0, 0, 400, 400), 4).resizeBilinear([28, 28]);
}

rFactor = tf.scalar(0.2989);
gFactor = tf.scalar(0.5870);
bFactor = tf.scalar(0.1140);

function do_processing(){
    var res = resize();
    r = res.slice([0,0,0], [res.shape[0], res.shape[1], 1]);
    g = res.slice([0,0,1], [res.shape[0], res.shape[1], 1]);
    b = res.slice([0,0,2], [res.shape[0], res.shape[1], 1]);

    gray = r.mul(rFactor).add(g.mul(gFactor)).add(b.mul(bFactor));
    gray = tf.reshape(gray, shape = [1, 28, 28, 1]);
    return gray;
}
        
function do_prediction(){
        var prediction = model.predict(do_processing());
        var label = prediction.argMax(axis = 1);
        return label.dataSync()[0];
}