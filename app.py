from config import Config
from db import db, User, SwapRequest

from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='client/build', static_url_path='')

CORS(app)

# DataBase
app.config.from_object(Config)
db.init_app(app)

with app.app_context():
    db.create_all()

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

# API endpoint
@app.route('/api/hello')
def hello():
    return jsonify(message='Hello from Flask!')

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{
        'id': u.id,
        'name': u.name,
        'email': u.email,
        'skills_offered': u.skills_offered,
        'skills_requested': u.skills_requested
    } for u in users])

@app.route('/api/swap', methods=['POST'])
def create_swap():
    data = request.json
    new_swap = SwapRequest(
        requester_id=data['requester_id'],
        receiver_id=data['receiver_id'],
        skill_offered=data['skill_offered'],
        skill_requested=data['skill_requested']
    )
    db.session.add(new_swap)
    db.session.commit()
    return jsonify({'message': 'Swap created'})


if __name__ == '__main__':
    app.run(debug=True)
