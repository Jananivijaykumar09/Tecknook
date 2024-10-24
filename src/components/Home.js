import React from 'react';
import './Home.css';
import Resources from './Resources';
import HelpDesk from './HelpDesk';
import NextStep from './NextStep';
import { Element } from 'react-scroll';

const Home = () => (
  <div>
    <section id="home" className="home-section">
      <div className="home-content">
        <h1 className="home-title">TechNook</h1>
        <p className="home-quote">
          "Education is the most powerful weapon which you can use to change the world." - Nelson Mandela
        </p>
        <p className="home-text">
          At TechNook, we are committed to revolutionizing education in rural areas, focusing on grades 6 to 12. Our innovative solutions aim to bridge educational gaps and empower students with knowledge that transcends geographical barriers.
        </p>
        <p className="home-text">
          Rural students in India face an uphill battle for quality education. Limited resources, teacher shortages, and lack of infrastructure hinder their potential. Let's invest in their future and bridge the rural education gap.
        </p>
      </div>
    </section>
    <section id="resources">
      <Resources />
    </section>
    <section id="help-desk">
      <HelpDesk />
    </section>
    <Element name="next-step">
      <section id="next-step">
        <NextStep />
      </section>
    </Element>
  </div>
);

export default Home;
