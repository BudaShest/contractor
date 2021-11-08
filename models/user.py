def create_user_table():
    return """ CREATE TABLE "user" (
        "id"	INTEGER,
        "login"	TEXT NOT NULL UNIQUE,
        "password"	TEXT NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
    ) """


def insert_user():
    return """ INSERT INTO user (login, password) VALUES(:login, :password)"""


def get_user_by_login():
    return """ SELECT * FROM user WHERE login = :login"""
