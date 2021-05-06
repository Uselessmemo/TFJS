from flask import Flask ,json, jsonify, send_from_directory
from flask.templating import render_template
from flask_cors import CORS, cross_origin

template_dir = '.'

app = Flask(__name__, template_folder=template_dir)
CORS(app)

@app.route('/', methods=["GET"])
@cross_origin()
def main():
    return render_template('index.html')

@app.route('/model')
def model():
    json_data = json.load(open("./model/model.json"))
    return jsonify(json_data)

@app.route('/<path:path>')
def load_shards(path):
    return send_from_directory('model', path)

if __name__ == "__main__":
    app.run()