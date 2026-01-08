/**
 * Service pour gérer la lecture des PDFs sur mobile et desktop
 * Avec fallback automatique en cas de blocage du navigateur
 */

export const openPdfReader = async (pdfUrl: string, fileName: string) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  try {
    if (isMobile) {
      // Sur mobile, utiliser Google Docs Viewer comme fallback
      // Cela contourne les restrictions de CORS et les blocages du navigateur
      const googleDocsUrl = `https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
      
      // Essayer d'abord une ouverture directe
      const newWindow = window.open(pdfUrl, '_blank');
      
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // Si le popup est bloqué, rediriger vers Google Docs Viewer
        console.warn('Popup bloqué, redirection vers Google Docs Viewer');
        window.location.href = googleDocsUrl;
      } else {
        // Vérifier après un délai si la fenêtre s'est fermée (indicateur de blocage)
        setTimeout(() => {
          try {
            if (newWindow.closed) {
              console.warn('Fenêtre fermée, redirection vers Google Docs Viewer');
              window.location.href = googleDocsUrl;
            }
          } catch (e) {
            // En cas d'erreur d'accès à la fenêtre, rediriger
            window.location.href = googleDocsUrl;
          }
        }, 500);
      }
    } else {
      // Sur desktop, ouvrir dans un nouvel onglet
      const newWindow = window.open(pdfUrl, '_blank');
      
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // Fallback : télécharger le PDF
        downloadPdf(pdfUrl, fileName);
      }
    }
  } catch (error) {
    console.error('Erreur lors de l\'ouverture du PDF:', error);
    // Fallback : télécharger le PDF
    downloadPdf(pdfUrl, fileName);
  }
};

/**
 * Télécharger le PDF directement
 */
export const downloadPdf = (pdfUrl: string, fileName: string) => {
  try {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error);
    // Dernier recours : ouvrir directement
    window.open(pdfUrl, '_blank');
  }
};

/**
 * Ouvrir le PDF avec Google Docs Viewer (fonctionne sur tous les appareils)
 */
export const openWithGoogleDocs = (pdfUrl: string) => {
  const googleDocsUrl = `https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
  window.open(googleDocsUrl, '_blank');
};

/**
 * Ouvrir le PDF avec fallback intelligent
 */
export const openPdfWithFallback = async (pdfUrl: string, fileName: string) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  try {
    // Essayer d'ouvrir directement
    const newWindow = window.open(pdfUrl, '_blank');
    
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // Popup bloqué, utiliser Google Docs Viewer
      openWithGoogleDocs(pdfUrl);
    } else {
      // Vérifier après un délai
      setTimeout(() => {
        try {
          if (newWindow.closed) {
            openWithGoogleDocs(pdfUrl);
          }
        } catch (e) {
          openWithGoogleDocs(pdfUrl);
        }
      }, 1000);
    }
  } catch (error) {
    console.error('Erreur:', error);
    openWithGoogleDocs(pdfUrl);
  }
};
