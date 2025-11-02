# Как работать над проектом

## Окружение

Для удобства работы над проектом используются инструменты из **Node.js** и **npm**. Все необходимые настройки произведены. Убедитесь, что на рабочем компьютере установлена **Node.js**, соответсвтующая актуальной версии. Актуальная версия **Node.js** указана в файле `package.json` в поле `node`. После, в терминале, перейти в директорию с проектом и _единожды_ запустите команду:

```bash
npm install
```

Данная команда запустит процесс установки зависимостей проекта из **npm**.

### Сценарии (запускать находят в папке project)

После создания проекта вам доступны следующие сценарии.

#### Запуск отдельных сервисов (убедитесь что у вас запущены нужные Docker container)

Запуск сервиса api-gateway

```bash
npm run start:api-gateway
```

Запуск сервиса file-storage

```bash
npm run start:file-storage
```

Запуск сервиса уведомлений

```bash
npm run start:notification
```

Запуск сервиса постов

```bash
npm run start:post
```

Запуск сервиса пользователей

```bash
npm run start:user
```

#### Запуск докер контейнеров

Запуск контейнера для file-storage сервиса

```bash
npm run file-storage:docker-up
```

Остановка контейнера для file-storage сервиса

```bash
npm run file-storage:docker-down
```

Запуск контейнера для сервиса уведомлений

```bash
npm run notification:docker-up
```

Остановка контейнера для сервиса уведомлений

```bash
npm run notification:docker-down
```

Запуск контейнера для сервиса постов

```bash
npm run post:docker-up
```

Остановка контейнера для сервиса постов

```bash
npm run post:docker-down
```

Запуск контейнера для сервиса пользователей

```bash
npm run user:docker-up
```

Остановка контейнера для сервиса пользователей

```bash
npm run user:docker-down
```

Запуск всех контейнеров сервисов (file-storage, notification, post, user)

```bash
npm run all:docker-up
```

Остановка всех контейнеров сервисов (file-storage, notification, post, user)

```bash
npm run all:docker-down
```

#### Работа с базой данных сервиса постов
Убедитесь что у вас запущен контейнер с базой данных

Запуск линтера моделей базы данных

```bash
npm run post-db-lint
```

Запуск миграции базы данных

```bash
npm run post-db-migrate
```

Сброс базы данных

```bash
npm run post-db-reset
```

Сброс базы данных

```bash
npm run post-db-reset
```

Генерация клиента Prisma для базы данных

```bash
npm run post-db-generate
```

Заполнения базы данных моковыми данными

```bash
npm run post-db-fill
```

#### Проверка линтером

```bash
npm run lint
```

Запуск проверки проекта статическим анализатором кода **ESLint**.

Анализ кода производится только в файлах, которые находятся в директории `src`.

**Обратите внимание**, при запуске данной команды, ошибки выводятся в терминал.


### Описание env переменных

#### File-storage

```
UPLOAD_DIRECTORY_PATH - путь к папке куда будут загружаться файлы
MONGO_HOST - хост для базы данных MongoDB
MONGO_PORT - порт для базы данных MongoDB (дефолтное значение 27018)
MONGO_DB - название для базы данных MongoDB
MONGO_USER - пользователь для базы данных MongoDB
MONGO_PASSWORD - пароль для пользователя для базы данных MongoDB
MONGO_AUTH_BASE=admin
SERVE_ROOT - путь к папке где будут хранится статические файлы
```

#### Notification

```
RABBITMQ_DEFAULT_USER - пользователь для RabbitMQ
RABBITMQ_DEFAULT_PASS - пароль для пользователя для RabbitMQ
RABBIT_HOST - адрес хоста для RabbitMQ
RABBIT_PASSWORD - пароль для RabbitMQ
RABBIT_PORT - порт для RabbitMQ
RABBIT_USER - 
RABBIT_QUEUE - названия очереди для RabbitMQ
RABBIT_EXCHANGE - название обменного имени для RabbitMQ
MONGO_HOST - адрес хоста для MongoDB
MONGO_PORT - порт для MongoDB
MONGO_DB - названия для MongoDB
MONGO_USER - пользователь для MongoDB
MONGO_PASSWORD - пароль для пользователя для MongoDB
MAIL_SMTP_HOST - адрес хоста для почтового сервера
MAIL_SMTP_PORT - порт для почтового сервера
MAIL_USER_NAME - пользователь для почтового сервера
MAIL_USER_PASSWORD - пароль для пользователя для почтового сервера
MAIL_FROM - почтовый адрес к которого будет отправлять письма почтовый сервер
```

#### Post

```
POSTGRES_USER - пользователь для Postgres
POSTGRES_PASSWORD - пароль для пользователя для Postgres
POSTGRES_DB - названия для таблицы для Postgres
PGADMIN_DEFAULT_EMAIL - email пользователя для PG Admin
PGADMIN_DEFAULT_PASSWORD - пароль пользователя для PG Admin
RABBITMQ_DEFAULT_USER - пользователь для RabbitMQ
RABBITMQ_DEFAULT_PASS - пароль для пользователя для RabbitMQ
RABBIT_HOST - адрес хоста для RabbitMQ
RABBIT_PASSWORD - пароль для RabbitMQ
RABBIT_PORT - порт для RabbitMQ
RABBIT_USER - 
RABBIT_QUEUE - названия очереди для RabbitMQ
RABBIT_EXCHANGE - название обменного имени для RabbitMQ
```

#### User

```
PORT - порт для развертываения сервиса User
MONGO_HOST - адрес хоста для MongoDB
MONGO_PORT - порт для MongoDB
MONGO_DB - названия для MongoDB
MONGO_AUTH_BASE - основной пользователь для авторизации
MONGO_USER - пользователь для MongoDB
MONGO_PASSWORD - пароль для пользователя для MongoDB
JWT_ACCESS_TOKEN_EXPIRES_IN - время жизни access token
JWT_ACCESS_TOKEN_SECRET - слово-секрет для access token
JWT_REFRESH_TOKEN_EXPIRES_IN - время жизни refresh token
JWT_REFRESH_TOKEN_SECRET - слово-секрет для refresh token
RABBITMQ_DEFAULT_USER - пользователь для RabbitMQ
RABBITMQ_DEFAULT_PASS - пароль для пользователя для RabbitMQ
RABBIT_HOST - адрес хоста для RabbitMQ
RABBIT_PASSWORD - пароль для RabbitMQ
RABBIT_PORT - порт для RabbitMQ
RABBIT_USER - 
RABBIT_QUEUE - названия очереди для RabbitMQ
RABBIT_EXCHANGE - название обменного имени для RabbitMQ
```

#### Запуск проекта

```bash
npm start
```

В процессе запуска проекта будет выполнен процесс «Сборки проекта» и запуска результирующего кода.

## Структура проекта

### Директория `project`

В директории размещается файлы для NX

### Директория `project/apps`

В директории размещается микросервисы

### Директория `project/apps/api-gateway`

В директории размещается микросервис api-gateway, единая точка входа для приложения

### Директория `project/apps/file-storage`

В директории размещается микросервис file-storage, сервис для работы с файлами

### Директория `project/apps/notification`

В директории размещается микросервис notification, сервис для работы с уведомлениями

### Директория `project/apps/post`

В директории размещается микросервис post, сервис для работы с постами

### Директория `project/apps/user`

В директории размещается микросервис user, сервис для работы с пользователями

### Директория `project/libs`

В директории размещается библиотеки, которые используются в проекте

### Директория `project/libs/shared/config`

В директории размещается config для использования в микросервисах

### Директория `project/libs/shared/core`

В директории размещается основные вспомогательные конструкты для работы сервисов такие как pipes и абстрактные классы repository

### Директория `project/libs/shared/helpers`

В директории размещается вспомогательные функции для работы сервисов

### Директория `project/libs/post/models`

В директории размещается файлы для работы Prisma с сервисом Post

### Директория `project/libs/post/types`

В директории размещается типы,интерфейсы и т.д. для Typescript для общего использования в сервисах

### Файл `Readme.md`

Файл, содержащий инструкции по работе с учебным репозиторием.

### Файл `Contributing.md`

Файл, содержащий советы и инструкции по внесению изменений в учебный репозиторий.

### Остальное

Все остальные файлы в проекте являются служебными. Пожалуйста, не удаляйте и не изменяйте их самовольно. Только если того требует задание или наставник.
