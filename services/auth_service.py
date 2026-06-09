from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate
from utils.security import get_password_hash, verify_password, create_access_token

def register_user(db: Session, user: UserCreate):
    if db.query(User).filter(User.email == user.email).first():
        return None, "Email already registered"
    if db.query(User).filter(User.username == user.username).first():
        return None, "Username already taken"
    hashed_pw = get_password_hash(user.password)
    db_user = User(username=user.username, email=user.email, hashed_password=hashed_pw)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user, None

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user

def create_user_token(user: User) -> dict:
    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}