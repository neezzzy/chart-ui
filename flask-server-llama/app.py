import subprocess
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def llama_handler():
    # Access the environment variable
    LLAMA_MAIN = os.getenv("LLAMA_MAIN")
    LLAMA_MODEL_PATH = os.getenv("LLAMA_MODEL_PATH")

    model_input = request.args.get('text', '')
    command = [LLAMA_MAIN, '-m', LLAMA_MODEL_PATH,
               '-b', '10', '-p', model_input]
    try:
        process = subprocess.Popen(command, stdout=subprocess.PIPE)
        output, _ = process.communicate()
        # Convert bytes to string and remove trailing whitespace
        output = output.decode().strip()

        response_data = {
            'input': model_input,
            'output': output
        }

        return jsonify(response_data)

    except subprocess.CalledProcessError:
        return jsonify({'error': 'Internal Server Error'}), 500


if __name__ == '__main__':
    app.run(port=8080)
