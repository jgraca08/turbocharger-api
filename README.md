# API Backend para site turbocompressores

Criar backend para site de turbocompressores com funções CRUD com as tecnologias NodeJS + ExpressJS + MongoDB

## Marcas
     -Listar todas as marcas 
            -Paginação com limite de itens por página
      -Listar uma marca
            -imagem
      -Criar uma marca
           -Apenas users registados e com privilégios admin  
      -Editar uma marca
           -Apenas users registados e com privilégios admin  
      -Eliminar uma marca
           -Apenas users registados e com privilégios admin

## Turbocompressores
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

## Comentários
      -Listar todos os comentários para um turbocompressor
      -Listar um comentário
      -Criar um comentário
            -Apenas users registados e autenticados
      -Editar um comentário
            -Apenas user autenticado e proprietário 
      -Apagar um comentário
            -Apenas user autenticado e proprietário 

## Avaliações (1 a 5)
      -Listar todas as avaliações para um turbocompressor
      -Listar uma avaliação
      -Criar uma avaliação
            -Apenas users registados e autenticados
      -Editar uma avaliação
            -Apenas user autenticado e proprietário 
      -Apagar uma avaliação
            -Apenas user autenticado e proprietário 


## Users e autenticação
      -Registo
            -Uso de e-mail e password
            -passwords encriptadas através do bcryptjs
      -Login
            -Uso de e-mail e password
      -Logout