# testTable
## Интерфейс
Интерфейс состоит из двух страниц, двух попабов с меняющемся контентом одного модуля.

В первом пространстве отображается фильт, кнопка добавления и список столов
Во втором просторанстве выводится таблица и три кнопки, две из которых отвечают за добавление элементов идна за вазврат на предидущую страницу

## Модели
Проект имеет три модели с данными:
####Table, Client, Order

Client связан с Table и Order

Order связан с Client и Table
Для хранения данных использовалась MongoDB

##API
Все схемы описаны в файле schema.js

# Запуск проекта 
Для локальной разработки изпользуйте каманду 

# Запуск проекта
Для локальной разработки изпользуйте каманду
Для запуска проета нужно сначало запустить базу MongoDB
войти с email : venera.andrushechkina@gmail.com
пароль: rwTT234ru
выбираем пункт network Access
Через кнопку добавляем свой ip адрес и ждем пока подключится(в попабу нажать на кнопку добавить текущий ip)
После этого запускаем npm run dev

*если проект не запустился то проверьте папку config файл key.js(скрипт в key.js должен совподать со скриптом в key.dev.js)

