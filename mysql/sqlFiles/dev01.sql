show databases;

use dev;

show tables;

select * from customers;

alter table customers
add column password_hash varchar(255) not null default '1';
alter table customers
add column password_salt varchar(255) not null default '1';

insert into customers(name, email, phone)
value('김이성', 'adg1@kakao.com', '010-0000-0000');

delete from customers
where id > 20;

CREATE TABLE `product_image` (
  `id` INT NOT NULL AUTO_INCREMENT, -- 키.
  `product_id` VARCHAR(100) NOT NULL, -- 상품아이디.
  `type` VARCHAR(10) NOT NULL, -- 메인이미지, 슬라이드이미지, 설명이미지
  `file_name` VARCHAR(100) NOT NULL, -- 이미지파일명.
  `create_date` timestamp default now(), -- 등록시간.
  PRIMARY KEY (`id`));
  
  select * from product_image;