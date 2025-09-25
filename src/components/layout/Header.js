'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

export default function Header() {
    const { logout } = useAuth()
    const router = useRouter()

    const handleLogout = async () => {
        await logout()
        router.push('/auth')
    }

    const navigate = (path) => router.push(path)

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
            <h1 className="text-xl font-semibold text-gray-900">Rodrigo Abadi</h1>

            <nav className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="gap-1">
                            Produtos <ChevronDown size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => navigate('/products/create')}>
                            Cadastro Produtos
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/products')}>
                            Estoque Produtos
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/invoices/create')}>
                            Cadastro Fiscal
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/invoices')}>
                            Estoque Fiscal
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Configurações</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => navigate('/suppliers')}>
                                    Fornecedores
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate('/packages')}>
                                    Embalagens
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate('/origins')}>
                                    Origens
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="gap-1">
                            Vendas <ChevronDown size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => navigate('/files')}>
                            Inserir planilha de vendas
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/sales')}>
                            Vendas
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/nfes')}>
                            Arquivos notas fiscais
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="gap-1">
                            Métricas <ChevronDown size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => navigate('/statistics')}>
                            Estatísticas
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/map')}>
                            Mapa de vendas
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>

            <Button variant="outline" onClick={handleLogout}>
                Sair
            </Button>
        </header>
    )
}