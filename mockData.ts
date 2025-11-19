
import { Discipline, Achievement, User, Recommendation, ExerciseType, Teacher, Message } from './types';

export const TEACHERS: Teacher[] = [
  {
    id: 't1',
    name: 'Prof. Amélia Zola',
    specialty: 'Matemática & Física',
    bio: 'Apaixonada por ensinar exatas de forma simples. Mestre em Engenharia Civil.',
    avatarUrl: 'https://i.pravatar.cc/150?u=t1'
  },
  {
    id: 't2',
    name: 'Dr. João Mavungo',
    specialty: 'Biologia & Química',
    bio: 'Doutorado em Bioquímica. Preparo alunos para Medicina há 10 anos.',
    avatarUrl: 'https://i.pravatar.cc/150?u=t2'
  }
];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Carlos Silva',
  email: 'carlos@kanda.ao',
  role: 'student',
  targetCourse: 'Engenharia Informática',
  academicLevel: 4,
  streakDays: 4,
  totalXP: 1250,
  teacherId: 't1'
};

// Helper to simulate logged in teacher
export const MOCK_TEACHER_ACCOUNT: User = {
  id: 't1',
  name: 'Prof. Amélia Zola',
  email: 'amelia@kanda.ao',
  role: 'teacher',
  specialty: 'Matemática & Física',
  bio: 'Apaixonada por ensinar exatas de forma simples. Mestre em Engenharia Civil pela UAN. Leciono há 15 anos com foco em preparação para exames nacionais.',
};

export const MESSAGES: Message[] = [
  {
    id: 'm1',
    senderId: 't1',
    receiverId: 'u1',
    content: 'Olá Carlos! Vi que tiveste um ótimo desempenho em Álgebra. Continua assim!',
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    isRead: true
  },
  {
    id: 'm2',
    senderId: 'u1',
    receiverId: 't1',
    content: 'Obrigado Professora. Tenho uma dúvida na questão 3 do módulo de Matrizes.',
    timestamp: new Date(Date.now() - 4000000), // few hours ago
    isRead: true
  },
  {
    id: 'm3',
    senderId: 't1',
    receiverId: 'u1',
    content: 'Claro, podes enviar a foto do teu cálculo? Vou analisar.',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    isRead: false
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', title: 'Primeiros Passos', description: 'Completaste a tua primeira aula.', icon: '🚀', unlocked: true },
  { id: 'a2', title: 'Disciplinado', description: 'Estudaste 3 dias seguidos.', icon: '📅', unlocked: true },
  { id: 'a3', title: 'Mestre da Matéria', description: '100% em um simulado.', icon: '🏆', unlocked: false },
  { id: 'a4', title: 'Maratona', description: '10 aulas concluídas.', icon: '📚', unlocked: false },
];

export const RECOMMENDATIONS: Recommendation[] = [
  { id: 'r1', type: 'content', title: 'Revisar Logaritmos', reason: 'Desempenho baixo no último teste', targetId: 't2' },
  { id: 'r2', type: 'exercise', title: 'Simulado de Física', reason: 'Hora de testar a Cinemática', targetId: 'sim1' },
];

export const DISCIPLINES: Discipline[] = [
  {
    id: 'math',
    name: 'Matemática',
    description: 'Álgebra, Geometria, Cálculo e Estatística.',
    progress: 45,
    color: 'bg-blue-600',
    modules: [
      {
        id: 'm1',
        disciplineId: 'math',
        title: 'Álgebra Linear',
        description: 'Vetores, Matrizes e Sistemas Lineares',
        order: 1,
        topics: [
          {
            id: 't1',
            moduleId: 'm1',
            title: 'Introdução aos Vetores',
            order: 1,
            isCompleted: true,
            content: `
# Vetores
Vetores são segmentos de reta orientados que possuem módulo, direção e sentido.

### Propriedades
1. **Módulo**: O tamanho do vetor.
2. **Direção**: A reta suporte onde o vetor se encontra.
3. **Sentido**: A orientação (para onde a seta aponta).

### Operações Básicas
* **Soma**: Regra do paralelogramo.
* **Subtração**: Soma com o vetor oposto.
            `,
            exercises: [
              {
                id: 'e1',
                topicId: 't1',
                statement: 'Qual das opções abaixo define um vetor?',
                type: ExerciseType.MULTIPLE_CHOICE,
                options: ['Apenas um número', 'Módulo, direção e sentido', 'Apenas direção', 'Uma matriz 2x2'],
                correctAnswer: 1,
                explanation: 'Um vetor é definido por essas três grandezas: magnitude (módulo), direção e sentido.'
              }
            ]
          },
          {
            id: 't2',
            moduleId: 'm1',
            title: 'Matrizes e Determinantes',
            order: 2,
            isCompleted: false,
            content: `
# Matrizes
Uma matriz é uma tabela organizada em linhas e colunas no formato m x n.

### Determinantes
O determinante é um número associado a uma matriz quadrada que tem várias aplicações, como resolver sistemas lineares.
            `,
             exercises: [
              {
                id: 'e2',
                topicId: 't2',
                statement: 'O determinante só pode ser calculado para:',
                type: ExerciseType.MULTIPLE_CHOICE,
                options: ['Matrizes Retangulares', 'Qualquer Matriz', 'Matrizes Quadradas', 'Vetores'],
                correctAnswer: 2,
                explanation: 'Apenas matrizes quadradas (número de linhas igual ao número de colunas) possuem determinante.'
              }
            ]
          }
        ]
      },
       {
        id: 'm2',
        disciplineId: 'math',
        title: 'Cálculo I',
        description: 'Limites, Derivadas e Integrais',
        order: 2,
        topics: []
       }
    ]
  },
  {
    id: 'phy',
    name: 'Física',
    description: 'Mecânica, Termodinâmica, Eletricidade.',
    progress: 20,
    color: 'bg-purple-600',
    modules: [
      {
        id: 'mp1',
        disciplineId: 'phy',
        title: 'Cinemática',
        description: 'Estudo do movimento.',
        order: 1,
        topics: [
           {
            id: 'tp1',
            moduleId: 'mp1',
            title: 'Velocidade Média',
            order: 1,
            isCompleted: true,
            content: 'A velocidade média é a razão entre o deslocamento e o intervalo de tempo.',
             exercises: []
          }
        ]
      }
    ]
  },
  {
    id: 'chem',
    name: 'Química',
    description: 'Química Geral, Orgânica e Físico-Química.',
    progress: 10,
    color: 'bg-teal-600',
    modules: []
  },
    {
    id: 'bio',
    name: 'Biologia',
    description: 'Citologia, Genética e Ecologia.',
    progress: 0,
    color: 'bg-green-600',
    modules: []
  }
];
