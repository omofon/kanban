# Kanban Task Management App

Idea Layout
```
src/
├── main.jsx
├── index.css
│
├── assets/                  # static files, svgs, images
│
├── components/              # reusable UI primitives
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Dropdown.jsx
│   │   ├── Checkbox.jsx
│   │   ├── Modal.jsx
│   │   └── Badge.jsx
│   │
│   ├── board/
│   │   ├── Board.jsx
│   │   ├── Column.jsx
│   │   ├── ColumnHeader.jsx
│   │   └── NewColumn.jsx
│   │
│   ├── task/
│   │   ├── TaskCard.jsx
│   │   ├── TaskDetail.jsx   # the modal you showed in the screenshots
│   │   └── TaskForm.jsx     # add / edit task form
│   │
│   └── layout/
│       ├── Sidebar.jsx
│       ├── Header.jsx
│       └── ThemeToggle.jsx
│
├── store/                   # all global state
│   ├── index.js             # combines all slices
│   ├── boardSlice.js        # boards, columns, tasks, subtasks
│   └── uiSlice.js           # sidebar open, active modal, theme
│
├── hooks/                   # custom hooks
│   ├── useTheme.js          # toggle + system detection logic
│   └── useBoard.js          # selectors for current board data
│
├── utils/
│   └── helpers.js           # id generation, reorder logic etc
│
└── pages/
    └── BoardPage.jsx        # top level page that wires everything

```