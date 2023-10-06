#!/usr/bin/env python3


from flask import request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
import sys
import pandas as pd

from config import app, db, api
from models import Book, User, Post, MyBook



class SignUp(Resource):
    def post(self):
        
        username = request.get_json()['username']
        password = request.get_json()['password']
        image_url = request.get_json()['image_url']
        bio = request.get_json()['bio']
        
        if username:
            try:
                new_user = User(username=username, image_url=image_url, bio=bio)
                new_user.password_hash = password

                db.session.add(new_user)
                db.session.commit()

                session['user_id'] = new_user.id
                return new_user.to_dict(), 201
            except: 
                
                return {"error": "username not unique"}, 422
        
        return {"error": "422 Unprocessable entity"}, 422 

class CheckSession(Resource):
    def get(self):
        
        id = session.get('user_id')
        user = User.query.filter(User.id == id).first()
        if session.get('user_id'):
            return user.to_dict(), 200
        return {"error": "401 Unauthorized"}, 401

class LogIn(Resource):
    def post(self):
        
        username= request.get_json()['username']
        password = request.get_json()['password']
        

        user = User.query.filter_by(username =username).first()

        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
        return {"error": "401 unauthorized"}, 401
    def get(self):
        
        user = User.query.filter_by(id=session['user_id']).first()
        return user.to_dict(), 200


class LogOut(Resource):
    def delete(self):
        
        id = session.get('user_id')
        user = User.query.filter_by(id = id).first()
        
        if user:
            
            session['user_id'] = None
            
            return {}, 204
   

class MyBookIndex(Resource):
    def get (self):
        
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            
            return [book.to_dict() for book in user.books], 200
        return {'error': '401 Unauthorized'}, 401
    def post (self):
        
        request_json = request.get_json()
        book_id=request.get_json()["book_id"]
        user_id=request.get_json()["user_id"]

        new_my_book=MyBook(book_id=book_id, user_id=user_id)

        db.session.add(new_my_book)
        db.session.commit()


        return new_my_book.to_dict(), 201
class ThisMyBook(Resource):
    def get (self, my_id):
        
        book = Book.query.filter(Book.id == my_id).first()
        return book.to_dict(), 200
    def get (self, my_id):
        
        posts = Post.query.filter(Post.book_id == my_id).all()
        return [post.to_dict() for post in posts], 200
    def post (self, my_id):
       
        if session.get('user_id'):
            request_json = request.get_json()
            post_content = request_json['post_content']
            likes = request_json['likes']
            try:
                post = Post( post_content=post_content, likes=likes, book_id=my_id, user_id=session.get('user_id'))
                db.session.add(post)
                db.session.commit()
                return post.to_dict(), 201
            except IntegrityError:
                return {'error': '422 Unprocessable Entity'}, 422
        return {'error': '401 Unauthorized'}, 401
    def delete (self, my_id):
        
        book = MyBook.query.filter_by(book_id = my_id, user_id = session.get('user_id')).first()
        
        db.session.delete(book)
        db.session.commit()
        return {}, 204
        


class ThisMyBookPost(Resource):
    def patch(self, my_id, my_post_id):
        
        
        post = Post.query.filter(Post.id == my_post_id).first()
        
        post.likes += 1
        
       
        db.session.add(post)
        db.session.commit()

        return post.to_dict(), 201
    def delete(self, my_id, my_post_id):
       
        post = Post.query.filter(Post.id == my_post_id).first()

        db.session.delete(post)
        db.session.commit()
        return {}, 204
        

class BookIndex(Resource):
    def get(self):
        
        books = Book.query.all()
      
        
        return [book.to_dict() for book in books], 200
        
        
    def post(self):
        
        title= request.get_json()['title']
        author_first_name = request.get_json()['author_first_name']
        author_last_name = request.get_json()['author_last_name']
        genre = request.get_json()['genre']
        book_image = request.get_json()['book_image']
        description = request.get_json()['description']
        
        
        try:
            book = Book( title=title, author_first_name=author_first_name, author_last_name=author_last_name, genre=genre, book_image=book_image, description=description)
            db.session.add(book)
            db.session.commit()
            return book.to_dict(), 201
        except IntegrityError:
            return {'error': '422 Unprocessable Entity'}, 422
        return {'error': '401 Unauthorized'}, 401

        
        


class ThisBook(Resource):
    def get (self, id):
        
        book = Book.query.filter(Book.id == id).first()
        return book.to_dict(), 200
    def get (self, id):
        
        posts = Post.query.filter(Post.book_id == id).all()
        return [post.to_dict() for post in posts], 200
    def post (self, id):
        
        if session.get('user_id'):
            request_json = request.get_json()
            post_content = request_json['post_content']
            likes = request_json['likes']
            try:
                post = Post( post_content=post_content, likes=likes, book_id=id, user_id=session.get('user_id'))
                db.session.add(post)
                db.session.commit()
                return post.to_dict(), 201
            except IntegrityError:
                return {'error': '422 Unprocessable Entity'}, 422
        return {'error': '401 Unauthorized'}, 401
class ThisBookPost (Resource):
    def patch(self, id, post_id):
        
        post = Post.query.filter(Post.id == post_id).first()
        
        post.likes += 1
        
       
        db.session.add(post)
        db.session.commit()

        return post.to_dict(), 201
    def delete(self, id, post_id):
        
        post = Post.query.filter(Post.id == post_id).first()

        db.session.delete(post)
        db.session.commit()
        return {}, 204


# route: /api/book_posts/<int:n>
# get all books that have n or more number of posts 
# class BookPosts (Resource):
#     def get (self, n):
#         books= Book.query.all()
#         filtered_books = filter(lambda book: len(book.posts) >= n, books)
#         return [book.to_dict() for book in filtered_books], 200
#         # for (let i = 0, i< len(books), )
#         # for book in books:
#         #     if len(book.posts) >= n:
#         #         print(len(book.posts))
#         #     return book.to_dict(), 200
#         # books = Book.query.filter(len(Book.posts) >= n).all()
#         # return [book.to_dict() for book in books], 200


api.add_resource(SignUp, '/api/sign_up', endpoint='sign_up')
api.add_resource(CheckSession, '/api/check_session', endpoint='check_session')
api.add_resource(LogIn, '/api/log_in', endpoint = 'log_in')
api.add_resource(LogOut, '/api/log_out', endpoint = 'log_out')
api.add_resource(MyBookIndex, '/api/my_book_index', endpoint = 'my_book_index')
api.add_resource(ThisMyBook, '/api/my_book_index/<int:my_id>', endpoint ='my_id')
api.add_resource(ThisMyBookPost, '/api/my_book_index/<int:my_id>/<int:my_post_id>', endpoint = 'my_post_id')
api.add_resource(BookIndex, '/api/book_index', endpoint ='book_index')
api.add_resource(ThisBook, '/api/book_index/<int:id>', endpoint = 'id')
api.add_resource(ThisBookPost, '/api/book_index/<int:id>/<int:post_id>', endpoint = 'post_id')
# api.add_resource(BookPosts, '/api/book_posts/<int:n>', endpoint="n")


if __name__ == '__main__':
    app.run(port=5555, debug=True)

