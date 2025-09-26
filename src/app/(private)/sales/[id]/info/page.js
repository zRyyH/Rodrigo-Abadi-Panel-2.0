'use client'

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DynamicBreadcrumb } from '@/components/common/DynamicBreadcrumb';
import { FileText, FileSpreadsheet } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCrudApi } from '@/hooks/useCrudApi';
import { settings } from '@/constants/config';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function SalesPage() {
    const params = useParams()
    const { item, loading, error, read } = useCrudApi('/query/sales/detailsWithProducts')

    console.log(item)

    useEffect(() => {
        if (params.id) {
            read({ id: params.id })
        }
    }, [params.id])

    const sale = item?.data?.data?.[0] || {}
    const products = item?.data.data || []

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value || 0)
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (loading) return <LoadingScreen />
    if (error) return <div className="container mx-auto p-6">Erro ao carregar dados</div>

    return (
        <div className="container mx-auto p-6 space-y-6">
            <DynamicBreadcrumb className="mb-6" />

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Produtos</CardTitle>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            PDF
                        </Button>
                        <Button variant="outline" size="sm">
                            <FileSpreadsheet className="mr-2 h-4 w-4" />
                            XML
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Foto</TableHead>
                                <TableHead>Nome do produto</TableHead>
                                <TableHead>Valor</TableHead>
                                <TableHead>Quantidade</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Avatar className="size-12 rounded-md">
                                            <AvatarImage
                                                src={`${settings.directus_url}/assets/${product.imagem_id}`}
                                                alt={product.nome_do_produto}
                                            />
                                            <AvatarFallback className="rounded-md">
                                                {product.nome_do_produto?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{product.nome_do_produto}</TableCell>
                                    <TableCell>{formatCurrency(product.valor)}</TableCell>
                                    <TableCell>{product.quantidade}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6 space-y-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                            <p className="text-muted-foreground">Número da venda</p>
                            <p className="text-muted-foreground">Data</p>
                            <p className="text-muted-foreground">Apelido comprador</p>
                            <p className="text-muted-foreground">Método de envio</p>
                            <p className="text-muted-foreground">Rastreio</p>
                            <p className="text-muted-foreground">Número da nota fiscal</p>
                        </div>
                        <div className="space-y-1">
                            <p>{sale.numero_da_venda}</p>
                            <p>{formatDate(sale.data)}</p>
                            <p>{sale.apelido_comprador}</p>
                            <p>{sale.dados_de_envio_metodo}</p>
                            <p>{sale.dados_de_envio_rastreio}</p>
                            <p>{sale.numero_da_nota_fiscal}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6">
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Preço total dos produtos</span>
                            <span>{formatCurrency(sale.preco_total_dos_produtos)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Tarifas de venda</span>
                            <span>{formatCurrency(sale.tarifas_de_venda)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Custo envio</span>
                            <span>{formatCurrency(sale.custo_envio)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Impostos</span>
                            <span>{formatCurrency(sale.impostos)}</span>
                        </div>

                        <Separator />

                        <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>{formatCurrency(sale.total)}</span>
                        </div>
                        <div className="flex justify-between text-green-600 font-medium">
                            <span>Lucro</span>
                            <span>{formatCurrency(sale.lucro)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}