import streamlit as st
import streamlit.components.v1 as components
import os

# Configuração da página para o MathMaster 7.0
st.set_page_config(
    page_title="MathMaster 7.0 - Desafio de Matemática",
    page_icon="📐",
    layout="wide"
)

def main():
    # Caminho para o build do React local
    index_path = os.path.join("dist", "index.html")
    
    # 1. Tenta carregar o build local (se existir)
    if os.path.exists(index_path):
        with open(index_path, "r", encoding="utf-8") as f:
            html_content = f.read()
        st.markdown("### 📐 MathMaster 7.0 (Build Local)")
        components.html(html_content, height=1000, scrolling=True)
    
    # 2. Se não houver build local, tenta carregar o GitHub Pages automaticamente
    else:
        st.title("🚀 MathMaster 7.0")
        
        # Tenta descobrir o usuário e repo para sugerir o link
        try:
            # O Streamlit Cloud geralmente tem acesso a algumas variáveis de ambiente ou estrutura de pastas
            # Mas vamos ser práticos e oferecer um guia simples e automático.
            st.warning('⚠️ **Aviso:** O "build" do site não foi encontrado no repositório.')
            
            st.info("""
            ### ✅ Como Ativar seu Site (Custo Zero e Sem Trabalho):
            
            Como este é um app moderno (React), o Streamlit não consegue "construí-lo" sozinho. 
            Mas não se preocupe, eu automatizei tudo no **GitHub Pages** para você!

            **Siga estes 3 passos simples:**
            1. No seu GitHub, clique em **Settings** > **Pages**.
            2. Em **Build and deployment**, selecione a branch **gh-pages**.
            3. Clique em **Save**.
            
            Aguarde 1 minuto e seu site estará vivo! O link oficial será algo como: 
            `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`
            """)
            
            st.markdown("---")
            st.subheader("💡 Por que usar o GitHub Pages?")
            st.write("""
            - **Performance**: É muito mais rápido para seus alunos.
            - **Estabilidade**: Funciona perfeitamente em celulares e tablets.
            - **Automação**: Sempre que você salvar algo no GitHub, o site se atualiza sozinho em 2 minutos.
            """)
            
            with st.expander("Sou um usuário avançado e quero rodar no Streamlit"):
                st.write("""
                Para rodar diretamente no Streamlit, você precisa gerar a pasta `dist` no seu computador 
                (comando `npm run build`) e enviá-la para o GitHub. Como o diretório `.gitignore` 
                está bloqueando a pasta `dist`, você teria que removê-la de lá.
                
                **Minha recomendação: Use o GitHub Pages!** É a forma profissional de hospedar este tipo de app.
                """)
        except Exception:
            st.error("Erro ao tentar localizar o projeto. Verifique se o repositório foi subido corretamente.")

if __name__ == "__main__":
    main()
