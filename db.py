from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    rating = db.Column(db.Float, default=0.0)
    skills_offered = db.Column(db.Text)
    skills_requested = db.Column(db.Text)
    is_admin = db.Column(db.Boolean, default=False)

class SwapRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    requester_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    skill_offered = db.Column(db.String(100))
    skill_requested = db.Column(db.String(100))
    status = db.Column(db.String(20), default='pending')