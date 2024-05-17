use d_camaron;

create table users(
	id bigint primary key auto_increment,
    email varchar(180) not null unique, 
    name varchar(90) not null,
    lastname varchar(90) not null,
    phone varchar(10) not null unique, 
    image varchar(255) null,
    password varchar(90) not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null
);

create table roles(
	id bigint primary key auto_increment,
    name varchar(90) not null unique,
    image varchar(255) null, 
    route varchar(180) not null,
    created_at timestamp(0) not null, 
    updated_at timestamp(0) not null
);

insert into roles(name, route, created_at, updated_at)
	values('RESTAURANTE', '/restaurant/orders/list', now(), now());
insert into roles(name, route, created_at, updated_at)
	values('CLIENTE', '/client/products/list', now(), now());
    
create table user_has_roles(
	id_user bigint not null,
    id_rol bigint not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    
    foreign key(id_user) references users(id) on update cascade on delete cascade,
    foreign key(id_rol) references roles(id) on update cascade on delete cascade,
    primary key(id_user, id_rol)
);

create table categories(
	id bigint primary key auto_increment,
    name varchar(180) not null,
    description text not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null
);

create table products(
	id bigint primary key auto_increment,
    name varchar(180) not null unique,
    description text not null,
    price double precision not null,
    image1 varchar(255) null,
    image2 varchar(255) null,
    image3 varchar(255) null,
    id_category bigint not null,
    created_at timestamp(0),
    updated_at timestamp(0),
    
    foreign key (id_category) references categories(id) 
		on update cascade on delete cascade
);

create table orders (
	id bigint primary key auto_increment,
    id_client bigint not null,
    status varchar(90) not null, 
    timestamp bigint not null, 
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    
    foreign key(id_client) references users(id) on update cascade on delete cascade
);

create table order_has_products(
	id_order bigint not null, 
    id_product bigint not null,
    quantity bigint not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    
    primary key(id_order, id_product),
    foreign key(id_order) references orders(id),
    foreign key(id_product) references products(id)
);