import sqlite3


class DataWorker:
    __connection = None

    def set_connection(self, db_name):
        try:
            if isinstance(db_name, str):
                self.__connection = sqlite3.connect(db_name)
            else:
                raise Exception('Неверное имя базы данных!')
        except sqlite3.Error as error:
            print(error)

    def create_query(self, query_str, data_dict):
        cursor = None
        try:
            if self.__connection is not None:
                cursor = self.__connection.cursor()
                results = cursor.execute(query_str, data_dict)
                self.__connection.commit()
                return results
        except sqlite3.Error as error:
            print(error)
        finally:
            cursor.close()

    def get_many_query(self, query_str, data_dict):
        cursor = None
        try:
            if self.__connection is not None:
                cursor = self.__connection.cursor()
                cursor.execute(query_str, data_dict)
                results = cursor.fetchall()
                return results
        except sqlite3.Error as error:
            print(error)
        finally:
            cursor.close()

    def get_one_query(self, query_str, data_dict):
        cursor = None
        try:
            if self.__connection is not None:
                cursor = self.__connection.cursor()
                cursor.execute(query_str, data_dict)
                results = cursor.fetchone()
                return results
        except sqlite3.Error as error:
            print(error)
        finally:
            cursor.close()
