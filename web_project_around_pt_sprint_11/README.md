Tripleten web_project_around_pt

Este repositório contém a implementação do Projeto 8, seguindo todas as especificações e requisitos técnicos definidos no curso. O objetivo é criar uma página interativa com cartões dinâmicos, modais funcionais, validação completa de formulários e manipulação de DOM utilizando JavaScript puro.

🚀 Sobre o Projeto
O projeto consiste em uma página web composta por cartões gerados dinamicamente, um sistema de pop-ups/modais e funcionalidades completas para criação, edição, visualização e remoção de cards. A interface e as interações foram implementadas seguindo boas práticas de JavaScript, organização de arquivos e estilo de código.

🧩 Funcionalidades Implementadas
✔️ Cards Dinâmicos

- Os cards iniciais são gerados a partir de um elemento <template> utilizando os dados do array initialCards.
- A estrutura de cada card é criada pela função getCardElement(), que agora trabalha diretamente com dados validados, dispensando os valores padrão usados anteriormente.

✔️ Interações com os Cards

- O botão de curtir alterna estado visual.
- O botão de exclusão remove o card do DOM.
- Ao clicar na imagem, um modal abre a visualização ampliada com título.

✔️ Criação de Novos Cards

- O formulário “Novo Local” agora possui validação completa: o título deve ter entre 2 e 30 caracteres e o link deve ser uma URL válida.
- As mensagens de erro seguem o padrão do navegador e aparecem logo abaixo dos campos.
- O botão “Salvar” permanece inativo enquanto algum campo estiver inválido e é ativado apenas quando ambos são preenchidos corretamente, seguindo o estilo definido no design.
- Após o envio, o card é criado e inserido como primeiro item da lista.

✔️ Edição de Perfil

- O modal “Editar Perfil” tem preenchimento automático com os dados atuais.
- Seus campos também são validados: o nome deve ter entre 2 e 40 caracteres e o campo “Sobre” entre 2 e 200.
- Enquanto houver erros, o botão “Salvar” permanece desabilitado e com a estilização de estado inativo.
- Quando ambos os campos são válidos, o botão ativa e o envio atualiza o perfil.

✔️ Modais e Comportamentos de Fechamento

- Todos os modais podem ser abertos e fechados pelas funções openModal() e closeModal().
- Agora eles também podem ser fechados ao clicar na área de sobreposição (overlay), garantindo um comportamento intuitivo.
- Além disso, é possível fechar qualquer modal pressionando a tecla Esc, fazendo o sistema responder de forma consistente às interações do usuário.

👨‍💻 Boas Práticas e Qualidade do Código
🟦 Estilo de Código

- Variáveis e funções têm nomes claros, descritivos e coerentes.
- Uso consistente de camelCase.
- Funções realizam apenas uma tarefa.
- Sem abreviações que prejudiquem a legibilidade.

🟦 Estrutura e Lógica

- Elementos do DOM armazenados em const.
- Zero uso de innerHTML com dados do usuário, garantindo segurança.
- Nenhum trecho duplicado ou código morto.
- DOM montado antes da inserção de elementos, melhorando desempenho.
- Validações integradas e consistentes em todos os formulários.

🛠 Tecnologias Utilizadas

HTML5

- CSS3
- JavaScript (ES6+)
- Manipulação de DOM
- Estrutura modular organizada (blocks, images, scripts)
