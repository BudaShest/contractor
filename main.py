from models.db_worker_abs import DataWorker
import models.user as user
import models.links as link
import json

import bcrypt
from flask import Flask
from flask import jsonify
from flask import request
from flask import redirect
from flask import abort
from flask_cors import CORS, cross_origin
from flask import render_template
from flask import url_for

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'qazwsxedc'
jwt = JWTManager(app)
CORS(app)

dataWorker = DataWorker()


###---------Служебные страницы----------------------------------------------------------

@app.route('/register_page', methods=['GET'])
def register_page():
    return render_template('register.html')


@app.route('/', methods=['GET'])
def home_page():
    return render_template('index.html')


@app.route('/main_page', methods=['GET'])
@jwt_required()
def main_page():
    return render_template('main.html')


@app.route('/login_page', methods=['GET'])
def login_page():
    return render_template('login.html')


###----------Регистрация и авторизация---------------------------------------------------

@app.route('/register', methods=['POST'])
def register():
    dataWorker.set_connection('local-db/contractor.db')
    print(request.data)
    request_dict = json.loads(request.data)
    login = request_dict.get('login', None)
    password = request_dict.get('password', None)

    hashed_pass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(10))
    res = dataWorker.create_query(user.insert_user(), {'login': login, 'password': hashed_pass})
    if res:
        return jsonify({"msg": "Успешно зарегистрирован"}), 201
    else:
        return jsonify({"msg": "Ошибка регистраци"}), 400


@app.route('/login', methods=['POST'])
def login():
    dataWorker.set_connection('local-db/contractor.db')

    request_dict = json.loads(request.data)
    login = request_dict.get('login', None)
    password = request_dict.get('password', None)

    current_user = dataWorker.get_one_query(user.get_user_by_login(), {"login": login})
    if current_user and bcrypt.checkpw(password.encode('utf-8'), current_user[2]):
        access_token = create_access_token(identity={"id": current_user[0], "login": current_user[1]})
        return jsonify({"token": access_token}), 200
    else:
        return jsonify({"msg": 'Нерпавильный логин или пароль!'}), 401


###----------Работа с ссылками---------------------------------------------------
@jwt_required()
def check_protected():
    current_user = get_jwt_identity()
    if current_user is not None:
        return True
    else:
        return False


@jwt_required()
def check_private(creator_id):
    current_user = get_jwt_identity()
    if current_user is not None:
        if current_user.get('id') == creator_id:
            return True
        else:
            return False
    else:
        return False


@app.route('/create', methods=['POST'])
@jwt_required()
def create_link():
    current_user = get_jwt_identity()

    if current_user.get('id', None) is not None:
        dataWorker.set_connection('local-db/contractor.db')
        orig_url = request.json.get('orig_url')
        short_url = request.json.get('short_url')
        text_url = request.json.get('text_url')
        creator_id = current_user.get('id')
        right_id = request.json.get('right_id')

    if current_user.get('msg', None) is None:
        res = dataWorker.create_query(link.create_link(),
                                      {"orig_url": orig_url, "short_url": short_url, "text_url": text_url,
                                       "creator_id": creator_id, "right_id": right_id})
        if res:
            return jsonify({"msg": "Ссылка созданна успешно"}), 201
        else:
            return jsonify({"msg": "Ошибка создания ссылки"}), 400
    else:
        return jsonify({"msg": 'Ошибка авторизации'}), 401


@app.route('/<short_url>', methods=['GET'])
def redirect_to(short_url):
    dataWorker.set_connection('local-db/contractor.db')

    url = dataWorker.get_one_query(link.find_link_by_text_url(), {"text_url": short_url})
    if url is None:
        url = dataWorker.get_one_query(link.find_link_by_short_url(), {"short_url": short_url})
        print("Нет имени(")

    if url:
        creator_id = url[3]
        right_id = url[4]
        if right_id == 1:
            return redirect(url[1])
        elif right_id == 2:
            if check_protected():
                return redirect(url[1])
            else:
                return redirect('https://google.com')
        elif right_id == 3:
            if check_private(creator_id):
                return redirect(url[1])
            else:
                return redirect('https://google.com')

    else:
        print('Нет ссылки(')
        return jsonify({"msg": "Ссылка не существует! =((((("}), 404


if __name__ == '__main__':
    app.run()
