// src/pages/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
const NotFoundPage: React.FC = () => {
return (
<div className="text-center py-20">
<h1 className="text-4xl font-bold mb-4">404 - Page non trouvée</h1>
<p className="mb-8">Désolé, la page que vous recherchez n'existe pas.</p>
<Link to="/" className="bg-green-500 hover:bg-green-600 text-white font-bold
py-2 px-4 rounded">
Retour à l'accueil
</Link>
</div>
);
};
export default NotFoundPage;