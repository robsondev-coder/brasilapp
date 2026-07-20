
// Função para calcular percentuais da população
export function percentual(total, parte) {
    return (parte / total * 100).toFixed(1)
}

// Função para formatar valores numéricos
export function formatarValor(numero){
    return numero.toLocaleString("pt-BR")
}