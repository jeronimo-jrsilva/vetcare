Contexto
A largura da tela de Pets (src/pet.html) foi alterada para 1500px, o que deixa o formulário excessivamente esticado em monitores grandes. Além disso, a tela de Tutores (src/tutor.html) ainda possui algumas classes residuais do layout anterior que precisam ser limpas.

🎯 Tarefas

1. No arquivo src/pet.html:
Ajustar o estilo de largura máxima do body para 600px:
```html
<style>
  body { max-width: 600px; margin: 40px auto; padding: 0 20px; }
  h1 { color: #f4f4f4; }
</style>
```

2. No arquivo src/tutor.html:
- Adicionar o mesmo bloco de estilo com max-width: 600px no head.
- Remover as classes antigas `<div class="eyebrow">` e `<div class="section-label">`, deixando o formulário limpo e direto como no arquivo de Pets.

✅ Critério de Aceite (Como Conferir)

- As duas telas (Pets e Tutores) abrem perfeitamente centralizadas e com largura máxima harmoniosa de 600px em qualquer tamanho de janela.
- O arquivo src/tutor.html não possui classes ou divs órfãs do tema anterior.
