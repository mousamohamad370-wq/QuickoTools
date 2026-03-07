import { Link } from 'react-router-dom';
import '../styles/tool-card.css';

function ToolCard({ name, description, path, language }) {
  const buttonText = language === 'ar' ? 'افتح الأداة' : 'Open Tool';

  return (
    <div className="tool-card">
      <h3 className="tool-card-title">{name}</h3>

      <p className="tool-card-description">{description}</p>

      <Link to={path} className="tool-card-button">
        {buttonText}
      </Link>
    </div>
  );
}

export default ToolCard;