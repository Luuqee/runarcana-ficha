# 🎲 Runarcana Fichas

Sistema completo de fichas de personagem online para o RPG **Runarcana**, com suporte a campanhas multiplayer em tempo real.

![Status](https://img.shields.io/badge/status-online-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-orange)

## 🌐 **Demo Online**

🔗 [runarcana-ficha.vercel.app](https://runarcana-ficha.vercel.app)

---

## ✨ **Funcionalidades**

### 🔐 **Autenticação**
- Login com Google (1 clique)
- Login/Registro com Email e Senha
- Sessões persistentes

### 📝 **Sistema de Fichas**
- Fichas completas de personagens Runarcana
- Atributos, perícias, vida, mana
- Sistema de ataques, poderes e magias
- Inventário completo com moedas
- Runas e mistérios
- Salvamento automático em tempo real

### 🎭 **Sistema de Campanhas**
- **Mestre:**
  - Criar campanhas com código único
  - Dashboard com visão de todos os jogadores
  - Ver HP/Mana de todos em tempo real
  - Visualizar e editar fichas dos jogadores
  
- **Jogador:**
  - Entrar em campanhas com código
  - Vincular personagem à campanha
  - Ver outros jogadores da mesa
  - Atualização automática (sem F5)

### 🔄 **Tempo Real**
- Sincronização instantânea via Firebase
- Mudanças aparecem para todos os jogadores automaticamente
- Sem necessidade de atualizar a página

---

## 🛠️ **Tecnologias Utilizadas**

### **Frontend:**
- ⚛️ React 18
- 🎨 CSS personalizado
- 🚀 Vite (build tool)
- 🧭 React Router v6

### **Backend:**
- 🔥 Firebase Authentication
- 🗄️ Cloud Firestore (banco de dados)
- ⚡ Hospedagem: Vercel

---

## 📂 **Estrutura do Projeto**

```
runarcana-ficha/
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── modals/        # Modais (ataques, magias, etc)
│   │   └── sheets/        # Componentes da ficha
│   ├── contexts/          # Context API (Auth)
│   ├── data/              # Constantes e dados estáticos
│   ├── firebase/          # Configuração Firebase
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Páginas principais
│   ├── styles/            # CSS global e por componente
│   └── utils/             # Funções utilitárias
├── public/                # Arquivos estáticos
└── package.json
```

---

## 🎮 **Como Usar**

### **Criar Personagem:**
1. Faça login
2. Vá em "Personagens"
3. Clique em "+ Novo Personagem"
4. Preencha nome, classe e nível
5. Abra a ficha para editar detalhes

### **Criar Campanha (Mestre):**
1. Vá em "Campanhas"
2. Clique em "+ Nova Campanha"
3. Preencha nome e descrição
4. Copie o código gerado
5. Compartilhe com os jogadores

### **Entrar em Campanha (Jogador):**
1. Vá em "Campanhas"
2. Clique em "Entrar com Código"
3. Cole o código fornecido pelo mestre
4. Escolha seu personagem
5. Clique em "Entrar na Mesa"

---

## 🐛 **Problemas Conhecidos**

- [ ] Mistérios não estão salvando corretamente
- [ ] Modal de itens abre na parte inferior
- [ ] Botões de runas não respondem

*Estes bugs estão sendo corrigidos na próxima versão.*

---

## 🗺️ **Roadmap**

### **v1.1 (Em breve):**
- [ ] Sistema de NPCs para o mestre
- [ ] Dados virtuais (d20, d6, d12, etc)
- [ ] Chat da campanha em tempo real
- [ ] Histórico de ações/combate

### **v1.2 (Futuro):**
- [ ] Export de ficha em PDF
- [ ] Importar/Exportar personagens
- [ ] Temas (dark/light)
- [ ] Sons e notificações
- [ ] Sistema de iniciativa

---

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 **Autor**

**Lucas Souza**
- GitHub: [@Luuqee](https://github.com/Luuqee)

- **Claude AI** - Assistente de IA que auxiliou no aprendizado e desenvolvimento das tecnologias utilizadas neste projeto
  
---

## 🙏 **Agradecimentos**

- **Runarcana RPG** - Sistema de RPG baseado em League of Legends

---

## ⭐ **Star o projeto!**

Se este projeto te ajudou, considere dar uma ⭐!

---

*Feito com ❤️ para a comunidade Runarcana*
