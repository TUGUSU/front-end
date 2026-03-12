# SOA-д суурилсан Хэрэглэгчийн Нэвтрэлт ба Профайл Удирдлагын Систем

## 1. Төслийн танилцуулга

Энэхүү төсөл нь Service-Oriented Architecture (SOA) зарчимд суурилсан хэрэглэгчийн нэвтрэлт болон профайл удирдлагын системийн жишээ хэрэгжилт юм. Систем нь гурван үндсэн хэсгээс бүрдэнэ:

- SOAP Authentication Service
- REST JSON User Service
- Frontend Web Application

Системийн зорилго нь SOAP болон REST технологийг хослуулан хэрэглэгчийн нэвтрэлт болон профайл удирдлагын үйлдлүүдийг тусдаа service-үүдээр хэрэгжүүлэхэд оршино.

---

# 2. Системийн архитектур

Систем нь дараах архитектурын бүтэцтэй.

- **Frontend Application** – Хэрэглэгчийн интерфейс (HTML, CSS, JavaScript)
- **SOAP Authentication Service** – Хэрэглэгчийн бүртгэл, нэвтрэлт, token баталгаажуулалт
- **REST JSON User Service** – Хэрэглэгчийн профайл CRUD үйлдлүүд
- **In-memory Data Stores** – Хэрэглэгчийн мэдээлэл болон authentication token хадгалах

Архитектурын диаграммыг `architecture-diagram.png` файлаас харж болно.

---

# 3. Төслийн бүрэлдэхүүн хэсгүүд

Энэхүү систем нь дараах гурван GitHub repository-оос бүрдэнэ.

## 3.1 SOAP Authentication Service

Repository:

user-soap-service


Үүрэг:

- Хэрэглэгч бүртгэх
- Хэрэглэгч нэвтрүүлэх
- Authentication token үүсгэх
- Token хүчинтэй эсэхийг шалгах

Технологи:

- Java
- Spring Boot
- Spring Web Services (SOAP)
- Maven

---

## 3.2 REST JSON User Service

Repository:


user-json-service


Үүрэг:

- Хэрэглэгчийн профайл мэдээлэл хадгалах
- CRUD үйлдлүүд гүйцэтгэх
- SOAP authentication service-аар token шалгах

Технологи:

- Java
- Spring Boot
- REST API
- JSON
- Maven

---

## 3.3 Frontend Application

Repository:


frontend-app


Үүрэг:

- Хэрэглэгчийн бүртгэл
- Хэрэглэгчийн нэвтрэлт
- Профайл CRUD үйлдлүүд

Технологи:

- HTML
- CSS
- JavaScript
- Fetch API

---

# 4. Authentication механизм

Систем нь token-based authentication ашигладаг.

Authentication процесс дараах байдлаар явагдана.

1. Хэрэглэгч SOAP RegisterUser operation ашиглан бүртгүүлнэ
2. Хэрэглэгч SOAP LoginUser operation ашиглан нэвтэрнэ
3. SOAP service authentication token үүсгэнэ
4. Token нь frontend дээр browser localStorage-д хадгалагдана
5. Frontend REST API дуудахдаа Authorization header ашиглана


Authorization: Bearer <token>


6. REST service SOAP ValidateToken operation ашиглан token-ийг шалгана
7. Token хүчинтэй бол хүссэн CRUD үйлдлийг гүйцэтгэнэ

---

# 5. REST API Endpoint-ууд

Base URL


http://localhost:8081/users


## Create User


POST /users


## Get User


GET /users/{id}


## Update User


PUT /users/{id}


## Delete User


DELETE /users/{id}


---

# 6. SOAP Operations

SOAP service дараах operations-уудыг агуулна.

## RegisterUser

Шинэ хэрэглэгч бүртгэнэ.

## LoginUser

Хэрэглэгчийг нэвтрүүлж authentication token буцаана.

## ValidateToken

Token хүчинтэй эсэхийг шалгана.

---

# 7. Системийг ажиллуулах заавар

## 1. SOAP Authentication Service ажиллуулах


cd user-soap-service
mvn spring-boot:run


Service дараах port дээр ажиллана:


http://localhost:8080


---

## 2. REST JSON User Service ажиллуулах


cd user-json-service
mvn spring-boot:run


Service дараах port дээр ажиллана:


http://localhost:8081


---

## 3. Frontend Application ажиллуулах

Frontend файлуудыг Live Server ашиглан нээж ажиллуулна.

Жишээ:


http://localhost:5500/login.html


---

# 8. Өгөгдлийн сангийн сонголт

Энэхүү лабораторийн ажлын хүрээнд өгөгдлийг **in-memory data structure** ашиглан хадгалсан.

Үүнд:

- HashMap
- Local memory storage

ашигласан.

Энэ нь системийн үндсэн зорилго болох service communication болон authentication flow дээр төвлөрөх боломжийг олгодог.

Бодит production орчинд дараах database ашиглах боломжтой:

- MySQL
- PostgreSQL
- MongoDB

---

# 9. Ашигласан технологиуд

- Java 21
- Spring Boot
- Spring Web Services (SOAP)
- REST API
- JSON
- Maven
- HTML / CSS / JavaScript
- GitHub
- Postman

---

# 10. Дүгнэлт

Энэхүү систем нь Service-Oriented Architecture (SOA) зарчимд тулгуурлан SOAP болон REST технологийг хослуулан хэрэглэгчийн authentication болон профайл удирдлагын үйлдлүүдийг тусдаа service-үүдээр хэрэгжүүлсэн.

SOAP service нь authentication үйлдлийг хариуцаж, REST service нь хэрэглэгчийн профайл CRUD үй
