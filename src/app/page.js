'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <h1 className="text-xl font-semibold text-gray-900">Rodrigo Abadi</h1>
        <Button variant="outline" onClick={() => router.push('/auth')}>
          Acessar Sistema
        </Button>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">
          Sistema de Gerenciamento Empresarial
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          Plataforma para controle de produtos, vendas e métricas
        </p>
        <Button size="lg" onClick={() => router.push('/auth')}>
          Começar Agora
        </Button>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Produtos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Controle de estoque e gestão fiscal
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Gestão de vendas e notas fiscais
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Métricas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Estatísticas e análise de dados
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}