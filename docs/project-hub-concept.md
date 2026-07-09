# Project Hub Concept

## O que é?

O **Project Hub** é um estúdio de desenvolvimento de jogos integrado ao gerador de ideias. Ele reúne **Roadmap**, **Kanban** e **Checklists** em uma única interface com abas, permitindo que o usuário gerencie todo o ciclo de vida de um projeto de jogo — da ideia ao lançamento.

## Estrutura

```
┌──────────────────────────────────────────────────────┐
│  ← Dashboard    Nome do Projeto                      │
├──────────────────────────────────────────────────────┤
│  [ Roadmap ]  [ Kanban ]  [ Checklists ]             │
├──────────────────────────────────────────────────────┤
│                                                        │
│  ┌─ Conteúdo dinâmico conforme a aba ativa ─────────┐ │
│  │                                                    │ │
│  │  Roadmap: timeline de fases com cards de           │ │
│  │            entregáveis e prazos                    │ │
│  │                                                    │ │
│  │  Kanban: quadro com colunas Backlog → To Do →     │ │
│  │          Doing → Review → Done                    │ │
│  │                                                    │ │
│  │  Checklists: seções por fase com checkboxes        │ │
│  │             e barra de progresso                   │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

## Abas

### Roadmap
Timeline visual com fases de desenvolvimento. Cada fase mostra duração, status e entregáveis. (Já implementado como tela separada.)

### Kanban
Quadro de tarefas no estilo Kanban com 5 colunas:

| Coluna | Finalidade |
|---|---|
| **Backlog** | Ideias e tarefas futuras, ainda não priorizadas |
| **To Do** | Tarefas prontas para serem executadas |
| **Doing** | O que está sendo trabalhado no momento |
| **Review** | Tarefas concluídas aguardando revisão |
| **Done** | Finalizadas e validadas |

**Dois modos de criação:**

1. **Empty Board** — O usuário começa com colunas vazias e adiciona cards manualmente.
2. **From Idea** — Vincula a ideia gerada/salva e o kanban é auto-povoado com tarefas extraídas do checklist de desenvolvimento (ex: "Definir gênero", "Escolher engine", "Criar GDD", "Prototype movement", "Design do primeiro nível").

Cada card pode conter:
- Título da tarefa
- Descrição opcional
- Prioridade (baixa, média, alta) — indicada por cor
- Fase relacionada (Pré-Produção, Protótipo, Produção, etc.)
- Link para item correspondente no Checklist

### Checklists
Baseado nos documentos em `docs/Learning/`, as checklists são organizadas por fase de desenvolvimento:

- **Pré-Produção** — Conceito, Pesquisa, GDD
- **Planejamento** — Roadmap, Milestones, Kanban
- **Protótipo** — Gameplay, Mecânicas, Testes
- **Arte** — Concept, Modelagem, Texturas, Animações, UI
- **Level Design** — Planejamento, Cenários, Decoração, Iluminação
- **Programação** — Core, Gameplay, Multiplayer
- **Áudio** — Música, Efeitos, Vozes
- **Polish** — Feedback, Visual, UX
- **Otimização** — Performance, Assets, Código
- **QA** — Testes, Bugs
- **Publicação** — Steam, Marketing, Build
- **Pós-Lançamento** — Correções, Conteúdo

Cada item é um checkbox com progresso calculado por fase e total.

## Integração com o App

### Fluxo do usuário

1. Gera uma ideia ou cria manualmente
2. Opção: **"Criar Projeto"** a partir da ideia
3. É redirecionado para `/dashboard/studio/[id]`
4. Dentro do Project Hub:
   - **Roadmap** mostra as fases sugeridas para aquele tipo de jogo
   - **Kanban** já vem populado com tarefas iniciais (se "From Idea")
   - **Checklists** mostram tudo que precisa ser feito, fase a fase

### Dados (Zustand)

```typescript
interface Project {
  id: string
  name: string
  ideaId?: string
  createdAt: number
  columns: KanbanColumn[]
  checklistProgress: Record<string, boolean>
}

interface KanbanColumn {
  id: string
  title: string
  tasks: KanbanTask[]
}

interface KanbanTask {
  id: string
  title: string
  description?: string
  phase?: string
  priority: 'low' | 'medium' | 'high'
  checklistItemId?: string
}
```

### Próximos passos (site)

- Adicionar "Studio" na sidebar do dashboard
- Criar rota `/dashboard/studio/[id]`
- Componentes: `ProjectHub`, `KanbanBoard`, `ChecklistPanel`, `TabBar`
- Estender Zustand store com suporte a projetos
- Lógica de auto-popular kanban a partir da ideia + Learning docs
