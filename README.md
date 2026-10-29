# 📚 StudyFlow — Organizador de Objetivos de Estudo

> Uma aplicação web simples, acolhedora e eficiente desenvolvida para ajudar estudantes iniciantes a organizarem suas metas de aprendizado, prazos e rotinas de estudo com clareza e foco.

![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Bundler-646cff?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-Apache_2.0-blue)

---

## 💡 Sobre o Projeto

Quando alguém começa a estudar uma nova área (como programação, um novo idioma, matérias do vestibular ou habilidades profissionais), é comum se sentir sobrecarregado pela quantidade de conteúdos e pela falta de um caminho estruturado.

O **StudyFlow** nasceu para resolver esse problema. O aplicativo foi planejado para ser:
- **Acolhedor e sem complexidade desnecessária**: nada de dezenas de botões confusos ou configurações complexas.
- **Focado no estudante iniciante**: campos objetivos que incentivam a pensar no que estudar e quando concluir.
- **100% no navegador (Client-side)**: sem necessidade de cadastro, senhas ou servidores externos na primeira versão — seus dados ficam salvos de forma segura e imediata no `localStorage` do seu próprio navegador.

---

## 🎯 Principais Funcionalidades

### 1. ✍️ Cadastro de Objetivos de Estudo
- **Título**: Nome claro da meta (com validação amigável de campos obrigatórios).
- **Descrição / Plano de Ação**: Espaço para anotar os materiais, links ou etapas do estudo.
- **Prazo Limite (Deadline)**: Seletor de data com atalhos de clique rápido (`+1 semana`, `+15 dias`, `+1 mês`).
- **Status Inicial**: Escolha entre *Não iniciado*, *Em andamento* ou *Concluído*.
- **Área de Estudo**: Categorias temáticas (*Programação & Tech*, *Idiomas*, *Vestibular / Concurso*, *Faculdade / Escola*, *Leitura*, *Habilidades & Hábitos* ou *Geral*).

### 2. 📋 Apresentação em Cartões e Ações Rápidas
- Visualização limpa e espaçada em grade responsiva (1 a 3 colunas conforme a tela).
- Cálculo inteligente do prazo em português:
  - *Faltam X dias*;
  - *Vence hoje!*;
  - *Vence amanhã*;
  - *Atrasado há X dias*.
- Conclusão com um clique diretamente no cartão (marcar/desmarcar).
- Mudança rápida de status através de menu suspenso integrado no próprio cartão.

### 3. ✏️ Edição Completa
- Edição de qualquer dado de um objetivo com formulário pré-preenchido e validações automáticas.

### 4. 🛡️ Exclusão Segura com Modal de Confirmação
- Exclusão **somente após confirmação explícita**.
- Modal de confirmação que exibe o título da meta que será excluída, prevenindo remoções acidentais.

### 5. 📊 Painel de Métricas e Quantidade de Objetivos
- Contagem em tempo real do **Total de Objetivos Cadastrados**.
- Indicadores de metas **Em Andamento**, **Concluídas** e **Não Iniciadas / Atrasadas**.
- **Barra de Progresso com Taxa de Conclusão (%)** para incentivar a motivação contínua.

### 6. 🔍 Busca, Filtros e Ordenação
- Busca textual em tempo real no título e na descrição.
- Filtros por status (*Todos*, *Não iniciados*, *Em andamento*, *Concluídos*) com contadores numéricos.
- Ordenação por:
  - Prazo mais próximo;
  - Prazo mais distante;
  - Mais recentes cadastrados;
  - Ordem alfabética (A-Z).

### 7. 🚀 Experiência para Iniciantes
- **Metas de Exemplo Prontas**: Botão de inspiração para estudantes que ainda não sabem como estruturar suas metas.
- **Dicas para Iniciantes**: Dicas práticas rotativas sobre técnicas consagradas, como Método Pomodoro, Metas Quebradas e Consistência.
- **Estados Vazios Acolhedores**: Mensagens positivas e orientações claras quando nenhum objetivo foi cadastrado ou quando um filtro não encontrou resultados.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
| :--- | :--- |
| **React 19** | Biblioteca declarativa para construção da interface de usuário em componentes reutilizáveis |
| **TypeScript** | Tipagem estática rigorosa para garantir segurança, confiabilidade e facilidade de manutenção |
| **Tailwind CSS v4** | Estilização moderna e utilitária, garantindo design responsivo e visual limpo |
| **Vite** | Ferramenta de build e servidor de desenvolvimento ultra-rápido |
| **Lucide React** | Conjunto coeso de ícones funcionais para botões, status e categorizações |
| **LocalStorage API** | Persistência local no navegador, permitindo recarregar a página sem perder informações |

---

## 📁 Estrutura de Arquivos

O projeto segue boas práticas de engenharia de software com separação estrita de responsabilidades:

```text
studyflow/
├── index.html                    # Ponto de entrada HTML com fontes e meta tags
├── metadata.json                 # Metadados de identificação da aplicação
├── package.json                  # Dependências e scripts de execução
├── tsconfig.json                 # Configuração do TypeScript
├── vite.config.ts                # Configurações do Vite e Tailwind
├── README.md                     # Documentação completa do projeto
└── src/
    ├── main.tsx                  # Ponto de entrada do React
    ├── index.css                 # Importação do Tailwind e tipografia base
    ├── App.tsx                   # Componente principal e orquestrador de estado
    ├── types/
    │   └── goal.ts               # Tipos e interfaces (Goal, Status, FormData, Stats)
    ├── services/
    │   └── storageService.ts     # Camada de serviço de persistência no localStorage
    ├── utils/
    │   └── formatters.ts         # Funções utilitárias de data (pt-BR), prazos e cores
    └── components/
        ├── Header.tsx            # Barra superior com logo e ação primária
        ├── StatsOverview.tsx     # Painel de métricas, contadores e barra de progresso
        ├── FilterBar.tsx         # Barra de busca, filtros de status e ordenação
        ├── GoalCard.tsx          # Cartão de exibição do objetivo de estudo
        ├── GoalFormModal.tsx     # Modal e formulário de cadastro/edição
        ├── DeleteConfirmModal.tsx# Modal de confirmação segura para exclusão
        ├── EmptyState.tsx        # Mensagens para listas vazias ou sem resultados
        └── StudyTips.tsx         # Banner de dicas de produtividade para iniciantes
```

---

## ⚙️ Como Executar o Projeto Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior.
- Gerenciador de pacotes `npm` (incluso com o Node) ou `pnpm` / `yarn`.

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/studyflow.git
   cd studyflow
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no seu navegador:**
   Abra `http://localhost:3000` (ou o endereço indicado no terminal).

5. **Para gerar a build de produção:**
   ```bash
   npm run build
   ```

---

## 🧠 Decisões de Arquitetura

1. **Camada de Serviço Isolada (`storageService.ts`)**:
   A manipulação do `localStorage` não fica espalhada dentro dos componentes visuais. Toda leitura, escrita, cálculo de métricas e carregamento de exemplos é centralizada no serviço. Isso facilita uma futura migração para uma API REST, Firebase ou banco de dados relacional sem alterar os componentes.

2. **Prevenção de Erros Acidentais**:
   A exclusão exige confirmação em um modal dedicado que contextualiza o usuário sobre qual item será removido, atendendo a boas práticas de UX para estudantes que não querem perder seu histórico de planejamento.

3. **Validação Gentil**:
   Em vez de bloqueios rígidos ou mensagens em inglês, o formulário fornece orientações e dicas em português do Brasil com atalhos de data para acelerar a tomada de decisão.

4. **Totalmente Acessível e Responsivo**:
   Controles acessíveis via teclado (suporte a tecla `ESC` para fechar modais), contraste aprovado conforme diretrizes WCAG e layout fluido para celulares, tablets e computadores.

---

## 🗺️ Roadmap de Evoluções Futuras

- [ ] Exportação e importação de metas em arquivo JSON/CSV para backup pessoal.
- [ ] Subtarefas / checklist dentro de cada objetivo (ex: capítulos concluídos).
- [ ] Temporizador Pomodoro integrado aos cartões de estudo.
- [ ] Modo escuro (Dark Mode).
- [ ] Sincronização em nuvem opcional com autenticação de usuário.

---

## 📄 Licença

Distribuído sob a licença **Apache 2.0**. Consulte o arquivo de licença para mais informações.
