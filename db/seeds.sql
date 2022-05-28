USE employee_db;

INSERT INTO department
    (names)
    
VALUES
    ('Payroll'),
    ('Accounting'),
    ('Human Resources'),
    ('Legal');

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('Payroll Manager', 40000, 1),
    ('Payroll', 25000, 1),
    ('General Ledger', 50000, 2),
    ('Accounts Payable', 55000, 2),
    ('HR Manager', 50000, 3),
    ('Front Desk Secretary', 30000, 3),
    ('Paralegal', 80000, 4),
    ('Legal Admin Assistant', 100000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES 
    ('Yoshisaur', 'Munchakoopas', 1, NULL),
    ('Obi-wan', 'Kenobi', 2, 1),
    ('Light', 'Yagami', 3, NULL),
    ('Indiana', 'Jones', 4, 3),
    ('Eugene', 'Krabs', 4, 3),
    ('Anakin', 'Skywalker', 5, NULL),
    ('Cloud', 'Strife', 6, 5),
    ('Sunny', 'Corleone', 7, NULL),
    ('Ash', 'Ketchum', 6, 5),
    ('Squidward', 'Tentacles', 7, 8);