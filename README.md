# MathMaster 7.0 - Desafio de Matemática

Este projeto está **totalmente automatizado**. Você não precisa rodar comandos de build ou deploy manualmente no seu computador.

## 🚀 Como Publicar (Automatizado)

### 1. No GitHub (Recomendado e Automático)
Tudo o que você precisa fazer é colocar este código em um repositório no GitHub:

⚠️ **IMPORTANTE:** Certifique-se de copiar a pasta oculta `.github`. Se ela não for enviada, a automação não funcionará. 

1. **Crie um novo repositório** no seu GitHub.
2. **Suba os arquivos** (via upload no site do GitHub ou via Git).
3. **Pronto!** O arquivo que criei em `.github/workflows/deploy.yml` vai detectar os arquivos, fazer o "build" e publicar o site sozinho.
4. Após alguns minutos, vá em **Settings > Pages** no seu repositório. O link do seu site aparecerá lá (geralmente `https://seu-usuario.github.io/nome-do-repo/`).

### 2. No Streamlit Cloud
Se você preferir usar o Streamlit:
1. Conecte seu repositório ao [Streamlit Cloud](https://share.streamlit.io/).
2. Selecione o arquivo `streamlit_app.py`.
3. O Streamlit vai abrir o app React dentro da interface dele.

---

## 🛠️ O que eu automatizei para você:
- **GitHub Actions**: Configurei um "robô" que trabalha para você. Sempre que você mudar uma vírgula no código e salvar no GitHub, ele reconstrói o site e atualiza o link automaticamente.
- **Configuração de Caminhos**: O site já sabe que pode ser movido para qualquer pasta ou URL sem quebrar as imagens ou estilos.
- **Scripts de Produção**: O projeto já está pronto para o ambiente final, sem ferramentas de desenvolvimento pesadas.

## 📝 Assuntos do Desafio
- Potenciação (Bases -10 a 15)
- Racionalização de Denominadores
- Valor Numérico de Expressões
- Redução de Polinômios
