# Visualizador de Perfil do GitHub

Mini projeto web para buscar e exibir dados públicos de um usuário do GitHub a partir da API oficial.

## Funcionalidades

- Busca de perfil pelo nome de usuário (`username`) do GitHub.
- Consulta de dados na API `https://api.github.com/users/{username}`.
- Exibição de informações principais do perfil:
  - Avatar
  - Nome e login
  - Biografia
  - Seguidores, seguindo e repositórios públicos
  - Localização, empresa e site
- Busca ao clicar no botão **Buscar**.
- Busca ao pressionar a tecla **Enter** no campo de pesquisa.
- Tratamento de cenários comuns:
  - Campo vazio
  - Usuário não encontrado
  - Erro de requisição
- Interface responsiva para diferentes tamanhos de tela.

## Tecnologias utilizadas

- **HTML5** para estrutura da página.
- **CSS3** para estilização, animações e responsividade.
- **JavaScript (ES6+)** para lógica da busca, consumo da API e atualização dos dados na interface.
- **GitHub REST API** para obtenção dos dados públicos dos usuários.

## Estrutura do projeto

- `index.html`: estrutura principal da aplicação.
- `src/css/styles.css`: estilos base e layout.
- `src/css/animations.css`: efeitos de animação.
- `src/css/responsive.css`: ajustes para responsividade.
- `src/js/index.js`: lógica de busca e preenchimento dos dados do perfil.

## Como usar

1. Abra o projeto no navegador.
2. Digite um nome de usuário do GitHub no campo de busca.
3. Clique em **Buscar** ou pressione **Enter**.
4. Veja os dados do perfil exibidos na tela.
