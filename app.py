from config import Config
from db import db, User, SwapRequest

from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS
import os

from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

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

@app.route('/api/user/<int:user_id>/swaps', methods=['GET'])
def get_user_swaps(user_id):
    sent = SwapRequest.query.filter_by(requester_id=user_id).all()
    received = SwapRequest.query.filter_by(receiver_id=user_id).all()
    return jsonify({
        'sent': [{
            'id': s.id, 'receiver_id': s.receiver_id,
            'skill_offered': s.skill_offered,
            'skill_requested': s.skill_requested,
            'status': s.status
        } for s in sent],
        'received': [{
            'id': s.id, 'requester_id': s.requester_id,
            'skill_offered': s.skill_offered,
            'skill_requested': s.skill_requested,
            'status': s.status
        } for s in received]
    })

# Register a new user
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 400

    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        name=data['name'],
        email=data['email'],
        password=hashed_password,  # In production, hash this!
        skills_offered=data.get('skills_offered', ''),
        skills_requested=data.get('skills_requested', '')
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered', 'user_id': new_user.id})

# Login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email'], password=data['password']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'error': 'Invalid email or password'}), 401
    return jsonify({
        'message': 'Login successful',
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'skills_offered': user.skills_offered,
            'skills_requested': user.skills_requested
        }
    })


if __name__ == '__main__':
    app.run(debug=True)
