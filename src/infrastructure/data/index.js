export const workspaceContent = {
  office: {
    brand: 'MTC',
    heroTitle: 'More Than Coding',
    heroSubtitle: 'Let SOLO handle all your office tasks',
    heroDescription:
      'Help you organize literature reviews, create PPTs, analyze Excel data and other daily work, output professional deliverables.',
    accent: 'violet',
    cards: [
      {
        id: 'reading',
        icon: 'reading',
        title: 'Web Reading',
        description: 'Read online papers to produce literature reviews.',
      },
      {
        id: 'research',
        icon: 'research',
        title: 'Research and Analysis',
        description: 'Research video platforms and generate presentation.',
      },
      {
        id: 'mining',
        icon: 'mining',
        title: 'Data Mining',
        description: 'Mine AI market data and analyze data trends.',
      },
      {
        id: 'content',
        icon: 'content',
        title: 'Content creation',
        description: 'Generate promotional posts with materials.',
      },
    ],
  },
  code: {
    brand: 'Code',
    heroTitle: 'Code with SOLO',
    heroSubtitle: 'Let SOLO handle all your development tasks',
    heroDescription:
      'Help you write code, debug, optimize performance and other development work, deliver production-ready code.',
    accent: 'green',
    cards: [
      {
        id: 'app-dev',
        icon: 'app',
        title: 'Application Development',
        description: 'Implement a multi-language learning platform.',
      },
      {
        id: 'understanding',
        icon: 'project',
        title: 'Project Understanding',
        description: 'Analyze project repository and generate code wiki.',
      },
      {
        id: 'game',
        icon: 'game',
        title: 'Game Creativity',
        description: 'Create a pixel art mecha battle game.',
      },
      {
        id: 'automation',
        icon: 'automation',
        title: 'Automation Tools',
        description: 'Write an automation tool to collect data.',
      },
    ],
  },
}

export const skillCategories = [
  'All',
  'Developer Tools',
  'Data Analysis',
  'UI Design',
  'Content Creation',
  'Productivity',
]

export const skills = [
  {
    id: 'composition-patterns',
    provider: 'Vercel',
    category: 'Developer Tools',
    title: 'composition-patterns',
    description:
      'Design scalable React component architectures using composition patterns including compound components.',
    icon: 'vercel',
  },
  {
    id: 'frontend-design',
    provider: 'Anthropic',
    category: 'UI Design',
    title: 'frontend-design',
    description:
      'Build distinctive, production-grade frontend interfaces with polished UI design that avoids generic AI aesthetics.',
    icon: 'ai',
  },
  {
    id: 'gh-cli',
    provider: 'GitHub',
    category: 'Developer Tools',
    title: 'gh-cli',
    description:
      'A comprehensive GitHub CLI reference for managing repositories, issues, pull requests and Actions.',
    icon: 'github',
  },
  {
    id: 'git-commit',
    provider: 'GitHub',
    category: 'Developer Tools',
    title: 'git-commit',
    description:
      'Execute git commits with intelligent staging, commit message generation and branch hygiene.',
    icon: 'github',
  },
  {
    id: 'mcp-builder',
    provider: 'Anthropic',
    category: 'Developer Tools',
    title: 'mcp-builder',
    description:
      'A guide to building high-quality MCP servers that connect LLMs to external APIs and services.',
    icon: 'ai',
  },
  {
    id: 'react-best-practices',
    provider: 'Vercel',
    category: 'Developer Tools',
    title: 'react-best-practices',
    description:
      "Apply Vercel Engineering's React and Next.js performance optimization guidelines when writing, reviewing or refactoring.",
    icon: 'vercel',
  },
  {
    id: 'react-native-skills',
    provider: 'Vercel',
    category: 'Developer Tools',
    title: 'react-native-skills',
    description:
      'Apply React Native and Expo best practices for building performant mobile apps covering animations and lists.',
    icon: 'vercel',
  },
  {
    id: 'redis-development',
    provider: 'Redis',
    category: 'Data Analysis',
    title: 'redis-development',
    description:
      'Apply Redis best practices and performance optimization across data structures, vector search and semantic memory.',
    icon: 'redis',
  },
  {
    id: 'security-best-practices',
    provider: 'OpenAI',
    category: 'Productivity',
    title: 'security-best-practices',
    description:
      'Review code for security best practices and suggest improvements across Python, JavaScript and TypeScript.',
    icon: 'openai',
  },
  {
    id: 'web-artifacts-builder',
    provider: 'Anthropic',
    category: 'Content Creation',
    title: 'web-artifacts-builder',
    description:
      'Build complex, multi-component HTML artifacts using React, Tailwind CSS and shadcn/ui for production projects.',
    icon: 'ai',
  },
  {
    id: 'webapp-testing',
    provider: 'Anthropic',
    category: 'Productivity',
    title: 'webapp-testing',
    description:
      'Test and debug local web applications using Playwright, with support for screenshots and browser log inspection.',
    icon: 'ai',
  },
]

export const projects = [
  {
    id: 'mclaunch',
    name: 'mclaunch',
    workspace: 'code',
    title: 'Corregir Error URL',
    repository: 'owellandry/mclaunch',
    branch: 'master',
    updatedAt: 'Yesterday 23:11',
    prompt:
      'ya lo corregi ahora puedes tomar el diseño de la carpeta de la landing y darle este toque',
    command:
      'cd /workspace/react-landing && pnpm install --ignore-scripts && pnpm run dev --host',
    previewUrl: 'http://localhost:5175/',
    responseTitle:
      'He aplicado el diseño inspirado en la web de Minecraft a la landing page, adaptándolo a la paleta clara de tu instalador.',
    responseSections: [
      {
        heading: 'Cambios principales',
        bullets: [
          'Actualicé la paleta para usar fondos claros, superficies suaves y un acento verde para acciones clave.',
          'Reforcé tipografía y botones con recortes rectos, bordes sutiles y títulos en mayúsculas para el tono visual.',
          'Añadí una cinta inferior con movimiento y copy corto para dar presencia al hero sin recargarlo.',
          'Ajusté secciones de features y descarga para que compartan la misma jerarquía visual.',
        ],
      },
      {
        heading: 'Archivos tocados',
        bullets: [
          'tailwind.config.js',
          'src/index.css',
          'src/components/HeroSection.tsx',
          'src/components/FeaturesListSection.tsx',
          'src/components/DownloadSection.tsx',
        ],
      },
    ],
    todos: [
      'Localizar implementación actual de drag and drop',
      'Reproducir y diagnosticar por qué el drag no engancha',
      'Rediseñar el drag de canales con soporte real',
      'Conectar persistencia y asegurar el reorder',
      'Probar en desktop y mobile',
    ],
    taskOutputs: ['mclaunch-landing.patch', 'react-landing.bundle'],
    contextBreakdown: [
      ['Skills', 2],
      ['Web Search', 0],
      ['Files', 6],
      ['Other', 1],
    ],
    references: ['git-commit', 'frontend-design'],
  },
  {
    id: 'dcc',
    name: 'dcc',
    workspace: 'office',
    title: 'Diseñar Frontend para DCC',
    repository: 'owell.polanco/dcc',
    branch: 'design',
    updatedAt: 'Apr 03, 22:57',
    prompt: 'quiero que revises por favor el drag and droup por favor',
    command: 'pnpm -C apps/web type-check',
    previewUrl: 'http://localhost:3000/',
    responseTitle:
      'En canales, el draggable estaba en un wrapper, pero el área clicable real vivía dentro de un botón con draggable desactivado.',
    responseSections: [
      {
        heading: 'Qué hice',
        bullets: [
          'Moví draggable y los handlers onDragStart/onDragEnd al botón del canal.',
          'Conservé los drop targets e indicadores before/after para que el comportamiento sea consistente.',
          'Verifiqué type-check de la app web y dejé bundle con el fix listo para importar.',
        ],
      },
      {
        heading: 'Cómo aplicarlo',
        code: [
          'git checkout cambios-futuros',
          'git fetch ./dcc-dnd-fix.bundle cambios-futuros:fix-dnd',
          'git merge fix-dnd',
          'git push origin cambios-futuros',
        ],
      },
    ],
    todos: [
      'Localizar implementación actual de drag and drop',
      'Reproducir/diagnosticar por qué el drag no funciona',
      'Rediseñar el drag de canales: soporte reorder',
      'Conectar persistencia (API reorder)',
      'Probar en desktop/mobile y dejar notas',
    ],
    taskOutputs: ['dcc-frontend-layout-refactor.patch', 'dcc-backend.bundle', 'dcc-dnd-fix.bundle'],
    contextBreakdown: [
      ['Skills', 2],
      ['Web Search', 0],
      ['Files', 5],
      ['Other', 1],
    ],
    references: ['git-commit', 'frontend-design'],
  },
]
