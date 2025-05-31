import { useState } from 'react';

interface QuestionnaireFormProps {
  duration: 'quick' | 'medium' | 'long';
  onComplete: (answers: Record<number, any>) => void;
}

export default function QuestionnaireForm({ duration, onComplete }: QuestionnaireFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Définir le nombre de questions en fonction de la durée
  const totalSteps = duration === 'quick' ? 5 : duration === 'medium' ? 8 : 12;
  
  // Questions pour le questionnaire
  const questions = [
    {
      id: 0,
      question: "Quelle ambiance recherchez-vous ?",
      type: "single",
      options: ["Énergique", "Relaxante", "Festive", "Mélancolique", "Romantique"]
    },
    {
      id: 1,
      question: "Pour quelle occasion ?",
      type: "single",
      options: ["Sport/Fitness", "Détente", "Soirée", "Travail/Étude", "Voyage"]
    },
    {
      id: 2,
      question: "Quels genres musicaux préférez-vous ?",
      type: "multiple",
      options: ["Pop", "Rock", "Hip-hop", "Électronique", "Jazz", "Classique", "R&B", "Metal"]
    },
    {
      id: 3,
      question: "Quelle décennie vous inspire le plus ?",
      type: "single",
      options: ["2020s", "2010s", "2000s", "1990s", "1980s", "1970s", "Plus ancien"]
    },
    {
      id: 4,
      question: "Préférez-vous des artistes connus ou des découvertes ?",
      type: "slider",
      min: 0,
      max: 10,
      labels: ["Artistes populaires", "Nouvelles découvertes"]
    },
    {
      id: 5,
      question: "Quelle importance accordez-vous aux paroles ?",
      type: "slider",
      min: 0,
      max: 10,
      labels: ["Peu importante", "Très importante"]
    },
    {
      id: 6,
      question: "Préférez-vous des morceaux instrumentaux ou chantés ?",
      type: "slider",
      min: 0,
      max: 10,
      labels: ["Instrumentaux", "Chantés"]
    },
    {
      id: 7,
      question: "Quel tempo préférez-vous ?",
      type: "slider",
      min: 0,
      max: 10,
      labels: ["Lent", "Rapide"]
    },
    {
      id: 8,
      question: "Quelle ambiance sonore préférez-vous ?",
      type: "single",
      options: ["Acoustique", "Électronique", "Orchestrale", "Minimaliste", "Expérimentale"]
    },
    {
      id: 9,
      question: "Y a-t-il un artiste que vous souhaitez absolument inclure ?",
      type: "text"
    },
    {
      id: 10,
      question: "Avez-vous un morceau de référence pour cette playlist ?",
      type: "text"
    },
    {
      id: 11,
      question: "Des émotions particulières que vous souhaitez ressentir ?",
      type: "multiple",
      options: ["Joie", "Nostalgie", "Motivation", "Calme", "Excitation", "Réflexion", "Évasion"]
    }
  ];
  
  // Limiter les questions en fonction de la durée
  const questionsToShow = questions.slice(0, totalSteps);
  
  const handleAnswer = (answer: any) => {
    setAnswers({
      ...answers,
      [currentStep]: answer
    });
    
    setShowConfirmation(true);
    
    // Simuler un délai pour l'animation de confirmation
    setTimeout(() => {
      setShowConfirmation(false);
      
      // Passer à la question suivante ou terminer
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete(answers);
      }
    }, 800);
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const currentQuestion = questionsToShow[currentStep];
  
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 fade-in">
      <h2 className="text-3xl font-bold mb-8 text-center">Créez votre playlist</h2>
      
      {/* Barre de progression */}
      <div className="progress-container mb-12">
        <div className="progress-dots">
          {questionsToShow.map((_, index) => (
            <div 
              key={index} 
              className={`progress-dot ${index === currentStep ? 'active' : index < currentStep ? 'completed' : ''}`}
            />
          ))}
        </div>
      </div>
      
      {/* Question actuelle */}
      <div className="card mb-8 transition-all">
        <h3 className="text-xl font-bold mb-6">{currentQuestion.question}</h3>
        
        {currentQuestion.type === "single" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                className="btn-secondary hover-scale transition-all"
                onClick={() => handleAnswer(index)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        
        {currentQuestion.type === "multiple" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {currentQuestion.options?.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-3 rounded-md cursor-pointer transition-all ${
                    answers[currentStep]?.includes(index)
                      ? 'bg-spotify-green text-white'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={answers[currentStep]?.includes(index) || false}
                    onChange={() => {
                      const currentSelections = answers[currentStep] || [];
                      const newSelections = currentSelections.includes(index)
                        ? currentSelections.filter((i: number) => i !== index)
                        : [...currentSelections, index];
                      
                      setAnswers({
                        ...answers,
                        [currentStep]: newSelections
                      });
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
            <button
              className="btn-primary hover-scale w-full"
              onClick={() => handleAnswer(answers[currentStep] || [])}
              disabled={!answers[currentStep] || answers[currentStep].length === 0}
            >
              Valider
            </button>
          </div>
        )}
        
        {currentQuestion.type === "slider" && (
          <div>
            <div className="mb-6">
              <input
                type="range"
                min={currentQuestion.min}
                max={currentQuestion.max}
                value={answers[currentStep] || currentQuestion.min || 0}
                onChange={(e) => {
                  setAnswers({
                    ...answers,
                    [currentStep]: parseInt(e.target.value)
                  });
                }}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-sm">
                <span>{currentQuestion.labels?.[0]}</span>
                <span>{currentQuestion.labels?.[1]}</span>
              </div>
            </div>
            <button
              className="btn-primary hover-scale w-full"
              onClick={() => handleAnswer(answers[currentStep] || 0)}
            >
              Valider
            </button>
          </div>
        )}
        
        {currentQuestion.type === "text" && (
          <div>
            <input
              type="text"
              className="form-input w-full mb-6"
              placeholder="Votre réponse..."
              value={answers[currentStep] || ''}
              onChange={(e) => {
                setAnswers({
                  ...answers,
                  [currentStep]: e.target.value
                });
              }}
            />
            <button
              className="btn-primary hover-scale w-full"
              onClick={() => handleAnswer(answers[currentStep] || '')}
              disabled={!answers[currentStep]}
            >
              Valider
            </button>
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between">
        <button
          className={`btn-secondary ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover-scale'}`}
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Précédent
        </button>
        <div className="text-center">
          Question {currentStep + 1} sur {totalSteps}
        </div>
        {currentStep < totalSteps - 1 && (
          <button
            className="btn-secondary hover-scale"
            onClick={() => {
              if (answers[currentStep] !== undefined) {
                setCurrentStep(currentStep + 1);
              }
            }}
            disabled={answers[currentStep] === undefined}
          >
            Suivant
          </button>
        )}
        {currentStep === totalSteps - 1 && (
          <button
            className="btn-primary hover-scale"
            onClick={() => onComplete(answers)}
            disabled={answers[currentStep] === undefined}
          >
            Terminer
          </button>
        )}
      </div>
      
      {/* Confirmation de réponse */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-spotify-green text-white p-6 rounded-lg shadow-lg confirmation-animation">
            <div className="text-2xl mb-2">✓</div>
            <div>Réponse enregistrée !</div>
          </div>
        </div>
      )}
      
      {/* Bulle d'aide */}
      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
        <div className="flex items-start">
          <div className="mr-3 text-2xl">💡</div>
          <div>
            <p className="font-bold mb-1">Conseil</p>
            <p className="text-sm">
              {currentStep === 0 && "Choisissez l'ambiance qui correspond le mieux à votre humeur actuelle."}
              {currentStep === 1 && "Pensez au contexte dans lequel vous écouterez cette playlist."}
              {currentStep === 2 && "Vous pouvez sélectionner plusieurs genres pour une playlist variée."}
              {currentStep === 3 && "La décennie influence fortement le style des morceaux sélectionnés."}
              {currentStep === 4 && "Déplacez le curseur vers la droite pour découvrir de nouveaux artistes."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
