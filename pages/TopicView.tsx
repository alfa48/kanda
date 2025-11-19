import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Tile, Button, Badge } from '../components/CarbonUI';
import { ArrowLeft, CheckCircle, HelpCircle, PlayCircle, Lightbulb, ArrowRight } from 'lucide-react';
import { DISCIPLINES } from '../mockData';
import { Topic, ExerciseType } from '../types';
import { explainConcept } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

export const TopicView: React.FC = () => {
  const { disciplineId, moduleId, topicId } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'exercises'>('content');
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    // Simulate fetching data
    const disc = DISCIPLINES.find(d => d.id === disciplineId);
    const mod = disc?.modules.find(m => m.id === moduleId);
    const top = mod?.topics.find(t => t.id === topicId);
    if (top) setTopic(top);
  }, [disciplineId, moduleId, topicId]);

  const handleExplain = async () => {
    if (!topic) return;
    setLoadingExplanation(true);
    const text = await explainConcept(topic.title, "Matemática Pré-Universitária");
    setExplanation(text);
    setLoadingExplanation(false);
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
  };

  if (!topic) return <div className="p-8">Carregando...</div>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 pl-0">
          <ArrowLeft size={16} className="mr-2" /> Voltar ao Módulo
        </Button>

        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-carbon-gray100">{topic.title}</h1>
            <Badge type={topic.isCompleted ? 'success' : 'neutral'}>
                {topic.isCompleted ? 'Concluído' : 'Em Progresso'}
            </Badge>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
            <button 
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'content' ? 'border-carbon-blue text-carbon-blue' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                onClick={() => setActiveTab('content')}
            >
                <div className="flex items-center gap-2"><BookOpenIcon /> Teoria</div>
            </button>
            <button 
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'exercises' ? 'border-carbon-blue text-carbon-blue' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                onClick={() => setActiveTab('exercises')}
            >
                 <div className="flex items-center gap-2"><CheckIcon /> Exercícios</div>
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                {activeTab === 'content' ? (
                    <Tile className="min-h-[400px]">
                         <div className="prose prose-blue max-w-none">
                            <ReactMarkdown>{topic.content}</ReactMarkdown>
                        </div>
                        
                        <div className="mt-12 flex justify-end">
                            <Button onClick={() => setActiveTab('exercises')} icon={<ArrowRight size={16} />}>
                                Ir para Exercícios
                            </Button>
                        </div>
                    </Tile>
                ) : (
                    <div className="space-y-6">
                        {topic.exercises?.map((ex, idx) => (
                            <Tile key={ex.id}>
                                <div className="mb-4">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Questão {idx + 1}</span>
                                    <h3 className="text-lg font-medium mt-1">{ex.statement}</h3>
                                </div>
                                <div className="space-y-2">
                                    {ex.options.map((opt, i) => {
                                        let btnClass = "w-full text-left p-3 border hover:bg-gray-50 transition-colors text-sm";
                                        if (showFeedback) {
                                            if (i === ex.correctAnswer) btnClass = "w-full text-left p-3 border bg-green-50 border-green-500 text-green-800 font-medium";
                                            else if (i === selectedAnswer && i !== ex.correctAnswer) btnClass = "w-full text-left p-3 border bg-red-50 border-red-500 text-red-800";
                                        }
                                        return (
                                            <button 
                                                key={i} 
                                                className={btnClass}
                                                onClick={() => handleAnswer(i)}
                                                disabled={showFeedback}
                                            >
                                                <span className="mr-3 font-mono text-gray-400">{String.fromCharCode(65 + i)}.</span>
                                                {opt}
                                            </button>
                                        )
                                    })}
                                </div>
                                {showFeedback && (
                                    <div className="mt-4 p-4 bg-gray-50 text-sm text-gray-700 border-l-4 border-carbon-blue animate-in fade-in">
                                        <p className="font-bold mb-1">Explicação:</p>
                                        {ex.explanation}
                                    </div>
                                )}
                            </Tile>
                        ))}
                         {(!topic.exercises || topic.exercises.length === 0) && (
                             <div className="text-center py-12 text-gray-500">
                                 Sem exercícios disponíveis para este tópico.
                             </div>
                         )}
                    </div>
                )}
            </div>

            {/* Assistant Sidebar */}
            <div className="space-y-4">
                <Tile className="bg-gradient-to-b from-white to-blue-50 border-blue-100">
                    <div className="flex items-center gap-2 mb-3 text-carbon-blue">
                        <Lightbulb size={20} />
                        <h3 className="font-bold">Tutor IA</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Não entendeste bem este tópico? Posso explicar de outra forma.
                    </p>
                    <Button 
                        variant="secondary" 
                        size="sm" 
                        className="w-full justify-center" 
                        onClick={handleExplain}
                        isLoading={loadingExplanation}
                    >
                        Explicar Conceito
                    </Button>
                    
                    {explanation && (
                        <div className="mt-4 p-3 bg-white border border-blue-100 text-sm text-gray-800 rounded shadow-sm animate-in slide-in-from-top-2">
                            {explanation}
                        </div>
                    )}
                </Tile>
                
                <div className="bg-white p-4 border border-gray-200">
                     <h4 className="text-xs font-bold uppercase text-gray-500 mb-3">Recursos Extras</h4>
                     <ul className="space-y-2 text-sm">
                         <li className="flex items-center gap-2 text-carbon-blue cursor-pointer hover:underline">
                             <PlayCircle size={16} /> Vídeo Aula (15min)
                         </li>
                         <li className="flex items-center gap-2 text-carbon-blue cursor-pointer hover:underline">
                             <BookOpenIcon size={16} className="w-4 h-4" /> Resumo em PDF
                         </li>
                     </ul>
                </div>
            </div>
        </div>
      </div>
    </Layout>
  );
};

const BookOpenIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
const CheckIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>