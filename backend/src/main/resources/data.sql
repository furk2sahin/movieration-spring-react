insert into USERS(id, birth_date, create_date, email, is_enabled, gender, last_update_date, name, nickname, password, surname, username, role)
values (1, '1999-01-01', now(), 'movieration@movieration', true, 'MALE', null, 'Movieration', 'Movieration',
        '$2a$10$Wu9299b7jdWl85QiuXIkz.NTO8iRNg61uOI2EMGksIgRtcjU1BOme', 'Movieration', 'movieration', 'ADMIN');

        /*
            Default Admin: movieration
            Default Password: admin
        */

insert into categories(id, genre) VALUES (1, 'HORROR'), (2, 'COMEDY'), (3, 'ADVENTURE'),
                                         (4, 'ANIMATION'), (5, 'DOCUMENTARY'), (6, 'FANTASY'),
                                         (7, 'SCI-FI'), (8, 'WAR/DRAMA'), (9, 'ROMANTIC'),
                                         (10, 'HISTORY'),(11, 'ACTION'), (12, 'CRIME');

insert into emotions(id, emotion) VALUES (1, 'HAPPY'), (2, 'SAD'), (3, 'ANGRY'),
                                         (4, 'SURPRISED'), (5, 'CALM'), (6, 'FEAR');

insert into category_emotions(emotion_id, category_id) values
(1, 2), (1, 3), (1, 4), (1, 6), (1, 9),(1, 7),
(2, 2), (2, 3), (2, 4), (2, 6), (2, 11),
(3, 8), (3, 10), (3, 12), (3, 7),
(4, 5), (4, 6), (4, 3), (4, 12), (4, 7),
(5, 5), (5, 1), (5, 12), (5, 10),
(6, 1), (6, 2), (6, 7), (6, 8);
