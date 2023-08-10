from flask_sqlalchemy import SQLAlchemy

import datetime
import hashlib
import os
import bcrypt

# import base64
# import boto3
# import datetime
# import io
# from io import BytesIO
# from mimetypes import guess_extension, guess_type
# import os
# from PIL import Image
# import random
# import re
# import string

db = SQLAlchemy()

EXTENSIONS = ["png", "gif", "jpg", "jpeg"]
BASE_DIR = os.getcwd()
S3_BUCKET_NAME = os.environ.get("S3_BUCKET_NAME")
S3_BASE_URL = f"https://{S3_BUCKET_NAME}.s3.us-east-1.amazonaws.com"


association_table_l = db.Table(
  "association_l",
  db.Column("lent_item_id", db.Integer, db.ForeignKey("item.id")),
  db.Column("lender_id", db.Integer, db.ForeignKey("user.id"))
)

association_table_b = db.Table(
  "association_b",
  db.Column("borrowed_item_id", db.Integer, db.ForeignKey("item.id")),
  db.Column("borrower_id", db.Integer, db.ForeignKey("user.id"))
)

class Item(db.Model):
  """
  Item model
  """
  __tablename__ = "item"
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String, nullable=False)
  description = db.Column(db.String, nullable=True)
  price_per_day = db.Column(db.Float, nullable=False)
  transaction_start = db.Column(db.Integer, nullable=False)
  transaction_end = db.Column(db.Integer, nullable=False)

  lender = db.relationship("User", secondary=association_table_l, back_populates="items_lent")
  borrower = db.relationship("User", secondary=association_table_b, back_populates="items_borrowed")


  def __init__(self, **kwargs):
    """
    Initializes a Item object
    """
    self.name = kwargs.get("name", "")
    self.description = kwargs.get("description", "")
    self.price_per_day = kwargs.get("price_per_day", "")
    self.transaction_start = kwargs.get("transaction_start", "")
    self.transaction_end = kwargs.get("transaction_end", "")

  def serialize(self):
    """
    Serializes a Item object
    """
    lender_lst = [l.simple_serialize() for l in self.lender]
    lender = lender_lst[-1] if len(lender_lst) > 0 else None

    borrower_lst = [b.simple_serialize() for b in self.borrower]
    borrower = borrower_lst[-1] if len(borrower_lst) > 0 else None

    return {
      "id": self.id,
      "name": self.name,
      "description": self.description,
      "price_per_day": self.price_per_day,
      "transaction_start": self.transaction_start,
      "transaction_end": self.transaction_end,
      "lender": lender,
      "borrower": borrower
    }

  def lender_serialize(self):
    """
    Serializes a Item object
    """
    borrower_lst = [b.simple_serialize() for b in self.borrower]
    borrower = borrower_lst[0] if len(borrower_lst) > 0 else None

    return {
      "id": self.id,
      "name": self.name,
      "description": self.description,
      "price_per_day": self.price_per_day,
      "transaction_start": self.transaction_start,
      "transaction_end": self.transaction_end,
      "borrower": borrower
    }
  
  def borrower_serialize(self):
    """
    Serializes a Item object
    """
    lender_lst = [l.simple_serialize() for l in self.lender]
    lender = lender_lst[0] if len(lender_lst) > 0 else None

    return {
      "id": self.id,
      "name": self.name,
      "description": self.description,
      "price_per_day": self.price_per_day,
      "transaction_start": self.transaction_start,
      "transaction_end": self.transaction_end,
      "lender": lender
    }


class User(db.Model):
  """
  User model
  """
  __tablename__ = "user"
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)

  items_lent = db.relationship("Item", secondary=association_table_l, back_populates="lender")
  items_borrowed = db.relationship("Item", secondary=association_table_b, back_populates="borrower")

  # User information
  email = db.Column(db.String, nullable=False, unique=True)
  password_digest = db.Column(db.String, nullable=False)

  # Session information
  session_token = db.Column(db.String, nullable=False, unique=True)
  session_expiration = db.Column(db.DateTime, nullable=False)
  update_token = db.Column(db.String, nullable=False, unique=True)

  def __init__(self, **kwargs):
    """
    Initializes a User object
    """
    self.name = kwargs.get("name", "")
    self.email = kwargs.get("email", "")
    self.password_digest = bcrypt.hashpw(kwargs.get("password").encode("utf8"), bcrypt.gensalt(rounds=13))
    self.renew_session()

  def serialize(self):
    """
    Serializes a User object
    """
    return {
      "id": self.id,
      "name": self.name,
      "email": self.email,
      "items_lent": [i.lender_serialize() for i in self.items_lent],
      "items_borrowed": [i.borrower_serialize() for i in self.items_borrowed]
    }
  
  def simple_serialize(self):
    """
    Serializes a User object without the items field
    """  
    return {
      "id": self.id,
      "name": self.name,
      "email": self.email
    }

  def _urlsafe_base_64(self):
    """
    Randomly generates hashed tokens (used for session/update tokens)
    """
    return hashlib.sha1(os.urandom(64)).hexdigest()

  def renew_session(self):
    """
    Renews the sessions, i.e.
    1. Creates a new session token
    2. Sets the expiration time of the session to be a day from now
    3. Creates a new update token
    """
    self.session_token = self._urlsafe_base_64()
    self.session_expiration = datetime.datetime.now() + datetime.timedelta(days=1)
    self.update_token = self._urlsafe_base_64()

  def verify_password(self, password):
    """
    Verifies the password of a user
    """
    return bcrypt.checkpw(password.encode("utf8"), self.password_digest)

  def verify_session_token(self, session_token):
    """
    Verifies the session token of a user
    """
    return session_token == self.session_token and datetime.datetime.now() < self.session_expiration

  def verify_update_token(self, update_token):
    """
    Verifies the update token of a user
    """
    return update_token == self.update_token
  

class Asset(db.Model):
  """
  Asset model
  """
  __tablename__ = "assets"
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  base_url = db.Column(db.String, nullable=True)
  salt = db.Column(db.String, nullable=False)
  extension = db.Column(db.String, nullable=False)
  width = db.Column(db.Integer, nullable=False)
  height = db.Column(db.Integer, nullable=False)
  created_at = db.Column(db.DateTime, nullable=False)

  def __init__(self, **kwargs):
    """
    Intializes an Asset object
    """

    self.create(kwargs.get("image_data"))