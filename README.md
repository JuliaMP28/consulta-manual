# consulta-manuais

## Objetivo 

Projeto desenvolvido para auxiliar no cadastro e gestao de manuais do HC-UFU

## Melhorias/Correções (TODO)

- [x] Implementar feedback de erro na tela de login
- [x] Implementar feedback de erro na tela de cadastrado
- [x] Implementar feedback de erro na tela de editar
- [x] Implementar feedback de erro na tela de pesquisa
- [x] Não exibir campos de detalhes na tela de pesquisa/filtro quando não há dados selecionados
- [x] Preencher filtro após pesquisa
- [x] Validar body do lado da api
- [] Implementar integração com AD (responsabilidade TI HC-UFU)
- [x] Preencher tela de Welcome/Home
- [x] Botão de abrir arquivo não funciona
- [x] Icone de navegador configurável
- [x] Titulo de navegador configuravel
- [x] Criar DOCKERFILE
- [x] config de prod no dockerfile  
- [x] reduzir código do bootstrap admin
- [x] remover escrita de adm do profile quando nao for adm
- [x] usar config para banco


## Tecnologias Utilizadas

- NodeJS (v20.5.1)
- NPM ( v9.8.0 )
- Docker Engine
- MongoDB ( rodando em container no docker )
- Handlebars
- Express

## Overview das funcionalidades

No momento ( isso pode ser modificado no futuro com o AD ), existem 3 tipos de usuários:

1. Usuário ADMIN e com Acesso Restrito
2. Usuário com acesso restrito e não admin
3. Usuário sem acesso restrito e não admin

Somente os usuários com permissão de ADMIN podem cadastrar, editar ou remover os manuais. Qualquer usuário ADMIN terá acesso a todos os manuais.  
Usuários não admin não podem cadastrar, editar ou remover. E só podem ver os manuais com acesso restrito, caso eles tenham permissão.

No Header ( parte superior do projeto ) é possível realizar uma busca simples pelo Nome do Manual, na tela de boas vindas.  
Caso deseje utilizar alguma busca avançada é possível ir à página de "Procurar Manuais" onde existe um filtro com 4 opções: Nome, Tipo, Marca e Modelo. Não é necessário preencher todos os campos, pode ser apenas um deles com parte do texto que deseja-se procurar.  
Assim que realizada a busca, ela aparecerá na arvore de arquivos, classificada da seguinte forma:

-> Tipo  
--> Marca  
---> Modelo  
----> Nome  

Ao clicar em um Nome, as informações detalhadas são exibidas na lateral direita da tela.

As opcões de editar e remover só são exibidas para usuário ADMIN

## Futuro - Configurar com AD

O projeto possui a própria tela de Login com um JWT que utiliza para ler algumas informações do usuário. No futuro, com a integração do Active Directory, será necessário alterar o arquivo router/api/login.js para que ele passe a procurar e autenticar o usuário com o AD ao invés de procurar em um simples array de objetos configurado previamente no projeto.  
Esse array de objetos de usuário foi utilizado simplesmente como um MOCK do AD. Após a implementação do AD será necessário revisar as funcionalidade de Administrador e Acesso restritro uma vez que isso vai depender das ROLES do AD, já que não temos acesso a esses dados no momento, tentamos deixar de uma forma simples para que seja modificado no futuro.

## Autenticação/Autorização interna do projeto

Como já mencionado nessa documentação, o projeto utiliza um JWT próprio para genrenciar acesso e permissões. O secret deve ser configurado no arquivo de config.  
Todo request para alguma api ( routes/* ) que necessita de autenticação passa por um middleware do auth/auth.js, ele verifica se o JWT é valido, se for insere infos do usuário e segue com o request, se não for será redirecionado para a tela de login.

## Como configurar o ambiente de desenvolvimento

1. Instar NodeJS e NPM https://nodejs.org/en
2. Instalar docker ( ou podman )
3. Executar o mongodb

Depois de seguir as etapas seguintes, você não precisa realiza-las sempre, essa etapa é necessária apenas para configuração inicial do banco, após isso você pode executar um docker start e stop no container criado.  
Lembre-se que se o container for removido/apagado, será necessário fazer novamente as etapas seguintes caso você não tenha utilizado um volume para os dados do mongo.

```sh
# é desejavel criar uma network para executar os containers
docker network create consulta-manuais-network
```

```sh
# executando mongo
# IMPORTANTE: em produção configurar um volume para persistência de dados mesmo se o container falhar
docker run -d \
    -p 27017:27017 \
    --network consulta-manuais-network \
    --name consulta-manuais-db \
    -e MONGODB_INITDB_ROOT_USERNAME=user \
    -e MONGODB_INITDB_ROOT_PASSWORD=password \
    mongo:latest
```

```sh
# acessar o container: docker exec -it <CONTAINER_NAME> bash
docker exec -it consulta-manuais-db bash

# para acessar a cli do mongo:
mongosh
```

```sh
# criar uma nova base ( nome de exemplo )
# use <nome da base>
use consulta-manuais

# criar um usuario com acesso adequado
# configurar user e pwd
db.createUser({
  user: "user-prod",
  pwd: "prod-pass",
  roles: [
    { role: "readWrite", db: "consulta-manuais" }
  ]
})
```

4. Instalar dependencias do nodejs

```sh
# executar no diretório root do projeto, onde contem o package.json
npm install
```

```sh
# executar o projeto
# em modo de dev
npm run dev
```

## Rodando no docker

```sh
# criando imagem para o docker
# deve ser executada no root desse projeto onde contém o dockerfile
docker build -t consulta:1.0.1 .

# executando a imagem
docker run -d --network consulta-manuais-network -p 3000:3000 consulta:1.0.1

```

## Metodologia

a ideia é tipo descrever a estrutura do projeto, a linagungens, ferramentas, um esqueleto do projeto. falar dos requisitos tb, tipo ocmo replicar o projeto.


A primeira etapa, antes de qualquer desenvolvimento ou arquitetura de código e projeto, elencamos os requisitos funcionais e não funcionais para o projeto.  
Os requisitos elencados foram:

1. Cadastrar Manual
2. Editar Manual
3. Visualizar um manual
4. Deletar manual
5. Visualização em formato de árvore
6. Usuários com permissão de administradores, leitura e também leitura com acesso restrito.
7. Autorização/login no projeto e possível integração com AD no futuro.
8. Busca/filtro de manuais por nome, tipo, modelo e marca.

Após elencadas as features, começamos a etapa de elaborar um documento que foi compartilhado com o nosso steakholder do hospital, a partir desse documento colaborativo entre nós, conseguimos refinar melhor as funcionalidades desejadas do projeto.  
Decidimos que o projeto seria uma interface WEB para que os funcionários consigam acessar.  
A integração com o AD ( Active Directory ) do hospital não será realizada pelo nosso grupo pois depende de credenciais de acesso que devem ser fornecidas pelo HC, por isso essa parte dependerá de um desenvolvimento futuro do lado deles.  

Para a parte técnica, decidimos seguir com NodeJS para fazer a parte de backend ( persistência em banco e lógica de negócio ) e utilizar o handlebars.js para engine do frontend. MongoDB foi escolhido junto com nosso steakholder por ser um banco fácil de usar e também uma imagem Docker do projeto está disponível para facilitar o deploy no ambiente de produção.

Com a estrutura do projeto definida, partimos para a próxima etapa de construir o frontend ( web ) que seria a parte de visualização, ainda que não fosse uma tela com funcionalidades implementadas, pensamos em criar um protótotipo para guiar o desenvolvimento. Decidimos usar como modelo um template do Bootstrap que já fornece uma estrutura básica para a tela, isso agilizou o processo de desenvolvimento já cogitando um projeto responsivo em qualquer tipo de dispositvo.
O protótipo do Bootstrap foi adaptado para utilizarmos o handlebars, e transformado em componentes que podem ser reutilizados.

Após isso, pensamos na estrutura do banco e como poderíamos armazenar os dados no MongoDB, nessa fase do projeto definimos como é o nosso modelo.

E por último, começamos a trabalhar no backend em NodeJS + Express, para adicionar funcionalidades a nossa tela de protótipo, a ideia dessa etapa é criar uma camada entre o banco e a tela.  Essa é a parte mais desafiadora e trabalhosa do projeto, pois não envolve só uma conexão com banco, mas também toda a parte de configuração, autenticação e estrutura.  


