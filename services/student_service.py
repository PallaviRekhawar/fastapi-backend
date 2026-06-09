from sqlalchemy.orm import Session
from models import Student
from schemas import StudentCreate, StudentUpdate

def get_students(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(Student).filter(Student.user_id == user_id).offset(skip).limit(limit).all()

def get_student(db: Session, student_id: int, user_id: int):
    return db.query(Student).filter(Student.id == student_id, Student.user_id == user_id).first()

def create_student(db: Session, student: StudentCreate, user_id: int):
    db_student = Student(**student.model_dump(), user_id=user_id)
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

def update_student(db: Session, student_id: int, student: StudentUpdate, user_id: int):
    db_student = get_student(db, student_id, user_id)
    if not db_student:
        return None
    for key, value in student.model_dump(exclude_unset=True).items():
        setattr(db_student, key, value)
    db.commit()
    db.refresh(db_student)
    return db_student

def delete_student(db: Session, student_id: int, user_id: int):
    db_student = get_student(db, student_id, user_id)
    if not db_student:
        return None
    db.delete(db_student)
    db.commit()
    return db_student
