
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# Student schemas
class StudentCreate(BaseModel):
    name: str
    email: str
    course: str

class StudentUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    course: Optional[str] = None

class StudentResponse(BaseModel):
    id: int
    name: str
    email: str
    course: str
    created_at: datetime

    class Config:
        from_attributes = True

# User schemas
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: str
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
