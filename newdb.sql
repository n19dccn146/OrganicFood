create database eComOrganic
go

use eComOrganic
go

create table Account
(
	Email nvarchar(100) primary key,
	Name nvarchar(100),
	Phone varchar(20),
	Password nvarchar(256),
	Birdth datetime,
	Gender int,
	Role int,
	IsEmailVerified bit
)
go

create table Chat
(
	Id uniqueidentifier primary key,
	Email nvarchar(100),
	Reply uniqueidentifier null,
	Content ntext,
	Time DateTime,

	foreign key (Email) references Account(Email),
	foreign key (Reply) references Chat(Id)
)
go

create table Address
(
	Id uniqueidentifier primary key,
	Email nvarchar(100),
	Name nvarchar(100),
	Phone nvarchar(20)

	foreign key (Email) references Account(Email)
)
go

create table Category
(
	Id uniqueidentifier primary key,
	Name nvarchar(100),
	Slug nvarchar(100),
	Image nvarchar(256),
	Status bit
)
go

create table Supplier
(
	Id uniqueidentifier primary key,
	Name nvarchar(100),
	Phone varchar(20),
	Address nvarchar(256)
)
go

create table Product
(
	Id uniqueidentifier primary key,
	Category uniqueidentifier,
	Supplier uniqueidentifier,
	Name nvarchar(100),
	Description ntext,
	code nvarchar(256),
	Status bit,
	Price int

	foreign key (Supplier) references Supplier(Id),
	foreign key (Category) references Category(Id)
)
go

create table ProductColor
(
	Id uniqueidentifier primary key,
	Product uniqueidentifier,
	Color nvarchar(100)

	foreign key (Product) references Product(Id)
)
go

create table ProductImage
(
	Id uniqueidentifier primary key,
	ProductColor uniqueidentifier,
	Image nvarchar(256),
	Alt nvarchar(256),

	foreign key (ProductColor) references ProductColor(Id)

)

create table Comment
(
	Id uniqueidentifier primary key,
	ProductColor uniqueidentifier,
	Email nvarchar(100),
	Comment ntext,

	foreign key (ProductColor) references ProductColor(Id),
	foreign key (Email) references Account(Email)
)
go

create table Discount
(
	Id uniqueidentifier primary key,
	Product uniqueidentifier,
	Code nvarchar(20),
	IsPercent bit,
	Value DECIMAL(10, 2),
	ExpDate datetime,
	IsShip bit,
	Remaining int,

	foreign key (Product) references Product(Id)
)
go

create table Bill
(
	Id uniqueidentifier primary key,
	Address uniqueidentifier,
	Discount uniqueidentifier,
	Refund bit,
	Paid bit,
	Ship Int,
	Status int,
	Verifed bit,

	foreign key (Address) references Address(Id),
	foreign key (Discount) references Discount(Id)
)
go

create table BillInfo
(
	Bill uniqueidentifier,
	ProductColor uniqueidentifier,
	Amount int,
	Price DECIMAL(10, 2)

	primary key (Bill, ProductColor),

	foreign key (Bill) references Bill(Id),
	foreign key (ProductColor) references ProductColor(Id),
)
go

create table Import
(
	Id uniqueidentifier primary key,
	Email nvarchar(100),
	Date DateTime

	foreign key (Email) references Account(Email)
)
go

create table ImportInfo
(
	Import uniqueidentifier,
	ProductColor uniqueidentifier,
	Amount Int,
	Price DECIMAL(10, 2),

	primary key (Import, ProductColor),

	foreign key (Import) references Import(Id),
	foreign key (ProductColor) references ProductColor(Id)
)
go