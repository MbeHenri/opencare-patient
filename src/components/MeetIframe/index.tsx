import React, { useEffect, useRef, useCallback, useState } from "react";

interface MeetIframeProps {
  url: string;
  username: string;
}

export const MeetIframe: React.FC<MeetIframeProps> = ({ url, username }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [showPreloader, setShowPreloader] = useState(false);
  const [needContinue, setNeedContinue] = useState(true);
  

  // Déplacer l'utilisation de useCallback en dehors de useEffect

  const handleLogin = useCallback(
    async (iframe: HTMLIFrameElement) => {
    if (!username || !iframe) return; // Ne pas exécuter si username est vide ou si l'iframe est introuvable

    try {
      const iframeWindow = iframe.contentWindow;
      if (!iframeWindow) {
        console.error("Impossible d'accéder à la fenêtre de l'iframe.");
        setShowPreloader(false);
        return;
      }

      const iframeDocument = iframeWindow.document;

      // Vérification si l'utilisateur est déjà connecté
      const isLoggedIn = iframeDocument.querySelector('.user-menu'); // Un élément spécifique à l'utilisateur connecté
      if (isLoggedIn) {
        console.log('Utilisateur déjà connecté.');
        setShowPreloader(false); // Désactiver le loader si l'utilisateur est déjà connecté
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
        }, 3000);  // Délai de 3 secondes
      } else {
        //console.error("Champs de formulaire introuvables dans l'iframe.");
        setShowPreloader(false);
      }
    } catch (error) {
      console.error("Erreur lors de l'accès au contenu de l'iframe :", error);
      setShowPreloader(false);
    }
    },
    [username]
  );

  const handleLoad = useCallback(
    async (iframe: HTMLIFrameElement) => {
      if (needContinue) {
        await handleLogin(iframe).finally(() => setNeedContinue(false));
      } else {
        setShowPreloader(false);
      }
    },
    [handleLogin, needContinue]
  );

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return; // Ne pas exécuter si l'iframe est introuvable

    setShowPreloader(true);
    const load = () => handleLoad(iframe);
    // Associer l'événement de chargement
    iframe.addEventListener('load', load);

    // Nettoyage de l'événement lors du démontage du composant
    return () => {
      iframe.removeEventListener('load', load);
    };
  }, [handleLoad]); // Le useEffect dépend de handleLoad, car c'est un callback optimisé

  return (
    <div className="row">
      <div className="col-md-12">
        <div
        className=""
        style={{ display: showPreloader ? "block" : "none" }}
      >
        <span className=""></span>
      </div>
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

