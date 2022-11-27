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


<ul>
<li>Registo:
<ul>
<li>Nome</li>
<li>Email</li>
<li>Password</li>
<li>Role:
<ul>
<li>Publisher</li>
<li>User</li>
</ul>
</li>
</ul>
</li>
<li>Logout</li>
<li>GetMe
<ul>
<li>Retorna o user atualmente logado</li>
</ul>
</li>
</ul>

#### Endpoints Users

<ul>
<li>@desc      Register user</li>
<li>@route     POST /api/v1/auth/register</li>
<li>@access    Public</li>
</ul>
<ul>
<li>@desc      Login user</li>
<li>@route     POST /api/v1/auth/login</li>
<li>@access    Public</li>
</ul>
<ul>
<li>@desc      Get current logged in user</li>
<li>@route     POST /api/v1/auth/me</li>
<li>@access    Private</li>
</ul>
<ul>
<li>@desc      Log user out / clear cookie</li>
<li>@route     GET /api/v1/auth/logout</li>
<li>@access    Private</li>
</ul>

### Brands

<p>-Listar todas as marcas:</p>
    <p>Acesso público</p>
<p> Paginação com limite de itens por página</p>
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

#### Endpoints Brands
<ul>
<li>@desc      Get all brands</li>
<li>@route     GET /api/v1/brands</li>
<li>@access    Public</li>
</ul>
<ul>
<li>@desc      Get single brand</li>
<li>@route     GET /api/v1/brands/:id</li>
<li>@access    Public</li>
</ul>
<ul>
<li>@desc      Create new brand</li>
<li>@route     POST /api/v1/brands</li>
<li>@access    Private</li>
</ul>
<ul>
<li>@desc      Update brand</li>
<li>@route     PUT /api/v1/brands/:id</li>
<li>@access    Private</li>
</ul>

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


#### Endpoints Turbos
<ul>
<li>@desc      Get all turbos</li>
<li>@route     GET /api/v1/turbos</li>
<li>@route     GET /api/v1/brands/:brandId/turbos</li>
<li>@access    Public</li>
</ul>
<ul>
<li>@desc      Get single turbo</li>
<li>@route     GET /api/v1/turbos/:id</li>
<li>@access    Public</li>
</ul>
<ul>
<li>@desc      Create new turbo</li>
<li>@route     POST /api/v1/turbos</li>
<li>@access    Private</li>
</ul>
<ul>
<li>@desc      Update turbo</li>
<li>@route     PUT /api/v1/turbos/:id</li>
<li>@access    Private</li>
</ul>

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

#### Endpoints Comments
<ul>
<li>@desc      Get all comments</li>
<li>@route     GET /api/v1/comments</li>
<li>@route     GET /api/v1/turbos/:turboId/comments</li>
<li>@access    Public</li>
</ul>
<ul>
<li>@desc      Get single comment</li>
<li>@route     GET /api/v1/comments/:id</li>
<li>@access    Public</li>
</ul>
<ul>
<li>@desc      Create new comment</li>
<li>@route     POST /api/v1/comments</li>
<li>@access    Private</li>
</ul>
<ul>
<li>@desc      Update comment</li>
<li>@route     PUT /api/v1/comments/:id</li>
<li>@access    Private</li>
</ul>

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

#### Endpoints Ratings
<ul>
<li>@desc      Get all ratings</li>
<li>@route     GET /api/v1/ratings</li>
<li>@route     GET /api/v1/turbos/:turboId/ratings</li>
<li>@access    Public</li>
</ul>
<ul>
<li>@desc      Get single rating</li>
<li>@route     GET /api/v1/ratings/:id</li>
<li>@access    Public</li>
</ul>
<ul>
<li>@desc      Create new rating</li>
<li>@route     POST /api/v1/ratings</li>
<li>@access    Private</li>
</ul>
<ul>
<li>@desc      Update rating</li>
<li>@route     PUT /api/v1/ratings/:id</li>
<li>@access    Private</li>
</ul>

