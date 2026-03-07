import '../styles/home.css';
import ToolCard from '../components/ToolCard';
import toolsList from '../tools/toolsList';

function Home() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">QuickoTools</h1>
          <p className="hero-text">
            Fast, simple, and free online tools for everyday tasks. Built for
            speed, usability, and clean results on desktop and mobile.
          </p>
        </div>
      </section>

      <section className="tools-section">
        <div className="tools-container">
          <h2 className="tools-section-title">Popular Free Tools</h2>

          <div className="tools-grid">
            {toolsList.map((tool) => (
             <ToolCard
  key={tool.path}
  name={tool.name}
  description={tool.description}
  path={tool.path}
/>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;