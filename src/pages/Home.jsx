import { useMemo, useState } from 'react';
import '../styles/home.css';
import ToolCard from '../components/ToolCard';
import toolsList from '../tools/toolsList';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTools = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();

    if (!value) {
      return toolsList;
    }

    return toolsList.filter((tool) => {
      const toolName = tool.name.toLowerCase();
      const toolDescription = tool.description.toLowerCase();

      return (
        toolName.includes(value) ||
        toolDescription.includes(value)
      );
    });
  }, [searchTerm]);

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
          <div className="tools-header">
            <h2 className="tools-section-title">Popular Free Tools</h2>

            <div className="tools-search-box">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search tools..."
                className="tools-search-input"
              />
            </div>
          </div>

          {filteredTools.length > 0 ? (
            <div className="tools-grid">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.path}
                  name={tool.name}
                  description={tool.description}
                  path={tool.path}
                />
              ))}
            </div>
          ) : (
            <div className="tools-empty-state">
              <h3>No tools found</h3>
              <p>Try searching with a different keyword.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;