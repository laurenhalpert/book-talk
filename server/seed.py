#!/usr/bin/env python3

# Standard library imports
from random import random, randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Post, Book, MyBook

from flask import session 
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker

# engine = create_engine('sqlite:///book_talk.db')
# Session = sessionmaker(bind=engine)
# session = Session()

def delete_records():
    db.session.query(Post).delete()
    db.session.query(Book).delete()
    db.session.query(User).delete()
    db.session.query(MyBook).delete()
    db.session.commit()


fake = Faker()

genres = ['Romance', 'Mystery', 'Thriller', 'Horror', 'SciFi', 'Fantasy', 'Historical Fiction', 'Biography', 'Poetry', 'Adventure']

def create_records():
    books = [
        Book(
            title = fake.unique.word(),
            author_first_name = fake.first_name(),
            author_last_name = fake.last_name(),
            genre = rc(genres),
            book_image = fake.unique.image_url(),
            description = fake.paragraph(nb_sentences=5)
        ) for i in range(100)
    ]
    posts = [
        Post(
            post_content = fake.sentence(),
            likes = randint(0, 10),
            user_id = randint(1, 500),
            book_id = randint(1, 100)

        ) for i in range(800)
    ]
    users =[
        User(
            username = fake.unique.first_name(),
            # password_hash = fake.color(),
            image_url = fake.image_url(),
            bio = fake.text()
        ) for i in range (500)
    ]
    for user in users:
        user.password_hash=fake.color()

    
    my_books = [
        MyBook(
            user_id = randint(1, 500),
            book_id = randint(1, 100)
        ) for i in range (1000)
    ]
    db.session.add_all(books + posts + users + my_books)
    db.session.commit()
    return books, posts, users, my_books

def relate_records(posts, books, users, my_books):
    for post in posts:
        post.book = rc(books)
        post.user = rc(users)
    
    for my_book in my_books:
        my_book.book = rc(books)
        my_book.user = rc(users)

   

    db.session.add_all(books + posts + users + my_books)
    db.session.commit()



if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        delete_records()
        users, books, posts, my_books = create_records()
        relate_records(users, books, posts, my_books)