import React from "react";
import "./About.css";
import authorImage from "../../images/author.jpg";
function About() {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__photo-wrapper" aria-hidden="true">
          <img
            className="about__photo"
            src={authorImage}
            alt="Foto do autor"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
        <div className="about__content">
          <h2 className="about__title">Sobre o autor</h2>
          <p className="about__text">
            Meu nome é Publio e sou desenvolvedor com formação em Engenharia
            Mecânica e especialização em Ciência da Computação e Análise de
            Dados. Minha trajetória na tecnologia começou através da análise de
            dados e automação de processos, evoluindo para o desenvolvimento de
            aplicações web utilizando JavaScript, React, Node.js e bancos de
            dados SQL.
          </p>
          <p className="about__text">
            O News Explorer foi desenvolvido como projeto final do curso de
            Desenvolvimento Web Full-Stack da TripleTen, demonstrando
            habilidades em React, integração com APIs REST, autenticação de
            usuários e construção de interfaces responsivas.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
