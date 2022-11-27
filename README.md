# Turbocharger API

## Sobre o projeto

<p>O projeto para desenvolver uma API para a consulta de turbocompressores automóveis foi desenvolvido no seguimento do projeto de frontend, que consistiu no desenvolvimento de um website com React para uma oficina de reparação de turbocompressores.
</p>
<p>A finalidade do projeto é que os utilizadores possam consultar que turbo equipa cada carro segundo a marca, com acesso a vários detalhes sobre o turbocompressor e ainda que possam deixar comentários sobre os produtos e dar uma avaliação.</p>
<p>Na API existem diferentes tipos de dados:
    Brands, Turbos, Comments e Ratings, estes dois últimos respeitantes aos Turbos.</p>
<p>
A API foi desenvolvida com recurso às tecnologias de NodeJS + ExpressJS + MongoDB.
</p>

## Recursos da API

### Users

<p>-Registo:</p>
Nome
<p>E-mail
Password
Role:
    Publisher
    User</p>
<p>-Login:
E-mail e password</p>
<p>-Logout</p>
<p>-GetMe:
Retorna o user atualmente logado</p>

#### Endpoints

<ul>
<li>@desc      Register user</li>
<li>@route     POST /api/v1/auth/register</li>
<li>@access    Public</li>
</ul>
@desc      Login user
@route     POST /api/v1/auth/login
@access    Public

@desc      Get current logged in user
@route     POST /api/v1/auth/me
@access    Private

@desc      Log user out / clear cookie
@route     GET /api/v1/auth/logout
@access    Private

### Brands

<p>-Listar todas as marcas:</p>
<p>Acesso público</p>
<p>Paginação com limite de itens por página</p>
<p>-Listar uma marca:</p>
<p>Acesso público</p>      
<p>-Criar uma marca:</p> 
<p>Acesso privado</p>
<p>Apenas autorizado a users registados com o role publisher</p>
<p>-Editar uma marca:</p> 
<p>Acesso privado</p>
<p>Apenas autorizado a users registados com o role publisher</p>
<p>-Apagar uma marca:</p> 
<p>Acesso privado</p>
<p>Apenas autorizado a users registados com o role publisher</p>
<p>Cascade delete para eliminar os dados subjacentes</p>

### Turbos

<p>-Listar todos os turbos:</p>
<p>Acesso público</p>
<p>Paginação com limite de itens por página</p>
<p>Sort e Filtering</p>
<p>-Listar um turbo:</p>
<p>Acesso público</p>      
<p>-Criar um turbo:</p> 
<p>Acesso privado</p>
<p>Apenas autorizado a users registados com o role publisher</p>
<p>-Editar um turbo:</p> 
<p>Acesso privado</p>
<p>Apenas autorizado a users registados com o role publisher</p>
<p>-Apagar um turbo:</p> 
<p>Acesso privado</p>
<p>Apenas autorizado a users registados com o role publisher</p> 

### Comments

<p>-Listar todos os comments:</p>
<p>Acesso público</p>
<p>-Listar um comment:</p>
<p>Acesso público</p>      
<p>-Criar um comment:</p> 
<p>Acesso privado</p>
<p>Apenas autorizado a users registados e autenticados</p>
<p>-Editar um comment:</p> 
<p>Acesso privado</p>
<p>Apenas autorizado ao user autor do comment e autenticado</p>
<p>-Apagar um comment:</p> 
<p>Acesso privado</p>
<p>Apenas autorizado ao user autor do comment e autenticado</p>

### Ratings

<p>-Listar todos os ratings:</p>
<p>Acesso público</p>
<p>-Listar um rating:</p>
<p>Acesso público</p>      
<p>-Criar um rating:</p> 
<p>Acesso privado</p>
<p>Apenas autorizado a users registados e autenticados</p>
<p>Rating com valor entre 1 e 5</p>
<p>-Editar um rating:</p> 
<p>Acesso privado</p>
<p>Apenas autorizado ao user autor do rating e autenticado</p>
<p>-Apagar um rating:</p> 
<p>Acesso privado</p>
<p>Apenas autorizado ao user autor do rating e autenticado</p>




# Users e autenticação
      -Registo
            -Uso de e-mail e password
            -passwords encriptadas através do bcryptjs
      -Login
            -Uso de e-mail e password
      -Logout