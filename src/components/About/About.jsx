
import React from 'react';

import authorpicture from '../../images/alex.jpg';

const About = () => (
  <section className="about">
    <img className="about__image" src={authorpicture} alt="author picture" />
    <div className="about__text">
      <h2 className="about__text-title">Sobre o autor</h2>
      <p className="about__text-para">
      Sou um desenvolvedor web com formação em Informática e Educação. Minha trajetória profissional me permitiu desenvolver uma visão abrangente, capaz de equilibrar as necessidades dos usuários e dos negócios. Compreendo profundamente os desafios enfrentados por ambos os lados e utilizo essa perspectiva para contribuir como Desenvolvedor Front-end, criando soluções eficazes que resolvem problemas reais e agregam valor. Minha experiência multidisciplinar me permite atuar de forma estratégica, alinhando tecnologia, usabilidade e objetivos comerciais.
      </p>
      

    </div>
  </section>
);

export default About;
