#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
import sys
import pandas as pd
# Local imports
from config import app, db, api
from models import Book, User, Post, MyBook


# Views go here!
class SignUp(Resource):
    def post(self):
        print(session)
        username = request.get_json()['username']
        password = request.get_json()['password']
        image_url = request.get_json()['image_url']
        bio = request.get_json()['bio']
        if username:

            new_user = User(username=username, image_url=image_url, bio=bio)
            new_user.password_hash = password

            db.session.add(new_user)
            db.session.commit()

            session['user_id'] = new_user.id
            return new_user.to_dict(), 201
        return {"error": "422 Unprocessable entity"}, 422 

class CheckSession(Resource):
    def get(self):
        print(session)
        id = session.get('user_id')
        user = User.query.filter(User.id == id).first()
        if session.get('user_id'):
            return user.to_dict(), 200
        return {"error": "401 Unauthorized"}, 401

class LogIn(Resource):
    def post(self):
        print(session)
        username= request.get_json()['username']
        password = request.get_json()['password']
        user = User.query.filter_by(username =username).first()

        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
        return {"error": "401 unauthorized"}, 401

class LogOut(Resource):
    def delete(self):
        print(session)
        
        # print(user)
        id = session.get('user_id')
        user = User.query.filter_by(id = id).first()
        print(user)
        if user:
            print('into this section')
            session['user_id'] = None
            print(session)
            return {}, 204
            print(session)
        # else:
        #     return {'error': '401 Unauthorized'}

class MyBookIndex(Resource):
    def get (self):
        print(session)
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            print(user.books)
            return [book.to_dict() for book in user.books], 200
        return {'error': '401 Unauthorized'}, 401
    def post (self):
        # if session.get('user.id'):
        print(session)
        request_json = request.get_json()
        book_id=request.get_json()["book_id"]
        user_id=request.get_json()["user_id"]

        new_my_book=MyBook(book_id=book_id, user_id=user_id)

        db.session.add(new_my_book)
        db.session.commit()
# USE MORE PRINT STATEMENTS IN THE BACKEND TO SEE WHATS GOING ON
# MAKE SURE SESSION IS HOLDING
# FIX ROUTING
# FIX BOOK OBJ GETTING SENT TO MYBOOKINDEX COMPONENT
# WHEN SHOULD I USE CHECK SESSION?

        return new_my_book.to_dict(), 201

        # return {'error': '401 Unauthorized'}, 401

class BookIndex(Resource):
    def get(self):
        print(session)
        books = Book.query.all()
        print(books)
        # print(f"{type(book)=}")
        # print(f"{book=} ")
        # # sys.exit(1) 
        # print(f"{dir(book)=}") 
        # print(f"{book.__dict__=}")
        # return [{"title": book.title} for book in books], 200
        
        return [book.to_dict() for book in books], 200
        
        # ['<Book: law>', '<Book: order>']
        # [
        #     {
        #         'title': 'law',
        #         'author_first_name': 'Lauren'
        #     }
        # ]
        


class ThisBook(Resource):
    def get (self, id):
        print(session)
        book = Book.query.filter(Book.id == id).first()
        return book.to_dict(), 200
    def get (self, id):
        print(session)
        posts = Post.query.filter(Post.book_id == id).all()
        return [post.to_dict() for post in posts], 200
    def post (self, id):
        print(session)
        if session.get('user.id'):
            request_json = request.get_json()
            post_content = request_json['post_content']

            try:
                post = Post( post_content=post_content, book_id=book_id, user_id=user_id)
                db.session.add(post)
                db.session.commit()
                return post.to_dict(), 201
            except IntegrityError:
                return {'error': '422 Unprocessable Entity'}, 422
        return {'error': '401 Unauthorized'}, 401



api.add_resource(SignUp, '/api/sign_up', endpoint='sign_up')
api.add_resource(CheckSession, '/api/check_session', endpoint='check_session')
api.add_resource(LogIn, '/api/log_in', endpoint = 'log_in')
api.add_resource(LogOut, '/api/log_out', endpoint = 'log_out')
api.add_resource(MyBookIndex, '/api/my_book_index', endpoint = 'my_book_index')
api.add_resource(BookIndex, '/api/book_index', endpoint ='book_index')
api.add_resource(ThisBook, '/api/book_index/<int:id>', endpoint = 'id')

if __name__ == '__main__':
    app.run(port=5555, debug=True)



# check session seems to not be working properly...bc of state? or something else?
# add in create book to BookIndex