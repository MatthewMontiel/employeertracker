INSERT INTO dept_area
VALUES ('Central Office'),
       ('Admin'),
       ('IT'),
       ('Secondary Staff');

Insert INTO role(title, salary, dept_id)
VALUES  ('Teacher', 30000, 4),
        ('Teacher Aid', 20000, 4)
        ('Principal', 75000, 2),
        ('Secretary', 25000, 1),
        ('IT Support', 30000, 3);

Insert INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Tanya', 'Tardy', 4, NULL),
       ('Sailor', 'Sews', 4, NULL),
       ('Timothy', 'Tombs', 2, NULL),
       ('Victoria', 'Venue', 1, NULL),
       ('Luther', 'Lives', 3, NULL);