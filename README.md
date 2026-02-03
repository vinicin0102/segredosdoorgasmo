# 📱 Quiz - Segredos do Orgasmo

Um quiz interativo e profissional para capturar leads e vender o produto "Segredos do Orgasmo".

---

## 🚀 Como Usar

### 1. Abrir o Quiz
Simplesmente abra o arquivo `index.html` no navegador, ou hospede em um servidor.

### 2. Testar Localmente
```bash
# Se tiver Python instalado:
python -m http.server 8000

# Depois acesse: http://localhost:8000
```

---

## ✏️ COMO EDITAR

### 🎨 Mudar Cores
Abra o arquivo `styles.css` e edite as variáveis no início:

```css
:root {
    --color-primary: #e91e63;        /* Cor principal (rosa) */
    --color-primary-dark: #c2185b;   /* Rosa escuro */
    --color-bg-dark: #0a0a0f;        /* Fundo escuro */
    --color-accent: #ff6b6b;         /* Vermelho/Urgência */
    --color-success: #4caf50;        /* Verde/Sucesso */
}
```

### 📝 Editar Perguntas
Abra o arquivo `index.html` e procure por `<!-- Pergunta X -->`. Cada pergunta tem:
- `question-title`: O texto da pergunta
- `option-btn`: As opções de resposta
- `option-icon`: O emoji da opção
- `option-text`: O texto da opção

### 🔗 Mudar Link de Checkout
Abra o arquivo `script.js` e edite:

```javascript
const CONFIG = {
    checkoutUrl: "https://seu-link-de-checkout.com",
    // ...
};
```

### 🖼️ Adicionar Imagens
1. Coloque suas imagens na pasta `images/`
2. Edite o arquivo `index.html` e atualize os caminhos das imagens:
   - `images/hero-image.jpg` - Imagem da tela inicial
   - `images/result-image.jpg` - Imagem do resultado

### ⏱️ Mudar Tempo do Contador
No arquivo `script.js`, edite:

```javascript
countdownTime: 15 * 60, // 15 minutos em segundos
```

### 📊 Adicionar Facebook Pixel
No arquivo `script.js`, descomente o código do Pixel e adicione seu ID:

```javascript
fbPixelId: "SEU_PIXEL_ID_AQUI",
```

---

## 📁 Estrutura de Arquivos

```
quiz-segredos-orgasmo/
├── index.html      # Estrutura do quiz
├── styles.css      # Estilos e cores
├── script.js       # Lógica do quiz
├── README.md       # Este arquivo
└── images/         # Pasta para imagens
    ├── hero-image.jpg
    ├── result-image.jpg
    └── ...
```

---

## 🎯 Funcionalidades

- ✅ Quiz interativo com 7 perguntas
- ✅ Barra de progresso animada
- ✅ Tela de análise com animações
- ✅ Contador de urgência
- ✅ Design mobile-first
- ✅ Efeitos visuais modernos
- ✅ Captura de UTM parameters
- ✅ Integração com Facebook Pixel
- ✅ Fácil de editar e personalizar

---

## 📱 Compatibilidade

- Chrome, Firefox, Safari, Edge
- iOS e Android
- Design responsivo

---

## 💡 Dicas

1. **Imagens**: Use imagens de alta qualidade em formato JPG ou WebP
2. **Cores**: Mantenha o contraste alto para melhor legibilidade
3. **Textos**: Seja direto e use gatilhos emocionais
4. **Teste**: Sempre teste em dispositivos móveis

---

## 🆘 Suporte

Para dúvidas ou personalizações avançadas, entre em contato!
