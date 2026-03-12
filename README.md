@startuml
title SOA-Based User Authentication and Profile Management System

top to bottom direction
skinparam backgroundColor white
skinparam componentStyle rectangle
skinparam shadowing false
skinparam packageStyle rectangle
skinparam ArrowColor #2F4F4F
skinparam ArrowThickness 1.2
skinparam DefaultFontName Arial
skinparam DefaultFontSize 13
skinparam PackageFontStyle bold
skinparam ComponentFontStyle bold
skinparam wrapWidth 180
skinparam maxMessageSize 100

actor User

package "Frontend Layer" {
  [Frontend Web App\nHTML / CSS / JavaScript] as Frontend
  [Local Storage\nToken Store] as LocalStorage
}

package "Service Layer" {
  [SOAP Authentication Service\nSpring Boot SOAP\nPort 8080] as SOAP
  [REST JSON User Service\nSpring Boot REST API\nPort 8081] as REST
  [ ] as Spacer
}

package "Data Layer" {
  database "Auth Data Store\nIn-Memory Map\nUsers / Tokens" as AuthDB
  database "Profile Data Store\nIn-Memory Map\nUser Profiles" as ProfileDB
}

SOAP -[hidden]-> Spacer
Spacer -[hidden]-> REST

User --> Frontend : Uses web interface

Frontend --> LocalStorage : Store token
LocalStorage --> Frontend : Retrieve token

Frontend -down-> SOAP : SOAP RegisterUser\n/ LoginUser
SOAP -up-> Frontend : SOAP response\n+ token

Frontend --> REST : REST CRUD request\nAuthorization:\nBearer token
REST --> SOAP : SOAP\nValidateToken
SOAP --> REST : Token validation\nresult

SOAP --> AuthDB : Store / verify\nusers and tokens
REST --> ProfileDB : Create / Read /\nUpdate / Delete profiles

@enduml
