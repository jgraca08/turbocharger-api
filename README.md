# Turbocharger API

## Sobre o projeto

<p>O projeto para desenvolver uma API para a consulta de turbocompressores automóveis foi desenvolvido no seguimento do projeto de frontend, que consistiu no desenvolvimento de um website com React para uma oficina de reparação de turbocompressores.
</p>
<br>
<p>A finalidade do projeto é que os utilizadores possam consultar que turbo equipa cada carro segundo a marca, com acesso a vários detalhes sobre o turbocompressor e ainda que possam deixar comentários sobre os produtos e dar uma avaliação.</p>
<br>
<p>Na API existem diferentes tipos de dados:</p><br>
<p>Brands, Turbos, Comments e Ratings, estes dois últimos respeitantes aos Turbos.</p>
<br>
<p>
A API foi desenvolvida com recurso às tecnologias de NodeJS + ExpressJS + MongoDB.
</p>
<br>

## Recursos da API

### Users
<p>-Registo através de Nome, Email e password</p><br>
<p>-No momento do registo é definido o tipo de role:</p><br>
<p><strong>Publisher:</strong> Permite  criar, editar, ler e apagar dados nos endpoints Brands e Turbos</p><br>
<p><strong>User:</strong> Permite  ler dados no endpoint das Brands e nos Turbos e criar, editar, ler e apagar dados nos endpoints Comments e Ratings</p>
<br>

### Marcas
<br>
<p>-Listar todas as marcas:</p>
<p>Acesso público</p>
<p>Paginação com limite de itens por página</p>
<br>
<p>-Listar uma marca</p>      
<p>-Criar uma marca:</p> 
<p>Apenas users registados e com role publisher</p>
      -Editar uma marca
           -Apenas users registados e com role publisher
      -Eliminar uma marca
           -Apenas users registados e com role publisher

# Turbocompressores
      -Listar todos os turbocompressores 
            -Paginação com limite de itens por página
            -Selecionar campos específicos nos resultados
      -Listar um turbocompressor
            -Referência/modelo
            -Imagem
            -Descrição
            -Potencia
            -Tipo de combustível
      -Criar um turbocompressor
           -Apenas use rs registados e com privilégios admin  
      -Editar um turbocompresor
           -Apenas users registados e com privilégios admin  
      -Eliminar um turbocompressor
           -Apenas users registados e com privilégios admin

# Comentários
      -Listar todos os comentários para um turbocompressor
      -Listar um comentário
      -Criar um comentário
            -Apenas users registados e autenticados
      -Editar um comentário
            -Apenas user autenticado e proprietário 
      -Apagar um comentário
            -Apenas user autenticado e proprietário 

# Avaliações (1 a 5)
      -Listar todas as avaliações para um turbocompressor
      -Listar uma avaliação
      -Criar uma avaliação
            -Apenas users registados e autenticados
      -Editar uma avaliação
            -Apenas user autenticado e proprietário 
      -Apagar uma avaliação
            -Apenas user autenticado e proprietário 


# Users e autenticação
      -Registo
            -Uso de e-mail e password
            -passwords encriptadas através do bcryptjs
      -Login
            -Uso de e-mail e password
      -Logout