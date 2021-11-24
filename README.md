# SQS_SUBSCRIBE
#### SQS Queue -> Subscribe Message
##### Author 박현우
##### Create Date 2021.11.24
#
### 개발 환경
* node 14+
* typescript
* nodemon
* dotenv
* ws
* express
#
### 내용
* [SQS_PUBLISHER](https://github.com/awakelife93/sqs_publisher)에게로 받은 메세지를 처리한다.
* 받는 방식은, [SQS_PUBLISHER](https://github.com/awakelife93/sqs_publisher)의 처리방식에 따른다.
#
### todo
* 구조 잡기
* 실제 Message 템플릿 정해서 구현
#
### 실행
* (please confirm .env file / .env configuration is same src/lib/env file)
* npm install
* npm start (nodemon을 쓰고 개발중이니, 없을 경우 nodemon -> node)

