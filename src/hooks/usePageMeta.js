import { useEffect } from 'react';

function usePageMeta(title, description, robots = 'index, follow') {
  useEffect(() => {
    // ✅ Title
    if (title) {
      document.title = title;
    }

    // ✅ Description
    let metaDescription = document.querySelector('meta[name="description"]');

    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }

    if (description) {
      metaDescription.setAttribute('content', description);
    }

    // ✅ Robots
    let metaRobots = document.querySelector('meta[name="robots"]');

    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }

    metaRobots.setAttribute('content', robots);

    // ✅ Canonical (مهم جداً)
    let canonicalLink = document.querySelector('link[rel="canonical"]');

    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }

    const cleanUrl = window.location.origin + window.location.pathname;
    canonicalLink.setAttribute('href', cleanUrl);

    // ✅ Open Graph (Facebook / WhatsApp)
    const setMetaProperty = (property, content) => {
      let element = document.querySelector(`meta[property="${property}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    setMetaProperty('og:title', title || 'QuickoTools');
    setMetaProperty('og:description', description || 'Free online tools');
    setMetaProperty('og:type', 'website');
    setMetaProperty('og:url', cleanUrl);

    // ✅ Twitter
    const setMetaName = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    setMetaName('twitter:card', 'summary_large_image');
    setMetaName('twitter:title', title || 'QuickoTools');
    setMetaName('twitter:description', description || 'Free online tools');

  }, [title, description, robots]);
}

export default usePageMeta;