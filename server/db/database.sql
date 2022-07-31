create TABLE user(
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    password VARCHAR(255)
);

create TABLE post(
    id SERIAL PRIMARY KEY,
    date_posted DATE
);

create TABLE post_content(
    post_id INTEGER,
    FOREIGN KEY (post_id) REFERENCES post (id),
    title VARCHAR(255),
    post_text VARCHAR(255),
    post_image VARCHAR(255)
);

create TABLE comment(
    id SERIAL PRIMARY KEY,
    post_id INTEGER,
    FOREIGN KEY (post_id) REFERENCES post (id),
    comment_text VARCHAR,
    author_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES "user" (id)
);

create TABLE "like"(
    id SERIAL PRIMARY KEY,
    post_id INTEGER,
    FOREIGN KEY (post_id) REFERENCES post (id),
    author_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES "user" (id)
);