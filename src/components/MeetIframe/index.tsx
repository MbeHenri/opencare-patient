import React, { useEffect, useRef, useCallback, useState } from "react";

interface MeetIframeProps {
  url: string;
  username: string;
}

export const MeetIframe: React.FC<MeetIframeProps> = ({ url, username }) => {
  const [isLoading, setIsLoading] = useState(true); // Loader activé par défaut
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Déplacer l'utilisation de useCallback en dehors de useEffect
  const handleLoad = useCallback(() => {
    const iframe = iframeRef.current;
    if (!username || !iframe) return; // Ne pas exécuter si username est vide ou si l'iframe est introuvable

    try {
      const iframeWindow = iframe.contentWindow;
      if (!iframeWindow) {
        console.error("Impossible d'accéder à la fenêtre de l'iframe.");
        setIsLoading(false); // Désactiver le loader si l'iframe est introuvable
        return;
      }

      const iframeDocument = iframeWindow.document;

      // Vérification si l'utilisateur est déjà connecté
      const isLoggedIn = iframeDocument.querySelector('.user-menu'); // Un élément spécifique à l'utilisateur connecté
      if (isLoggedIn) {
        console.log('Utilisateur déjà connecté.');
        setIsLoading(false); // Désactiver le loader si l'utilisateur est déjà connecté
        return; // Pas besoin de soumettre le formulaire
      }

      const userInput = iframeDocument.querySelector('input[name="user"]') as HTMLInputElement | null;
      const passwordInput = iframeDocument.querySelector('input[name="password"]') as HTMLInputElement | null;
      const loginForm = iframeDocument.querySelector('form') as HTMLFormElement | null;

      if (userInput && passwordInput && loginForm) {
        userInput.value = username; // Remplacer par le nom d'utilisateur réel
        passwordInput.value = 'TALK_PASSWORD'; // Remplacer par le mot de passe réel

        // Attendre 3 secondes avant de soumettre le formulaire
        setTimeout(() => {
          loginForm.submit();
          console.log('Formulaire de connexion soumis.');
          setIsLoading(false); // Désactiver le loader une fois le formulaire soumis
        }, 3000);  // Délai de 3 secondes
      } else {
        console.error("Champs de formulaire introuvables dans l'iframe.");
        setIsLoading(false); // Désactiver le loader si les champs ne sont pas trouvés
      }
    } catch (error) {
      console.error("Erreur lors de l'accès au contenu de l'iframe :", error);
      setIsLoading(false); // Désactiver le loader en cas d'erreur
    }
  }, [username]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return; // Ne pas exécuter si l'iframe est introuvable

    // Associer l'événement de chargement
    iframe.addEventListener('load', handleLoad);

    // Nettoyage de l'événement lors du démontage du composant
    return () => {
      iframe.removeEventListener('load', handleLoad);
    };
  }, [handleLoad]); // Le useEffect dépend de handleLoad, car c'est un callback optimisé

  return (
    <div className="row">
      <div className="col-md-12">
        {isLoading && (
          <div className="loader-container">
            <div className="loader">Chargement...</div> {/* Remplace par ton composant de loader si nécessaire */}
          </div>
        )}
        <iframe
          ref={iframeRef}
          className="mx auto w-100"
          title="Teleconsultation"
          src={url}
          height={640}
          allow="camera;microphone"
        />
      </div>
    </div>
  );
};

