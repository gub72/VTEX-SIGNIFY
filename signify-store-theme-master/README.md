# BOILERPLATE | VTEX.IO

<br />

# 📃 <span id="sobre">Sobre</span>

Este boilerplate se baseia no projeto da própria VTEX, chamado <a href="https://github.com/vtex-apps/store-theme">Store Theme</a>. Que possibilita o desenvolvimento da loja direto na nuvem como se fosse um ambiente local com o conceito de workspace, nosso desenvolvimento de frente de loja fica espelhado com os produtos que existem na loja e as páginas

<br >

# 🧩 Setup

### 1. Node.js, NVM, Terminal linux

Para eliminar problemas de setup e não necessitar de um ambiente estilo docker para rodar o projeto, verifique os pontos abaixo:

Tenha em mente que seu ambiente precisa estar rodando uma distro linux/unix ou estar trabalhando com algo como WSL caso seja windows. Para tal, deixo um exemplo de link para que você possa configurar o WSL2 no seu ambiente. https://www.omgubuntu.co.uk/how-to-install-wsl2-on-windows-10

A mesma nota para versões do Node.js. Utilize pacote NVM para que seja possível trocar entre versões do node facilmente nos seus projetos: https://github.com/nvm-sh/nvm

Certifique-se de ter o <a href="https://github.com/nvm-sh/nvm">nvm</a>(node version manager) instalado em seu terminal digitando:

```
nvm -v
```

Para utilizar o projeto é necessário ter o npm instalado na versão:

NPM:

```
> 6.14.11
```

e Node na versão:

```
v14.16.0
```

ter instalado o toolbelt da vtex

```
npm install -g vtex
```

com o tollbelt da vtex instalado precisa verificar se a loja já está preparada pra IO

```
$ vtex edition get
 info: Current edition for account ioinfracommerce is vtex.edition-store@3.12.0
```

OBS : Se a edition estiver "vtex.edition-business" será necessário abrir um chamado
solicitando a instalação da edition store além da configuração do Tenant System
para funcionar 100%

usuários windows instalar este complemento como administrador
``
npm install --global windows-build-tools

````
<br />

<br />

# 🔨Tecnologias utilizadas

O projeto foi desenvolvido utilizando as ferramentas:

- [Json](https://www.json.org/json-en.html)
- [Sass](https://sass-lang.com/)
- [React](https://pt-br.reactjs.org/)
- [Graphql](https://graphql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/)
- [Editor Config](https://editorconfig.org/)
- [StyleGuide](https://styleguide.vtex.com/)
  \
  \
  <br >

# ❓ Referência e Documentação

- [Documentação Vtex](https://developers.vtex.com/vtex-developer-docs/docs/welcome)

- [Treinamento Base](https://learn.vtex.com/page/onboarding-lang-pt)

- [Store Discussion](https://github.com/vtex-apps/store-discussion)

- [Canal do Youtube](https://zoom.us/j/282720990?pwd=MkhFajhPS0xxZGppVjhNSm9MeUVJdz09&status=success)

- [Form Solicitação de Apps Node](https://docs.google.com/forms/d/e/1FAIpQLSfhuhFxvezMhPEoFlN9yFEkUifGQlGP4HmJQgx6GP32WZchBw/viewform)

\
<br>

# 🧩 Estrutura do Projeto

```ruby
📦.vscode
 ┣ 📜extensions.json #extensões recomendadas
 ┗ 📜settings.json #padronizações iniciais para o vscode
 📦assets  # pasta que sincroniza com o files na vtex
 ┣ 📂figma
 ┣ 📂fonts
 ┣ 📂images
 ┗ 📂svg
 📦docs  #documentos pertinentes ao projeto
 📦email-transacional  #htmls para o message center
 ⚛️react  # pasta com os componentes customs
 📦sitemap  #estrutura do sitemap
 📦store # pasta principal dos blocks do store framework
  ┣ 📂blocks
  ┃ ┣ 📂components  #blocos que podem ser compartilhados e mais de uma estrutura
  ┃ ┣ 📂custom #estrutura dos blocos para landing pages / institucionais
  ┃ ┣ 📂footer #estrutura dos blocos para a footer
  ┃ ┣ 📂header #estrutura dos blocos para a header
  ┃ ┣ 📂home  #estrutura dos blocos para a home
  ┃ ┣ 📂pdp #estrutura dos blocos da pdp
  ┃ ┣ 📂search # estrutua dos blocos para catalog e busca
  ┣ 📜blocks.jsonc  # blocos gerais
  ┣ 📜plugins.json
  ┗ 📜routes.json  # vincula block a rota especifica
  📦styles  #pasta padrão para a estilização
 ┣ 📂configs
 ┃ ┣ 📜font-face.css  #arquivo que vincula fonts externas
 ┃ ┗ 📜style.json  # styleguide padrão do store framework
 ┣ 📂css  # pasta com a saída dos arquivos do sass. não manipular!
 ┣ 📂iconpacks
 ┃ ┗ 📜iconpack.svg # arquivo com os ícones padrões do store framework
 ┗ 📂scss  # pasta que será trabalhada o css
 ┃ ┣ 📂account
 ┃ ┣ 📂components
 ┃ ┃ ┗ 📂newsletter
 ┃ ┣ 📂contact
 ┃ ┣ 📂faq
 ┃ ┣ 📂footer
 ┃ ┣ 📂header
 ┃ ┣ 📂home
 ┃ ┣ 📂product
 ┃ ┣ 📂variables  # estilização para sobrescrever o padrão do store framework
 ┃ ┃ ┣ 📜_all.scss
 ┃ ┃ ┣ 📜_box.scss
 ┃ ┃ ┣ 📜_buttons.scss
 ┃ ┃ ┣ 📜_colors.scss
 ┃ ┃ ┣ 📜_media-queries.scss
 ┃ ┃ ┗ 📜_typography.scss
📜.editorconfig  # padronização de código
📜.env           # variavies de ambiente
📜.gitignore     # arquivos ignorados para o commit
📜.vtexignore    # arquivos que serão ignorados do build da vtex
📜.CHANGELOG.md  # atualizaçõe do projeto
📜manifest.json  # arquivo principal do store framework contendo os principais módulos
📜package.json   # módulos complementares ao projeto
📜README.md      # esta documentação
📜release.js     # script de release
📜resetcss.sh    # script para forçar a limpeza da pasta css

````

# 🧩 Checkout

Pra trabalhar com o checkout, o mesmo está em um projeto apartado

https://gitlab.com/infracommerce.plataformas/vtex.io/vtex-checkout-ui

<br />

# 📌 Faq (em atualizaçao)

Estaremos atualizado este faq com as principais dúvidas

<details>
  <summary>Como logar em uma loja IO? </summary>

- Solicite seu acesso a loja. Tenha certeza que a mesma já esteja preparada para o IO
- Presumo que você você já tenha o toolbelt instalado na sua máquina (npm install -g vtex)

<details>
