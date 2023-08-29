
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates, relationship, backref, sessionmaker
from config import db, bcrypt
# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.associationproxy import association_proxy

# engine = create_engine('sqlite:///book_talk.db')
# Session = sessionmaker(bind=engine)
# session = Session()


# Base = declarative_base()


class Book (db.Model, SerializerMixin):
    __tablename__="books"

    serialize_rules = ('-users',)

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String)
    author_first_name = db.Column(db.String)
    author_last_name = db.Column(db.String)
    genre = db.Column(db.String)
    book_image = db.Column(db.String)
    description = db.Column(db.String)

    
    posts = db.relationship('Post', backref='book')
    users = association_proxy('posts', 'user', creator=lambda ur: Post(user=ur))
    

    # def to_dict(self):
    #     return {
    #         "id": self.id,
    #         "title": self.title,
    #         "author_first_name": self.author_first_name,
    #         "author_last_name": self.author_last_name,
    #         "genre": self.genre,
    #         "book_image": self.book_image,
    #         "description": self.description
    #     }
    def __repr__(self):
        return f'<Book: {self.title} >'

class Post (db.Model, SerializerMixin):
    __tablename__='posts'
    serialize_rules = ('-book', '-user',)
    id = db.Column(db.Integer, primary_key = True)
    post_content = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))

    

    # def to_dict(self):
    #     return {
    #         "id": self.id,
    #         "post_content": self.post_content,
    #         "user_id": self.user_id,
    #         "book_id": self.book_id
    #     }
    
    def __repr__(self):
        return f'<Post: {self.id}>'

class User (db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-_password_hash', 'books', '-my_books.id')
    # serialize_rules = ('-books.user', '-user.books', '-posts.book', '-posts.user')
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, unique = True, nullable=False)
    _password_hash = db.Column(db.String)
    image_url = db.Column(db.String)
    bio = db.Column(db.String)

    
    posts = db.relationship('Post', backref='user')
    my_books = db.relationship('MyBook', backref='user')
    books = association_proxy('posts', 'book', creator = lambda bk: Post(book = bk))
    # right now dog.books is nothing because books is related through posts...maybe I can relate through MyBooks? That'd also require me to properly set up the MyBook relationship

    # @validates('username')
    # def validate_user(self, username):
    #     if not User.query.filter_by('username'==username).first():
    #         raise ValueError('Username does not exist. Please enter a valid username or create an account')
    #     elif not username:
    #         raise ValueError('Please enter a username or create and account.')
    #     else:
    #         return username
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.username} >'

class MyBook(db.Model, SerializerMixin):
    __tablename__ = 'my_books'
    serialize_rules = ('-book', '-user')
    id = db.Column(db.Integer, primary_key = True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # def to_dict(self):
    #     return {
    #         "id": self.id,
    #         "book_id": self.book_id,
    #         "user_id": self.user_id,
    #     }

    def __repr__(self):
        return f'<MyBook {self.id}>'

# try different serialize rules to stop the looping