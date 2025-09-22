"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useNotification } from "@/hooks/useNotification";

export default function AuthForm({ onSubmit, loading = false }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { showError } = useNotification();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            showError("Erro", "Preencha todos os campos");
            return;
        }

        if (onSubmit) {
            onSubmit({ email, password });
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="remember" disabled={loading} />
                        <Label htmlFor="remember" className="text-sm font-normal">
                            Lembrar senha
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading || !email || !password}
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}