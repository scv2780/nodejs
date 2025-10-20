show databases;

-- 사용할 db
use dev;

show tables;

select * from customers;

insert into dev.customers(id, name, email, phone, address)
values(1, 'kildong', 'kildong@email.com', '010-1111-2222', '');

select * from customers;

-- dev01/dev01 계정만들기
create user 'dev01'@'%' identified by 'dev01';
grant all privileges on dev.* to 'dev01'@'%' with grant option;
flush privileges;