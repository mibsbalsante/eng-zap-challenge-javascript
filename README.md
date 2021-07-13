# eng-zap-challenge-javascript :sparkles:
Teste para o grupo OLX/Zap+

Projeto criado com React.JS, Webpack, hosteado no [Netlify](https://clever-poitras-1fd452.netlify.app/)

## Como rodar
- Instalar [Yarn](https://yarnpkg.com/pt-BR/docs/install) ou [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- Clone este repositório
- Copie o arquivo `.env.example` para `.env`
- Crie uma [Chave do Maps JS API](https://developers.google.com/maps/documentation/javascript/get-api-key) e preencha o campo no arquivo `.env`
  - Será necessário ativar A Geocoding API também
- Digite `yarn install` ou `npm install` para instalar as dependências
- Digite `yarn dev` ou `npm dev` para rodar o projeto
  - Se desejar que a página abra ao rodar o projeto, use o comando `yarn dev:open` ou `npm dev:open`

### Lint
- Digite `yarn lint` ou `npm lint` para corrigir o código com *eslint* e *stylelint*
- Para corrigir erros automaticamente, digite `yarn lint:fix` ou `npm lint:fix`

### Build
- Digite `yarn build` ou `npm build` para gerar código de produção
  - Todos os arquivos de build são armazenados dentro de ./dist
- Digite `yarn start` ou `npm start' para usar o [Serve](https://github.com/vercel/serve) para rodar o projeto

## Regras de Negócio
### Para o imóvel ser listado no ZAP:
    No caso de aluguel, o valor mínimo deve ser de R$ 3.500,00.
    No caso de venda, o valor mínimo deve ser de R$ 600.000,00.

### Para o imóvel ser listado no Viva Real:
    No caso de aluguel, o valor máximo deve ser de R$ 4.000,00.
    No caso de venda, o valor máximo deve ser de R$ 700.000,00.

### Um imóvel não é elegível em NENHUM PORTAL se:
    Ele tem lat e lon iguais a 0.

### Caso o imóvel seja para venda, ele é elegível para o portal ZAP se:
    O valor do metro quadrado (chave usableAreas) não pode ser menor/igual a R$ 3.500,00 - apenas considerando imóveis que tenham usableAreas acima de 0 (imóveis com usableAreas = 0 não são elegíveis).

    Quando o imóvel estiver dentro do bounding box dos arredores do Grupo ZAP (descrito abaixo) considere a regra de valor mínimo (do imóvel) 10% menor.

### Caso o imóvel seja para aluguel, ele é elegível para o portal Viva Real se:
    O valor do condomínio não pode ser maior/igual que 30% do valor do aluguel - apenas aplicado para imóveis que tenham um monthlyCondoFee válido e numérico (imóveis com monthlyCondoFee não numérico ou inválido não são elegíveis).

    Quando o imóvel estiver dentro do bounding box dos arredores do Grupo ZAP (descrito abaixo) considere a regra de valor máximo (do aluguel do imóvel) 50% maior.

### Bounding Box Grupo ZAP:
    minlon: -46.693419
    minlat: -23.568704
    maxlon: -46.641146
    maxlat: -23.546686
