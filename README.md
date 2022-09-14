<h1 align="center">
    <img alt="Ecoleta" title="Ecoleta" src="https://user-images.githubusercontent.com/38081852/83580830-6f63e200-a513-11ea-9a27-0a109ec1e4d0.png" />
</h1>

<p align="center">
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<p align="center">
 <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&color=7159c1&labelColor=000000" alt="PRs welcome!" />
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=7159c1&labelColor=000000">
</p>

## 💻 Projeto
O projeto tem como finalidade conectar empresas ou entidades que coletam resíduos (orgânicos e inorgânicos) à pessoas ou entidades que necessitam constantemente descartar esses resíduos. Solucionando um grande problema recorrente que é o descarte inadequado do lixo, facilitando o processo de recliclagem e reutilização.

## 🛠 Tecnologias
As seguintes ferramentas foram usadas na construção do projeto:

#### **Server**  ([NodeJS](https://nodejs.org/en/)  &  [TypeScript](https://www.typescriptlang.org/))

-   **[Express](https://expressjs.com/)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[KnexJS](http://knexjs.org/)**
-   **[SQLite](https://github.com/mapbox/node-sqlite3)**
-   **[ts-node](https://github.com/TypeStrong/ts-node)**
-   **[dotENV](https://github.com/motdotla/dotenv)**
-   **[Multer](https://github.com/expressjs/multer)**
-   **[Celebrate](https://github.com/arb/celebrate)**
-   **[Joi](https://github.com/hapijs/joi)**

> Veja o arquivo  [server/package.json](./server/package.json)

#### **Website**  ([React](https://reactjs.org/)  &  [TypeScript](https://www.typescriptlang.org/))

-   **[React Router Dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)**
-   **[React Icons](https://react-icons.github.io/react-icons/)**
-   **[Axios](https://github.com/axios/axios)**
-   **[Leaflet](https://react-leaflet.js.org/en/)**
-   **[React Leaflet](https://react-leaflet.js.org/)**
-   **[React Dropzone](https://github.com/react-dropzone/react-dropzone)**

> Veja o arquivo  [web/package.json](./web/package.json)

#### **Mobile**  ([React Native](http://www.reactnative.com/)  &  [TypeScript](https://www.typescriptlang.org/))

-   **[Expo](https://expo.io/)**
-   **[Expo Google Fonts](https://github.com/expo/google-fonts)**
-   **[React Navigation](https://reactnavigation.org/)**
-   **[React Native Maps](https://github.com/react-native-community/react-native-maps)**
-   **[Expo Constants](https://docs.expo.io/versions/latest/sdk/constants/)**
-   **[React Native SVG](https://github.com/react-native-community/react-native-svg)**
-   **[Axios](https://github.com/axios/axios)**
-   **[Expo Location](https://docs.expo.io/versions/latest/sdk/location/)**
-   **[Expo Mail Composer](https://docs.expo.io/versions/latest/sdk/mail-composer/)**

> Veja o arquivo  [mobile/package.json](./mobile/package.json)

## 🧭 **COMO UTILIZAR**

### Configurações Iniciais

Certifique-se que você possui o <kbd>[NodeJS](https://nodejs.org/en/download/)</kbd> instalado na sua máquina. 

Após ter o **Node** instalado, instale as dependências do **React e React Native (Expo)** de forma global, utilizando os comandos:

```sh
# React:
$ npm install create-react-app -g

# Expo (React Native):
$ npm install -g expo-cli 
```

Você precisa renomear o arquivo `.env-example` para `.env` e inserir as informações que condizem com o seu **host**:

```sh
$ mv .env-example .env
```

Instale as dependências contidas nos arquivos `package.json` que se encontram nos diretórios **server**, **web** e **mobile**. Para instalar as dependências, basta abrir o terminal no diretório e digitar o comando:
```sh

# Instalando as dependências do server:
$ cd server
$ npm install

# Instalando as dependências do website:
$ cd ../web
$ npm install

# Instalando as dependências do mobile:
$ cd ../mobile
$ npm install
```

### Utilizando o Server

```sh
# Abrindo o terminal no diretório do servidor:
$ cd server

# Instanciando o banco de dados:
$ npm run knex:migrate

# Povoando o banco de dados (seeds):
$ npm run knex:seed

# Executando a aplicação em modo de desenvolvimento:
$ npm start
```

> Veja a parte de **scripts {}** do arquivo <kbd>[package.json](./sources/server/package.json)</kbd> para saber quais scripts estão disponíveis.

### Utilizando o Website

```sh
# Abrindo o terminal no diretório do website:
$ cd website

# Executando o website no modo de desenvolvimento:
$ npm start
```

> Se o browser não abrir automaticamente, acesse: http://localhost:3000.

## ⚖ Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

<a href="https://rocketseat.com.br">
  <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%237519C1">
</a>
