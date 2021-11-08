def create_link():
    return """ INSERT INTO link (orig_url, short_url, text_url, creator_id, right_id) VALUES
    (:orig_url, :short_url, :text_url, :creator_id, :right_id)"""


def find_link_by_short_url():
    return """ SELECT * FROM link WHERE short_url = :short_url """


def find_link_by_text_url():
    return """ SELECT * FROM link WHERE text_url = :text_url """
