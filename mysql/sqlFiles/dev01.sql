show databases;

use dev;

show tables;

select * from customers;

alter table customers
add column password_hash varchar(255) not null default '1';
alter table customers
add column password_salt varchar(255) not null default '1';

insert into customers(name, email, phone)
value('kang', 'tjdcksgur1@kakao.com', '010-0000-0000');

delete from customers
where id = 2;