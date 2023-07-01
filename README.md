# Importação do Banco de Dados
Primeiramente, você precisa ter algum software de banco de dados SQL instalado em sua máquina.
Com o software instalado, basta importar o arquivo: "storedb.sql". 



# Configuar o Projeto
Para rodar este projeto é necessário ter alguma versão do NodeJS instalado em sua máquina.
Dito isso, com o NodeJS em sua máquina, rode o seguinte comando no local onde o projeto foi baixado:
```npm install```

Após a instalação das dependências do NodeJS, configure o arquivo ".env" de acordo com o seu ambiente.
Ou seja, você precisará inserir a senha e seu nome de usuário da sua ferramente de SQL.
Bem como o nome do seu banco de dados e, caso queira, sua "Secret Key" do JWT Token.

Caso você tenha algum problema com os modelos, instale o módulo "sequelize-auto" globalmente, assim:
```npm install -g sequelize-auto```

Agora, basta rodar um comando para gerar os modelos:
```sequelize-auto -h localhost -d storedb -u root -p 3306 -x 123456 -e mysql -o "./models"```

OBSERVAÇÃO: O comando acima é apenas um exemplo, olhe a documentação para entender melhor.



# Rodando o Projeto
Após ter concluído todas as etapas acima, rode o comando:
```npm start```

Pronto!
Agora basta você acessar os endpoints.

# Exemplos de Uso no Postman
![image](https://github.com/ThiagoArndt/node-api-store-jwt/assets/89104471/9ae1f5ec-bc80-4758-8209-6dceed5cb833)

![image](https://github.com/ThiagoArndt/node-api-store-jwt/assets/89104471/09f38e5c-18ed-447d-97f1-6f9f343e6d13)

# Documentação da API
Caso queira conferir a documentação da api, basta rodar o projeto e acessar o seguinte link:

http://localhost:5000/api-docs/

Caso tenha alterado a porta do express, deverá mudar a porta no endereço também.

![image](https://github.com/ThiagoArndt/node-api-store-jwt/assets/89104471/4f848dc1-268d-4128-b675-3cd958ac5bd4)
