from config import Config
from db import db, User, SwapRequest

from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS
import os

from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

import jwt
import datetime
from functools import wraps

from flask_mail import Mail, Message
import random
import hashlib

email_otps = {}

def send_otp_email(to_email, otp):
    msg = Message(
        subject="Your OTP Code",
        sender=app.config['MAIL_USERNAME'],
        recipients=[to_email],
        body=f"Your verification OTP is: {otp}"
    )
    mail.send(msg)


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.get(data['user_id'])
        except:
            return jsonify({'error': 'Invalid token!'}), 403

        return f(current_user, *args, **kwargs)
    return decorated

def admin_required(f):
    @wraps(f)
    @token_required
    def decorated(current_user, *args, **kwargs):
        if not current_user.is_admin:
            return jsonify({'error': 'Admin access required'}), 403
        return f(current_user, *args, **kwargs)
    return decorated

app = Flask(__name__, static_folder='client/build', static_url_path='')

# Route to request OTP
@app.route('/api/request-otp', methods=['POST'])
def request_otp():
    data = request.json
    email = data['email']

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 400

    otp = random.randint(100000, 999999)
    email_otps[email] = otp
    send_otp_email(email, otp)
    return jsonify({'message': 'OTP sent'})


CORS(app)

# DataBase
app.config.from_object(Config)
db.init_app(app)

# Mail
mail = Mail(app)

with app.app_context():
    db.create_all()

    # Insert dummy users
    users_data = [
        {"name": "Farhan", "email": "farhan@example.com", "password": "1234", "skills_offered": "JavaScript", "skills_requested": "Python", "rating": 3.9, "is_verified":True, "is_admin": True},
        {"name": "Aisha", "email": "aisha@example.com", "password": "1234", "skills_offered": "React", "skills_requested": "Node.js", "rating": 4.2, "is_verified":True},
        {"name": "Om", "email": "om@example.com", "password": "1234", "skills_offered": "Python", "skills_requested": "Node.js", "rating": 4.2, "is_verified":True, "is_admin": True},
        {"name": "Rahul", "email": "rahul@example.com", "password": "1234", "skills_offered": "Java", "skills_requested": "Node.js", "rating": 4.2, "is_verified":True}
    ]

    for u in users_data:
        if not User.query.filter_by(email=u["email"]).first():
            db.session.add(User(
                name=u["name"],
                email=u["email"],
                password=generate_password_hash(u["password"]),
                rating=u["rating"],
                skills_offered=u["skills_offered"],
                skills_requested=u["skills_requested"]
            ))
    db.session.commit()

# Serve the React app (index.html)
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

# # Catch-all route for React BrowserRouter paths
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

# API endpoint
@app.route('/api/hello')
def hello():
    return jsonify(message='Hello from Flask!')

def generate_color_from_text(text):
    hash_digest = hashlib.md5(text.encode()).hexdigest()
    r = int(hash_digest[0:2], 16)
    g = int(hash_digest[2:4], 16)
    b = int(hash_digest[4:6], 16)
    r = max(100, r)
    g = max(100, g)
    b = max(100, b)
    return f"rgb({r % 256}, {g % 256}, {b % 256})"

def generate_svg_avatar(name, color):
    initials = name[0].upper()
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
        <rect width="100%" height="100%" fill="{color}"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="32" fill="white">{initials}</text>
    </svg>'''
    return f"data:image/svg+xml;utf8,{svg}"

@app.route('/api/users', methods=['GET'])
# @token_required
def get_users():
    users = User.query.all()
    data = []
    for user in users:
        color = generate_color_from_text(user.email)
        avatar_svg = generate_svg_avatar(user.name, color)
        data.append({
            'id': user.id,
            'pp': avatar_svg,
            'name': user.name,
            'skill': user.skills_offered,
            'skillneeded': user.skills_requested,
            'isbuttonreq': True,
            'rating': user.rating,
        })
    return jsonify(data)

# API to get a specific user's data
@app.route('/api/user/<int:user_id>', methods=['GET'])
# @token_required
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({
        'id': user.id,
        'name': user.name,
        # 'email': user.email,
        'skills_offered': user.skills_offered,
        'skills_requested': user.skills_requested,
        'rating': user.rating,
        'availability': user.availability or '',  # reuse this field if no dedicated availability
        'location': user.location or '',  # placeholder if not in DB
        'visibility': 'Private' if user.private else 'Public'
    })

# API to update user data
@app.route('/api/user/update/<int:user_id>', methods=['PUT'])
# @token_required
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.json
    user.name = data.get('name', user.name)
    user.skills_offered = data.get('skills_offered', user.skills_offered)
    user.skills_requested = data.get('skills_requested', user.skills_requested)
    user.availability = data.get('availability', user.availability)
    user.location = data.get('location', user.location)
    if 'private' in data:
        user.visibility = 'Private' if data['private'] else 'Public'
    db.session.commit()
    # You can add user.availability = data.get('availability') here if that field exists in DB
    db.session.commit()
    return jsonify({'message': 'User updated'})

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

@app.route('/api/admin', methods=['GET'])
@admin_required
def admin():
    return jsonify(message='Hello Admin!')

# Register a new user
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    email = data['email']
    entered_otp = data.get('otp')

    if email not in email_otps or str(email_otps[email]) != str(entered_otp):
        return jsonify({'error': 'Invalid or expired OTP'}), 400

    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        name=data['name'],
        email=email,
        password=hashed_password,
        skills_offered=data.get('skills_offered', ''),
        skills_requested=data.get('skills_requested', ''),
        rating=data.get('rating', 0.0),
        is_verified=True
    )
    db.session.add(new_user)
    db.session.commit()
    del email_otps[email]
    return jsonify({'message': 'User registered'})

# Login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'error': 'Invalid email or password'}), 401
    if not user.is_verified:
        return jsonify({'error': 'Email not verified'}), 403

    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=2)
    }, app.config['SECRET_KEY'], algorithm="HS256")

    return jsonify({
        'message': 'Login successful',
        'token': token,
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'skills_offered': user.skills_offered,
            'skills_requested': user.skills_requested,
            'rating': user.rating,
            'is_admin': user.is_admin
        }
    })


if __name__ == '__main__':
    app.run(debug=True)
