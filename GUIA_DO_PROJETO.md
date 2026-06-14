# Guia Técnico do Projeto Vizinho Amigo

Este guia explica como o projeto está organizado e onde fazer alterações com segurança.

## Para que serve o `index.html`

O `index.html` guarda a estrutura do site. Nele ficam as telas principais:

- Tela inicial.
- Modo pessoa que cria lista de compras e necessidades.
- Modo vizinho voluntário.
- Mensagens.
- Perfil.
- Sobre o projeto.
- Cabeçalho de site.
- Hero inicial.
- Cards de funcionamento.
- Rodapé.
- Navegação inferior para celular.

Use este arquivo para alterar textos, títulos, ordem das seções e elementos da página.

## Para que serve o `style.css`

O `style.css` controla a aparência do projeto. Ele define cores, tamanhos, espaçamentos, botões, cards, responsividade, foco visível e layout de site responsivo para desktop, tablet e celular.

## Para que serve o `script.js`

O `script.js` controla o comportamento do protótipo. Ele adiciona interações como escolha de perfil, troca de abas, lista de compras e necessidades, contribuição simbólica, confirmação de lista enviada, listas simuladas da comunidade e chat.

## Para que serve o `README.md`

O `README.md` apresenta o projeto para avaliação e publicação. Ele reúne objetivo, tema do Agrinho 2026, funcionalidades implementadas, tecnologias utilizadas, estrutura de arquivos, autoria, créditos, observação sobre uso de IA e orientações para executar o site.

## Para que serve a pasta `img/`

A pasta `img/` guarda os arquivos visuais usados pelo site, principalmente a logo e os ícones SVG locais. Mantenha nessa pasta apenas imagens usadas pelo projeto final.

## Onde mudar cores

As cores principais ficam no início do `style.css`, dentro de `:root`:

```css
--verde-cuidado: #10B981;
--laranja-acolhimento: #F97316;
--fundo-neutro: #F8FAFC;
--texto-contraste: #1E293B;
```

Altere esses valores somente se a identidade visual do projeto mudar.

## Onde mudar textos

A maior parte dos textos está no `index.html`. Procure pelos títulos e parágrafos das seções.

Mensagens iniciais do chat ficam no início do `script.js`, dentro de `state.messages`.

## Onde alterar a hero

A hero fica no `index.html`, na seção `#inicio`. Ela possui:

- etiqueta do Concurso Agrinho 2026;
- título do projeto;
- slogan;
- texto explicativo;
- botões principais;
- bloco visual com logo e cards.

O layout da hero é controlado no `style.css` pelas classes `.hero-section`, `.hero-grid`, `.hero-copy`, `.hero-actions`, `.hero-visual` e `.visual-card`.

## Onde alterar cards e seções

Os cards da seção "Como funciona" ficam em `#como-funciona`, usando a classe `.cards-grid`.

Os cards de escolha de perfil ficam em `#escolha-perfil`, usando `.role-card-grid` e `.role-card`.

As seções amplas do site usam `.section-block`, `.section-heading`, `.about-section` e `.site-footer`.

## Onde alterar textos sobre o contexto rural

Os textos sobre campo, comunidades afastadas, deslocamento até a cidade e listas de compras e necessidades ficam principalmente no `index.html`, nas seções:

- `#inicio`
- `#como-funciona`
- `#sobre-home`
- `#aba-ajuda`
- `#aba-sobre`

Use esses trechos para ajustar exemplos de alimentos, remédios, materiais de construção, produtos de higiene e outros itens essenciais.

## Onde alterar confiança e segurança comunitária

A seção "Confiança entre vizinhos" fica no `index.html`, em uma seção com cards sobre:

- rank de confiança;
- cadastro comunitário;
- avaliação após a entrega;
- histórico de ajuda;
- vínculo com a comunidade.

Esses textos são conceituais e educativos. Não afirme que o site garante segurança real. Use termos como "simula", "propõe", "poderia considerar", "em uma versão real" e "com validação da comunidade".

## Onde alterar o layout responsivo

Os principais ajustes responsivos ficam no final do `style.css`, nos blocos:

```css
@media (max-width: 980px) { ... }
@media (max-width: 720px) { ... }
@media (max-width: 420px) { ... }
```

No desktop, o site usa grids em colunas. No celular, esses grids viram uma coluna, os botões ficam grandes e a navegação inferior aparece na área interativa.

## Onde mudar ícones

Os ícones ficam na pasta `img/` em formato SVG. Para trocar um ícone, substitua o arquivo correspondente ou altere o caminho no `index.html`.

Arquivos principais:

- `img/logo-vizinho-amigo.svg`
- `img/icon-ajuda.svg`
- `img/icon-compras.svg`
- `img/icon-voluntario.svg`
- `img/icon-mensagem.svg`
- `img/icon-perfil.svg`
- `img/icon-coracao.svg`
- `img/icon-local.svg`
- `img/icon-lista.svg`

## Onde mudar listas simuladas

As listas simuladas do modo vizinho voluntário ficam no `script.js`, no array `pedidosSimulados`.

Cada lista tem:

- `nome`
- `comunidade`
- `distancia`
- `itens`
- `contribuicao`

Exemplo:

```js
{
  nome: "Dona Maria",
  comunidade: "Comunidade Jardim Esperança",
  distancia: "450 m",
  itens: ["arroz", "remédio de pressão", "sabonete"],
  contribuicao: 10
}
```

## Onde mudar mensagens do chat

As mensagens iniciais ficam em `state.messages`, no `script.js`.

Novas mensagens enviadas pelo usuário aparecem apenas na tela. Não há servidor e nenhum dado real é enviado para fora do navegador.

## Onde mudar o rank de confiança

Os textos do rank de confiança aparecem no perfil educativo, dentro de `#aba-perfil`, no `index.html`.

Exemplos usados:

- Rank de confiança: Alto (simulado)
- Ajudas realizadas: 12 registros fictícios
- Cadastro comunitário: Validado pela comunidade (simulação)

Esses dados são fictícios e devem continuar deixando claro que o projeto é um protótipo educativo.

## Onde mudar telas

As telas ficam em seções do `index.html`:

- `#tela-inicial`
- `#aplicativo`
- `#aba-ajuda`
- `#aba-voluntario`
- `#aba-mensagens`
- `#aba-perfil`
- `#aba-sobre`

A exibição de cada aba é controlada pela função `setActiveTab` no `script.js`.

## Onde alterar funções principais

No `script.js`, as funções mais importantes são:

- `chooseRole`: escolhe o perfil.
- `goHome`: volta para a tela inicial.
- `openAppTab`: abre uma aba da área interativa a partir do menu superior.
- `setActiveTab`: troca de aba.
- `renderItems`: mostra a lista de compras e necessidades.
- `addItem`: adiciona item.
- `removeItem`: remove item.
- `toggleContributionField`: mostra ou oculta o valor simbólico.
- `sendOrder`: envia a lista simulada.
- `resetOrder`: limpa a lista.
- `renderVolunteerRequests`: mostra listas fictícias da comunidade.
- `acceptRequest`: registra oferta de ajuda para uma lista fictícia.
- `renderMessages`: mostra mensagens.
- `sendMessage`: envia mensagem simulada.
- `bindEvents`: conecta os botões aos eventos com `addEventListener`.
