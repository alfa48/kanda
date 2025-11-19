
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Tile, Button, Input, Badge } from '../components/CarbonUI';
import { Plus, BookOpen, FileText, Layers, Save, Users, TrendingUp, MessageCircle } from 'lucide-react';
import { DISCIPLINES } from '../mockData';
import { Link } from 'react-router-dom';

export const TeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'create' | 'students'>('overview');
  const [createType, setCreateType] = useState<'discipline' | 'module' | 'lesson'>('lesson');
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <Layout>
      <header className="flex justify-between items-center mb-8">
        <div>
             <h1 className="text-3xl font-light text-carbon-gray100 mb-1">
                Painel de Gestão
            </h1>
            <p className="text-gray-600 text-sm">Bem-vinda, <span className="font-bold">Prof. Amélia</span>.</p>
        </div>
        <div className="flex gap-2">
             <Button 
                variant={activeTab === 'create' ? 'primary' : 'secondary'} 
                onClick={() => setActiveTab('create')}
                icon={<Plus size={16} />}
             >
                Novo Conteúdo
             </Button>
        </div>
      </header>

      {/* Summary Cards for Teacher */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Tile className="border-l-4 border-carbon-blue">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Alunos</p>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold font-mono">142</span>
                    <Users className="text-carbon-blue opacity-20" />
                </div>
            </Tile>
             <Tile className="border-l-4 border-green-500">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Mensagens</p>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold font-mono">3</span>
                    <MessageCircle className="text-green-500 opacity-20" />
                </div>
            </Tile>
             <Tile className="border-l-4 border-purple-500">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Aulas Criadas</p>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold font-mono">28</span>
                    <Layers className="text-purple-500 opacity-20" />
                </div>
            </Tile>
             <Tile className="border-l-4 border-orange-500">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Engajamento</p>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold font-mono">85%</span>
                    <TrendingUp className="text-orange-500 opacity-20" />
                </div>
            </Tile>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} label="Minhas Disciplinas" icon={<Layers size={18}/>} />
        <TabButton active={activeTab === 'students'} onClick={() => setActiveTab('students')} label="Turmas e Alunos" icon={<Users size={18}/>} />
        <TabButton active={activeTab === 'create'} onClick={() => setActiveTab('create')} label="Editor de Aulas" icon={<FileText size={18}/>} />
      </div>

      {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DISCIPLINES.map((d) => (
                  <Tile key={d.id} className="group cursor-pointer hover:border-carbon-blue relative overflow-hidden transition-all hover:shadow-lg">
                      <div className={`h-2 w-full absolute top-0 left-0 ${d.color}`}></div>
                      <div className="pt-2">
                          <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-lg">{d.name}</h3>
                              <Badge>Ativo</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">{d.description}</p>
                          
                          <div className="w-full bg-gray-100 h-px mb-4"></div>

                          <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
                              <span className="flex items-center gap-1"><Layers size={12}/> {d.modules.length} Módulos</span>
                              <span className="flex items-center gap-1"><Users size={12}/> 45 Alunos</span>
                          </div>
                          
                          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                              <Button size="sm" variant="ghost" className="flex-1 justify-center">Editar</Button>
                              <Button size="sm" variant="secondary" className="flex-1 justify-center">Gerir</Button>
                          </div>
                      </div>
                  </Tile>
              ))}
              <div 
                onClick={() => setActiveTab('create')}
                className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-8 text-gray-400 hover:border-carbon-blue hover:text-carbon-blue transition-colors cursor-pointer min-h-[200px]"
              >
                  <Plus size={32} className="mb-2" />
                  <span className="font-bold">Criar Nova Disciplina</span>
              </div>
          </div>
      )}

      {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                  <Tile>
                      <h2 className="font-bold text-lg mb-6 pb-2 border-b border-gray-100">Criar/Editar Conteúdo</h2>
                      
                      {/* Type Selector */}
                      <div className="flex gap-4 mb-6 bg-gray-50 p-2 rounded inline-flex">
                          {['discipline', 'module', 'lesson'].map((t) => (
                              <label key={t} className={`flex items-center cursor-pointer px-3 py-2 rounded transition-colors ${createType === t ? 'bg-white shadow-sm text-carbon-blue font-bold' : 'text-gray-500 hover:bg-gray-200'}`}>
                                  <input 
                                    type="radio" 
                                    name="type" 
                                    checked={createType === t} 
                                    onChange={() => setCreateType(t as any)}
                                    className="hidden"
                                  />
                                  <span className="capitalize text-sm">{t === 'lesson' ? 'Aula/Tópico' : t === 'module' ? 'Módulo' : 'Disciplina'}</span>
                              </label>
                          ))}
                      </div>

                      <form className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                             <div className="col-span-2 md:col-span-1">
                                <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Disciplina Alvo</label>
                                <select className="w-full h-10 bg-gray-100 border-b border-gray-300 px-3 text-sm focus:border-carbon-blue focus:outline-none">
                                    {DISCIPLINES.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                             </div>
                             {createType === 'lesson' && (
                                <div className="col-span-2 md:col-span-1">
                                    <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Módulo</label>
                                    <select className="w-full h-10 bg-gray-100 border-b border-gray-300 px-3 text-sm focus:border-carbon-blue focus:outline-none">
                                        <option>Selecione um módulo...</option>
                                        {DISCIPLINES[0].modules.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                                    </select>
                                </div>
                             )}
                          </div>

                          <Input 
                            label="Título" 
                            placeholder={createType === 'lesson' ? "Ex: Introdução à Trigonometria" : "Ex: Matemática Avançada"}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />

                          {createType === 'lesson' && (
                              <div>
                                  <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Conteúdo (Markdown Suportado)</label>
                                  <textarea 
                                    className="w-full h-64 p-4 bg-gray-50 border border-gray-200 focus:border-carbon-blue focus:outline-none font-mono text-sm"
                                    placeholder="# Título da Aula&#10;&#10;Escreva o conteúdo aqui..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                  ></textarea>
                                  <p className="text-xs text-gray-400 mt-1 text-right">Suporta Markdown básico</p>
                              </div>
                          )}
                          
                          {createType !== 'lesson' && (
                              <Input label="Descrição Curta" placeholder="Uma breve descrição para os alunos..." />
                          )}

                          <div className="pt-4 flex justify-end gap-2">
                              <Button variant="ghost" onClick={() => setActiveTab('overview')}>Cancelar</Button>
                              <Button icon={<Save size={16} />}>Publicar Conteúdo</Button>
                          </div>
                      </form>
                  </Tile>
              </div>

              {/* Preview Sidebar */}
              <div>
                  <Tile className="sticky top-8 bg-gray-50 border-dashed">
                      <h3 className="text-xs font-bold uppercase text-gray-400 mb-4">Pré-visualização</h3>
                      <div className="bg-white p-4 border border-gray-200 shadow-sm min-h-[200px]">
                          {title ? (
                              <>
                                <h1 className="text-xl font-bold text-gray-900 mb-2">{title}</h1>
                                <div className="h-1 w-10 bg-carbon-blue mb-4"></div>
                                {createType === 'lesson' && content ? (
                                    <p className="text-sm text-gray-600 whitespace-pre-line">{content}</p>
                                ) : (
                                    <p className="text-sm text-gray-400 italic">O conteúdo aparecerá aqui...</p>
                                )}
                              </>
                          ) : (
                              <div className="flex flex-col items-center justify-center h-40 text-gray-300">
                                  <BookOpen size={32} className="mb-2" />
                                  <span className="text-sm">Comece a editar</span>
                              </div>
                          )}
                      </div>
                  </Tile>
              </div>
          </div>
      )}

        {activeTab === 'students' && (
            <Tile>
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="font-bold text-lg">Registo de Alunos</h2>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Input placeholder="Pesquisar por nome..." className="mb-0 w-full" />
                        <Button variant="secondary">Filtrar</Button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-xs border-b border-gray-200">
                            <tr>
                                <th className="p-4">Nome</th>
                                <th className="p-4">Curso Alvo</th>
                                <th className="p-4">Nível</th>
                                <th className="p-4">Desempenho</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-medium flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">CS</div>
                                    Carlos Silva
                                </td>
                                <td className="p-4">Eng. Informática</td>
                                <td className="p-4"><Badge>Nível 4</Badge></td>
                                <td className="p-4">
                                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-[75%]"></div>
                                    </div>
                                </td>
                                <td className="p-4 text-green-600 font-bold text-xs uppercase">Ativo</td>
                                <td className="p-4"><Button variant="ghost" size="sm">Detalhes</Button></td>
                            </tr>
                             <tr className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-medium flex items-center gap-2">
                                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">AP</div>
                                    Ana Paula
                                </td>
                                <td className="p-4">Medicina</td>
                                <td className="p-4"><Badge>Nível 2</Badge></td>
                                <td className="p-4">
                                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-500 w-[45%]"></div>
                                    </div>
                                </td>
                                <td className="p-4 text-orange-500 font-bold text-xs uppercase">Pendente</td>
                                <td className="p-4"><Button variant="ghost" size="sm">Detalhes</Button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Tile>
        )}
    </Layout>
  );
};

const TabButton = ({ active, onClick, label, icon }: any) => (
    <button 
        className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${active ? 'border-carbon-blue text-carbon-blue bg-gray-50' : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
        onClick={onClick}
    >
        {icon}
        {label}
    </button>
);
