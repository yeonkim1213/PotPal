import json
from db import db
from flask import Flask, request
from db import Item
from db import User
import users_dao
import datetime

app = Flask(__name__)
db_filename = "potpal.db"

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///%s" % db_filename
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True

db.init_app(app)
with app.app_context():
    db.create_all()

#generalized response formats
def success_response(data, code=200):
    return json.dumps(data), code

def failure_response(message, code=404):
    return json.dumps({"error": message}), code


def extract_token(request):
    """
    Helper function that extracts the token from the header of a request
    """
    auth_header = request.headers.get("Authorization")
    if auth_header is None:
        return False, failure_response("Missing auth header")
    
    bearer_token = auth_header.replace("Bearer", "").strip()
    if not bearer_token:
        return False, failure_response("Invalid auth header")
    
    return True, bearer_token


@app.route("/")
def hello_world():
    """
    Endpoint for printing Hello World!
    """
    return json.dumps({"message": "Hello, World!"})


# -- ITEM ROUTES ------------------------------------------------------
@app.route("/api/items/")
def get_items():
    """
    Endpoint for getting all items
    """
    items = [item.serialize() for item in Item.query.all()]
    return success_response({"items": items})

@app.route("/api/items/", methods=["POST"])
def create_item():
    """
    Endpoint for creating a new item
    """
    body = json.loads(request.data)

    name = body.get("name")
    description = body.get("description", "")
    price_per_day = body.get("price_per_day")
    transaction_start = body.get("transaction_start")
    transaction_end = body.get("transaction_end")

    if name is None:
        return failure_response("Please enter name of item", 400)
    if price_per_day is None:
        return failure_response("Please enter price of item per day", 400)
    if transaction_start is None or transaction_end is None:
        return failure_response("Please enter dates of transaction", 400)
    if transaction_start > transaction_end:
        return failure_response("Please enter valid dates of transaction", 400)

    new_item = Item(
        name = name,
        description = description,
        price_per_day = price_per_day,
        transaction_start = transaction_start,
        transaction_end = transaction_end
    )

    db.session.add(new_item)
    db.session.commit()
    return success_response(new_item.serialize(), 201)

@app.route("/api/items/<int:item_id>/")
def get_item(item_id):
    """
    Endpoint for getting an item by id
    """
    item = Item.query.filter_by(id=item_id).first()
    if item is None:
        return failure_response("Task not found")
    return success_response(item.serialize())

@app.route("/api/items/<int:item_id>/", methods=["POST"])
def update_item(item_id):
    """
    Endpoint for updatiing an item by id
    """
    body = json.loads(request.data)

    item = Item.query.filter_by(id=item_id).first()
    if item is None:
        return failure_response("Task not found")
    
    item.name = body.get("name", item.name)
    item.description = body.get("description", item.description)
    item.price_per_day = body.get("price_per_day", item.price_per_day)
    item.transaction_start = body.get("transaction_start", item.transaction_start)
    item.transaction_end = body.get("transaction_end", item.transaction_end)

    db.session.commit()
    return success_response(item.serialize())

@app.route("/api/items/<int:item_id>/", methods=["DELETE"])
def delete_item(item_id):
    """
    Endpoint for deleting an item by id
    """
    item = Item.query.filter_by(id=item_id).first()
    if item is None:
        return failure_response("Task not found")
    
    db.session.delete(item)
    db.session.commit()
    return success_response(item.serialize())


# -- USER ROUTES ------------------------------------------------------
@app.route("/api/users/")
def get_users():
    """
    Endpoint for getting all users
    """
    users = [u.serialize() for u in User.query.all()]
    return success_response({"users": users})

@app.route("/api/users/register/", methods=["POST"])
def create_user():
    """
    Endpoint for creating and registering a new user
    """
    body = json.loads(request.data)

    name = body.get("name")
    email = body.get("email")
    password = body.get("password")
    
    if name == "" or email == "" or password == "":
        return json.dumps(
            {
            "success": False,
            "message": "Missing required fields"
            }
        ), 400

    created, user = users_dao.create_user(name, email, password)
    if not created:
        return json.dumps(
        {
        "success": False,
        "message": "Account already exists"
        }
    )
    
    return json.dumps(
        {
        "success": True,
        "user": user.serialize(),
        "token": user.session_token
        }
    ), 201

@app.route("/api/users/<int:user_id>/")
def get_user(user_id):
    """
    Endpoint for getting a user by id
    """
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return failure_response("User not found")
    return success_response(user.serialize())

@app.route("/api/users/<int:user_id>/", methods=["POST"])
def update_user(user_id):
    """
    Endpoint for updating a user by id
    """
    body = json.loads(request.data)

    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return failure_response("User not found")
    
    user.name = body.get("name", user.name)

    db.session.commit()
    return success_response(user.serialize())

@app.route("/api/users/<int:user_id>/", methods=["DELETE"])
def delete_user(user_id):
    """
    Endpoint for deleting a user by id
    """
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return failure_response("User not found")
    
    db.session.delete(user)
    db.session.commit()
    return success_response(user.serialize())

@app.route("/api/items/<int:item_id>/user/", methods=["POST"])
def assign_user(item_id):
    """
    Endpoint for assigning a user to an item by id
    """
    item = Item.query.filter_by(id=item_id).first()
    if item is None:
        return failure_response("Item not found")
    
    body = json.loads(request.data)
    user_id = body.get("user_id")
    type = body.get("type")
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return failure_response("User not found")
    
    if type == "lender":
        item.lender.append(user)
    if type == "borrower":
        item.borrower.append(user)

    db.session.commit()
    return success_response(item.serialize())


# -- AUTHENTICATION ------------------------------------------------------
# @app.route("/register/", methods=["POST"])
# def register_account():
#     """
#     Endpoint for registering a new user
#     """
#     body = json.loads(request.data)
#     email = body.get("email")
#     password = body.get("password")

#     if email is None:
#         return failure_response("Invalid email")
#     if password is None:
#         return failure_response("Invalid password")
    
#     created, user = users_dao.create_user(email, password)

#     if not created:
#         return failure_response("User already exists")
    
#     return json.dumps(
#         {
#             "seesion token": user.session_token, 
#             "session_expiration": str(user.session_expiration),
#             "update_token": user.update_token,}
#     )

@app.route("/api/users/login/", methods=["POST"])
def login():
    """
    Endpoint for logging in a user
    """
    body = json.loads(request.data)
    email = body.get("email")
    password = body.get("password")

    if email == "" or password == "":
        return json.dumps(
            {
            "success": False,
            "message": "Missing required fields"
            }
        ), 400

    success, user = users_dao.verify_credentials(email, password)
    if not success:
        return json.dumps(
            {
            "success": False,
            "message": "Incorrect email or password"
            }
        ), 400

    return json.dumps(
        {
        "success": True,
        "user": user.serialize(),
        "token": user.session_token
        }
    )

@app.route("/api/users/session/", methods=["POST"])
def update_session():
    """
    Endpoint for updating a user's session
    """
    success, update_token = extract_token(request)
    if not success:
        return update_token
    
    user = users_dao.renew_session(update_token)
    if user is None:
        return failure_response("Invalid update token")
    
    return json.dumps(
        {
            "seesion token": user.session_token, 
            "session_expiration": str(user.session_expiration),
            "update_token": user.update_token
        }
    )
  
@app.route("/api/users/secret/", methods=["POST"])
def secret_message():
    """
    Endpoint for verifying a session token and returning a secret message
    """
    success, session_token = extract_token(request)
    if not success:
        return session_token
    
    user = users_dao.get_user_by_session_token(session_token)
    if user is None or not user.verify_session_token(session_token):
        return failure_response("Invalid session token")

    return json.dumps({"message": "Successfully implemented session token"})

@app.route("/api/users/logout/", methods=["POST"])
def logout():
    """
    Endpoint for logging out a user
    """
    success, session_token = extract_token(request)
    if not success:
        return session_token
    
    user = users_dao.get_user_by_session_token(session_token)
    if not user or not user.verify_session_token(session_token):
        return failure_response("Invalid session token", 400)
    
    user.session_expiration = datetime.datetime.now()
    db.session.commit()
    return success_response("User has successfully logged out")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
