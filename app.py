from flask import Flask, send_from_directory, jsonify
import os

app = Flask(__name__, static_folder='client/build', static_url_path='')

# Serve the React app (index.html)
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

# Catch-all route for React BrowserRouter paths
@app.route('/<path:path>')
def serve_react_app(path):
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

# Example API endpoint
@app.route('/api/hello')
def hello():
    return jsonify(message='Hello from Flask!')

if __name__ == '__main__':
    app.run(debug=True)
