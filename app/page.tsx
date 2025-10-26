'use client'

import { useEffect } from 'react'
import { useEstudoStore } from '@/lib/store'
import Card from '@/components/Card'
import Button from '@/components/Button'

export default function HomePage() {
  const { inicializarQuestoes, estatisticas } = useEstudoStore()

  useEffect(() => {
    inicializarQuestoes()
  }, [inicializarQuestoes])

  const features = [
    {
      icon: '📝',
      title: 'Questões',
      description: 'Pratique com questões no estilo CEBRASPE (Certo ou Errado)',
      link: '/questoes',
      color: 'bg-primary-100 text-primary-700',
    },
    {
      icon: '📊',
      title: 'Revisão',
      description: 'Acompanhe seu progresso e estatísticas por matéria',
      link: '/revisao',
      color: 'bg-purple-100 text-purple-700',
    },
    {
      icon: '🗂️',
      title: 'Flashcards',
      description: 'Revise conceitos importantes de forma rápida',
      link: '/flashcards',
      color: 'bg-green-100 text-green-700',
    },
  ]

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            Bem-vindo ao TCU Study
          </h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Sua plataforma completa de estudos para o concurso do Tribunal de Contas da União
          </p>
        </div>

        {/* Stats Overview */}
        {estatisticas.total_questoes_respondidas > 0 && (
          <div className="max-w-4xl mx-auto mb-12">
            <Card padding="lg" className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary-700">
                    {estatisticas.total_questoes_respondidas}
                  </div>
                  <div className="text-sm text-secondary-700 mt-1">
                    Questões Respondidas
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-success">
                    {estatisticas.total_acertos}
                  </div>
                  <div className="text-sm text-secondary-700 mt-1">
                    Acertos
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-700">
                    {estatisticas.percentual_geral.toFixed(1)}%
                  </div>
                  <div className="text-sm text-secondary-700 mt-1">
                    Taxa de Acerto
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {features.map((feature) => (
            <Card
              key={feature.title}
              padding="lg"
              hover
              className="text-center cursor-pointer group"
              onClick={() => window.location.href = feature.link}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.color} text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-3">
                {feature.title}
              </h2>
              <p className="text-secondary-600 mb-6">
                {feature.description}
              </p>
              <Button
                variant="primary"
                fullWidth
                onClick={(e) => {
                  e.stopPropagation()
                  window.location.href = feature.link
                }}
              >
                Acessar
              </Button>
            </Card>
          ))}
        </div>

        {/* About Section */}
        <div className="max-w-4xl mx-auto">
          <Card padding="lg" className="bg-secondary-50">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4 text-center">
              Sobre a Plataforma
            </h2>
            <div className="space-y-4 text-secondary-700">
              <p>
                <strong>TCU Study</strong> é uma plataforma moderna e completa para preparação para o concurso do
                Tribunal de Contas da União (TCU). Com questões no formato CEBRASPE, sistema de revisão
                inteligente e flashcards interativos.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <strong>Questões Certo/Errado</strong>
                    <p className="text-sm">Formato CEBRASPE com feedback detalhado</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📈</span>
                  <div>
                    <strong>Progresso Detalhado</strong>
                    <p className="text-sm">Acompanhe suas estatísticas por matéria</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <strong>Estudo Focado</strong>
                    <p className="text-sm">Filtre por matéria e dificuldade</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🔄</span>
                  <div>
                    <strong>Flashcards Interativos</strong>
                    <p className="text-sm">Revise conceitos de forma dinâmica</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
