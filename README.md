# NODE-SQS-MESSAGE-ACTION
#### SQS Queue -> Node-SQS -> Subscribe Message
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
* [NODE-SQS](https://github.com/awakelife93/node-sqs)에게로 받은 메세지를 처리한다.
* 받는 방식은, [NODE-SQS](https://github.com/awakelife93/node-sqs)의 처리방식에 따른다.
#
### todo
* SQS가 아닌 상위 Message Queue 범위로 다시 잡기 (kafka message action도 처리할 수 있게끔...)
#
### 실행
* (please confirm .env file / .env configuration is same src/lib/env file)
* npm install
* npm start (nodemon을 쓰고 개발중이니, 없을 경우 nodemon -> node)

