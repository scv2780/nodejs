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
  
-- 글번호, 제목, 내용, 작성자, 작성일시
create table tbl_board (
`id` int not null auto_increment, -- 키.
`title` varchar(50) not null,
`content` varchar(500) not null,
`writer` varchar(50) not null,
`write_date` timestamp default now(), -- 등록시간.
primary key (`id`));

insert into tbl_board (title, content, writer)
values('날씨가 추워요', '오늘은 날씨가 많이 추워요', 'user01');
insert into tbl_board set title='날씨가 좋아요',content='해가 밝게 떴네요',writer='user02';
select * from tbl_board;
update tbl_board
set title='내일은 날씨가?',content='좋아질까요?'
where id = 2;
-- CRUD => 추가,수정,삭제,조회.
-- DB+Expres => localhost:3000/boards (GET) 목록.
--              localhost:3000/board (POST) 등록.
--                            /board/:id (GET) 조회.
--                            /board (PUT) 수정.
--                            /board/:id (DELTE) 삭제.
