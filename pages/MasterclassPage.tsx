import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { generateRegistrationPDF, generatePaymentReceiptPDF, RegistrationData, PaymentData } from '../services/pdfGenerator';
import { saveMasterclassRegistration, uploadPdfToStorage, updateRegistrationWithPdfs, sendConfirmationEmail } from '../services/masterclassService';
import { countries, countriesCities } from '../data/countriesCities';

const MasterclassPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    country: '',
    city: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [showManualDownload, setShowManualDownload] = useState(false);

  // Get cities for selected country
  const availableCities = formData.country ? countriesCities[formData.country] || [] : [];

  // Generate unique reference number
  const generateReferenceNumber = (): string => {
    return `MC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.email && formData.country && formData.city) {
      const refNum = generateReferenceNumber();
      setReferenceNumber(refNum);
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDownloadRegistration = async () => {
    setIsLoading(true);
    try {
      const registrationData: RegistrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
        referenceNumber,
        registrationDate: new Date().toLocaleDateString('fr-FR')
      };
      
      await generateRegistrationPDF(registrationData);
      setShowManualDownload(false);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Erreur lors du téléchargement. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentChoice = (payNow: boolean) => {
    if (payNow) {
      setCurrentStep(3);
    } else {
      setCurrentStep(5); // Skip to confirmation
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePayAtOffice = () => {
    setCurrentStep(6);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const txId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setTransactionId(txId);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Payment error:', error);
      alert('Erreur lors du paiement. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const sendConfirmationMessages = async (paymentStatus: 'pending' | 'completed' | 'office') => {
    try {
      // 1. Save registration to Firestore
      const registrationId = await saveMasterclassRegistration({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        country: formData.country,
        city: formData.city,
        referenceNumber,
        registrationDate: new Date().toLocaleDateString('fr-FR'),
        paymentStatus: paymentStatus as 'pending' | 'completed' | 'office',
        transactionId: paymentStatus === 'completed' ? transactionId : undefined,
        paymentDate: paymentStatus === 'completed' ? new Date().toLocaleDateString('fr-FR') : undefined
      });

      console.log('✅ Registration saved to Firestore:', registrationId);

      // 2. Send confirmation email via Cloud Function
      await sendConfirmationEmail(registrationId, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        country: formData.country,
        city: formData.city,
        referenceNumber,
        registrationDate: new Date().toLocaleDateString('fr-FR'),
        paymentStatus: paymentStatus as 'pending' | 'completed' | 'office',
        transactionId: paymentStatus === 'completed' ? transactionId : undefined,
        paymentDate: paymentStatus === 'completed' ? new Date().toLocaleDateString('fr-FR') : undefined
      });

      console.log('✅ Confirmation email sent successfully');
    } catch (error) {
      console.error('❌ Error sending confirmation:', error);
      // Don't throw - let the user continue even if email fails
    }
  };

  // Send confirmation messages when reaching final step
  React.useEffect(() => {
    if (currentStep === 5) {
      // Determine payment status based on transaction ID
      const paymentStatus = transactionId ? 'completed' : 'pending';
      sendConfirmationMessages(paymentStatus);
    }
  }, [currentStep]);

  const handleDownloadPaymentReceipt = async () => {
    setIsLoading(true);
    try {
      const paymentData: PaymentData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        company: formData.company,
        amount: 99,
        currency: 'USD',
        paymentDate: new Date().toLocaleDateString('fr-FR'),
        transactionId,
        referenceNumber
      };
      
      await generatePaymentReceiptPDF(paymentData);
      setShowManualDownload(false);
    } catch (error) {
      console.error('Error downloading receipt:', error);
      alert('Erreur lors du téléchargement. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const shareOnSocial = (platform: string) => {
    // Utiliser http:// pour le développement local
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/masterclass`;
    const imageUrl = `${baseUrl}/IMG_9444.PNG`;
    const text = "Rejoignez-moi à la Masterclass MboMa & Co: Dormez & Gagnez! L'art de l'automatisation totale pour bâtisseurs d'empires numériques. 19-21 Fév, En ligne & Présentiel à Kinshasa.";
    
    let shareUrl = '';
    
    switch(platform) {
      case 'facebook':
        // Facebook share with image
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'whatsapp':
        // WhatsApp with text and link
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + '\n\n' + url)}`;
        break;
      case 'telegram':
        // Telegram with text and link
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'instagram':
        // Instagram - copy image URL and text to clipboard
        const instagramText = `${text}\n\nLien: ${url}`;
        navigator.clipboard.writeText(instagramText);
        alert('Affiche et lien copiés!\n\nPartagez sur Instagram Stories ou Feed');
        return;
      case 'tiktok':
        // TikTok - copy text and link to clipboard
        const tiktokText = `${text}\n\nLien: ${url}`;
        navigator.clipboard.writeText(tiktokText);
        alert('Affiche et lien copiés!\n\nPartagez sur TikTok');
        return;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-institutional-grey via-institutional-grey/95 to-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-12 h-full w-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-white h-full" />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-6 py-2 px-4 border-l border-institutional-orange bg-institutional-orange/10">
              <span className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-orange">Masterclass Exclusive 2026</span>
            </div>

            <h1 className="font-sans font-light text-5xl md:text-7xl lg:text-8xl text-white mb-8 tracking-tight leading-[1.1]">
              Dormez <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="font-bold text-institutional-orange italic"
              >
                & Gagnez
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="font-serif text-xl md:text-2xl text-institutional-lightGreen max-w-3xl mx-auto leading-relaxed mb-8"
            >
              L'art de l'automatisation totale pour bâtisseurs d'empires numériques en RDC
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="inline-block bg-institutional-orange/20 border border-institutional-orange/40 rounded-lg p-6 mb-8"
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <svg className="w-8 h-8 text-institutional-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-institutional-orange mb-1">19-21 Fév</div>
                  <p className="text-sm text-white/70">Dates Confirmées</p>
                </div>
                <div className="hidden md:block w-px h-12 bg-institutional-orange/30"></div>
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <svg className="w-8 h-8 text-institutional-lightGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-institutional-lightGreen mb-1">17h00-19h30</div>
                  <p className="text-sm text-white/70">Horaires Flexibles</p>
                </div>
                <div className="hidden md:block w-px h-12 bg-institutional-orange/30"></div>
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <svg className="w-8 h-8 text-institutional-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-institutional-orange mb-1">Online</div>
                  <p className="text-sm text-white/70">Accès Mondial</p>
                </div>
                <div className="hidden md:block w-px h-12 bg-institutional-orange/30"></div>
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <svg className="w-8 h-8 text-institutional-lightGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-institutional-lightGreen mb-1">Présentiel</div>
                  <p className="text-sm text-white/70">67 Blvd 30 Juin - Kin</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 border border-institutional-orange/30 rounded-lg p-8 backdrop-blur-sm">
              {/* Step Indicator */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3, 4, 5, 6].map((step) => (
                  <div key={step} className="flex items-center">
                    <motion.div
                      animate={{
                        backgroundColor: currentStep >= step ? '#6E8F3A' : 'transparent',
                        borderColor: currentStep >= step ? '#6E8F3A' : '#ffffff40'
                      }}
                      className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm"
                    >
                      {step}
                    </motion.div>
                    {step < 6 && (
                      <motion.div
                        animate={{
                          backgroundColor: currentStep > step ? '#6E8F3A' : '#ffffff40'
                        }}
                        className="w-8 h-1 mx-2"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Registration */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3 className="text-2xl font-bold mb-2">Inscription Gratuite</h3>
                  <p className="text-white/60 text-sm mb-6">Étape 1 sur 5 - Vos informations</p>

                  <form onSubmit={handleStep1Submit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Prénom"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-institutional-orange focus:outline-none rounded"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Nom"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-institutional-orange focus:outline-none rounded"
                      />
                    </div>

                    <input
                      type="email"
                      name="email"
                      placeholder="Email professionnel"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-institutional-orange focus:outline-none rounded"
                    />

                    <input
                      type="text"
                      name="company"
                      placeholder="Entreprise / Projet"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-institutional-orange focus:outline-none rounded"
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Téléphone (WhatsApp)"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-institutional-orange focus:outline-none rounded"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-institutional-orange focus:outline-none rounded appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-institutional-grey text-white">Sélectionner un pays</option>
                        {countries.map((country) => (
                          <option key={country} value={country} className="bg-institutional-grey text-white">
                            {country}
                          </option>
                        ))}
                      </select>

                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        disabled={!formData.country}
                        className="bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-institutional-orange focus:outline-none rounded appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="" className="bg-institutional-grey text-white">
                          {formData.country ? 'Sélectionner une ville' : 'Choisir un pays d\'abord'}
                        </option>
                        {availableCities.map((city) => (
                          <option key={city} value={city} className="bg-institutional-grey text-white">
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-institutional-orange/10 border border-institutional-orange/30 rounded p-4 my-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-white/70">
                          <svg className="w-4 h-4 text-institutional-lightGreen flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Inscription gratuite</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-white/70">
                          <svg className="w-4 h-4 text-institutional-lightGreen flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Accès immédiat aux ressources</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-white/70">
                          <svg className="w-4 h-4 text-institutional-lightGreen flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Certificat de participation</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-institutional-orange text-white py-4 font-sans text-sm font-bold uppercase tracking-widest hover:bg-institutional-orange/90 transition-all rounded"
                    >
                      S'inscrire
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Step 2: Download Registration Certificate */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3 className="text-2xl font-bold mb-2">Fiche d'Inscription</h3>
                  <p className="text-white/60 text-sm mb-8">Étape 2 sur 5 - Téléchargez votre fiche</p>

                  <div className="bg-gradient-to-br from-institutional-green/20 to-institutional-green/5 border border-institutional-green/40 rounded-lg p-8 mb-8">
                    <div className="text-center mb-6">
                      <svg className="w-16 h-16 text-institutional-green mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16v-4m0 0V8m0 4h4m-4 0H8m4-12a9 9 0 110 18 9 9 0 010-18z" />
                      </svg>
                      <p className="text-white/70 mb-4">Votre fiche d'inscription est prête!</p>
                      <p className="text-sm text-white/60">Numéro de référence: <span className="font-bold text-institutional-green">{referenceNumber}</span></p>
                    </div>

                    <div className="space-y-3 mb-8">
                      <button
                        onClick={handleDownloadRegistration}
                        disabled={isLoading}
                        className="w-full bg-institutional-green text-white py-4 font-sans text-sm font-bold uppercase tracking-widest hover:bg-institutional-green/90 disabled:opacity-50 transition-all rounded flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        {isLoading ? 'Téléchargement...' : 'Télécharger Automatiquement'}
                      </button>

                      {!showManualDownload && (
                        <button
                          onClick={() => setShowManualDownload(true)}
                          className="w-full border border-white/20 text-white py-3 font-sans text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-all rounded"
                        >
                          Téléchargement Manuel
                        </button>
                      )}
                    </div>

                    {showManualDownload && (
                      <div className="bg-white/5 border border-white/20 rounded-lg p-4 mb-6 space-y-2">
                        <p className="text-xs text-white/70 mb-3">Cliquez sur l'une des options ci-dessous:</p>
                        <button
                          onClick={handleDownloadRegistration}
                          disabled={isLoading}
                          className="w-full text-left px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-sm text-white transition-all"
                        >
                          → Télécharger via navigateur
                        </button>
                        <button
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = '#';
                            link.download = `Fiche_Inscription_${referenceNumber}.pdf`;
                            link.click();
                          }}
                          className="w-full text-left px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-sm text-white transition-all"
                        >
                          → Télécharger en tant que fichier
                        </button>
                      </div>
                    )}

                    <div className="bg-institutional-green/10 border border-institutional-green/30 rounded-lg p-4">
                      <p className="text-xs text-white/70">
                        <strong>Conseil:</strong> Votre fiche contient un code QR scannable pour vérifier votre inscription en ligne.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentStep(3)}
                    className="w-full bg-institutional-orange text-white py-4 font-sans text-sm font-bold uppercase tracking-widest hover:bg-institutional-orange/90 transition-all rounded"
                  >
                    Continuer
                  </button>
                </motion.div>
              )}

              {/* Step 3: Payment Choice */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3 className="text-2xl font-bold mb-2">Frais de Formation</h3>
                  <p className="text-white/60 text-sm mb-8">Étape 3 sur 5 - Paiement optionnel</p>

                  <div className="bg-gradient-to-br from-institutional-orange/20 to-institutional-orange/5 border border-institutional-orange/40 rounded-lg p-8 mb-8">
                    <div className="text-center mb-8">
                      <p className="text-white/60 text-sm mb-2">Investissement Formation</p>
                      <div className="text-5xl font-bold text-institutional-orange mb-2">
                        $99
                        <span className="text-lg text-white/60 ml-2">USD</span>
                      </div>
                      <p className="text-xs text-white/50">Paiement unique - Accès à vie</p>
                    </div>

                    <div className="space-y-3 mb-8 pt-8 border-t border-white/10">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-institutional-lightGreen flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">3 jours de masterclass intensive</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-institutional-lightGreen flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">Accès aux replays et ressources</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-institutional-lightGreen flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">Certificat professionnel</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-institutional-lightGreen flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">Communauté exclusive d'entrepreneurs</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-institutional-lightGreen flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">Support 24/7 pendant 30 jours</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <button
                      onClick={() => handlePaymentChoice(true)}
                      className="w-full bg-institutional-orange text-white py-4 font-sans text-sm font-bold uppercase tracking-widest hover:bg-institutional-orange/90 transition-all rounded"
                    >
                      Payer Maintenant ($99 USD)
                    </button>
                    <button
                      onClick={handlePayAtOffice}
                      className="w-full bg-institutional-green text-white py-4 font-sans text-sm font-bold uppercase tracking-widest hover:bg-institutional-green/90 transition-all rounded"
                    >
                      Payer à Notre Siège
                    </button>
                    <button
                      onClick={() => handlePaymentChoice(false)}
                      className="w-full border border-white/20 text-white py-3 font-sans text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-all rounded"
                    >
                      Payer Plus Tard
                    </button>
                  </div>

                  <p className="text-xs text-white/40 text-center">
                    Paiement sécurisé via Stripe | Remboursement 7 jours
                  </p>
                </motion.div>
              )}

              {/* Step 4: Payment Processing & Receipt */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3 className="text-2xl font-bold mb-2">Reçu de Paiement</h3>
                  <p className="text-white/60 text-sm mb-8">Étape 4 sur 6 - Téléchargez votre reçu</p>

                  <div className="bg-gradient-to-br from-institutional-orange/20 to-institutional-orange/5 border border-institutional-orange/40 rounded-lg p-8 mb-8">
                    <div className="text-center mb-6">
                      <svg className="w-16 h-16 text-institutional-orange mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-white/70 mb-4">Paiement Confirmé!</p>
                      <p className="text-sm text-white/60">ID Transaction: <span className="font-bold text-institutional-orange">{transactionId}</span></p>
                    </div>

                    <div className="space-y-3 mb-8">
                      <button
                        onClick={handleDownloadPaymentReceipt}
                        disabled={isLoading}
                        className="w-full bg-institutional-orange text-white py-4 font-sans text-sm font-bold uppercase tracking-widest hover:bg-institutional-orange/90 disabled:opacity-50 transition-all rounded flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        {isLoading ? 'Téléchargement...' : 'Télécharger le Reçu'}
                      </button>

                      {!showManualDownload && (
                        <button
                          onClick={() => setShowManualDownload(true)}
                          className="w-full border border-white/20 text-white py-3 font-sans text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-all rounded"
                        >
                          Téléchargement Manuel
                        </button>
                      )}
                    </div>

                    <div className="bg-institutional-orange/10 border border-institutional-orange/30 rounded-lg p-4">
                      <p className="text-xs text-white/70">
                        <strong>Conseil:</strong> Votre reçu contient un code QR scannable pour vérifier votre paiement en ligne.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentStep(5)}
                    className="w-full bg-institutional-green text-white py-4 font-sans text-sm font-bold uppercase tracking-widest hover:bg-institutional-green/90 transition-all rounded"
                  >
                    Continuer
                  </button>
                </motion.div>
              )}

              {/* Step 6: Pay at Office */}
              {currentStep === 6 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3 className="text-2xl font-bold mb-2">Paiement au Siège</h3>
                  <p className="text-white/60 text-sm mb-8">Étape 6 sur 6 - Visitez notre bureau</p>

                  <div className="bg-gradient-to-br from-institutional-green/20 to-institutional-green/5 border border-institutional-green/40 rounded-lg p-8 mb-8">
                    <div className="text-center mb-8">
                      <svg className="w-16 h-16 text-institutional-green mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <h4 className="text-xl font-bold text-institutional-green mb-4">Siège Principal - Kinshasa</h4>
                    </div>

                    <div className="space-y-6 mb-8">
                      <div className="bg-white/5 border border-white/20 rounded-lg p-6">
                        <div className="flex gap-4 mb-4">
                          <svg className="w-6 h-6 text-institutional-orange flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div>
                            <p className="font-bold text-white mb-2">Adresse</p>
                            <p className="text-white/70">67 Boulevard 30 Juin</p>
                            <p className="text-white/70">Kinshasa, République Démocratique du Congo</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 border border-white/20 rounded-lg p-6">
                        <div className="flex gap-4 mb-4">
                          <svg className="w-6 h-6 text-institutional-orange flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <p className="font-bold text-white mb-2">Email</p>
                            <p className="text-white/70">co@mboma.org</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 border border-white/20 rounded-lg p-6">
                        <div className="flex gap-4 mb-4">
                          <svg className="w-6 h-6 text-institutional-orange flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <p className="font-bold text-white mb-2">Horaires d'Ouverture</p>
                            <p className="text-white/70">Lundi - Vendredi: 09h00 - 17h00</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-institutional-green/10 border border-institutional-green/30 rounded-lg p-6 mb-8">
                      <h5 className="font-bold text-institutional-lightGreen mb-4">Instructions pour le Paiement au Siège:</h5>
                      <ol className="space-y-3 text-sm text-white/70">
                        <li className="flex gap-3">
                          <span className="text-institutional-orange font-bold flex-shrink-0">1.</span>
                          <span>Téléchargez et imprimez votre fiche d'inscription</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-institutional-orange font-bold flex-shrink-0">2.</span>
                          <span>Visitez notre siège avec votre fiche d'inscription</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-institutional-orange font-bold flex-shrink-0">3.</span>
                          <span>Présentez votre fiche à notre équipe</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-institutional-orange font-bold flex-shrink-0">4.</span>
                          <span>Effectuez le paiement de $99 USD</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-institutional-orange font-bold flex-shrink-0">5.</span>
                          <span>Recevez votre reçu de paiement confirmé</span>
                        </li>
                      </ol>
                    </div>

                    <div className="bg-institutional-orange/10 border border-institutional-orange/30 rounded-lg p-4 mb-8">
                      <p className="text-xs text-white/70">
                        <strong>Important:</strong> Assurez-vous d'avoir votre fiche d'inscription avec vous. Elle contient votre numéro de référence unique nécessaire pour la confirmation du paiement.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => setCurrentStep(5)}
                      className="w-full bg-institutional-green text-white py-4 font-sans text-sm font-bold uppercase tracking-widest hover:bg-institutional-green/90 transition-all rounded"
                    >
                      Confirmer et Continuer
                    </button>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="w-full border border-white/20 text-white py-3 font-sans text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-all rounded"
                    >
                      Retour aux Options de Paiement
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Final Confirmation */}
              {currentStep === 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="flex justify-center mb-6"
                  >
                    <svg className="w-16 h-16 text-institutional-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>

                  <h3 className="text-3xl font-bold mb-4">Bienvenue!</h3>
                  <p className="text-white/70 mb-8">
                    Votre inscription est confirmée. Un email de confirmation a été envoyé à <span className="text-institutional-orange font-bold">{formData.email}</span>
                  </p>

                  <div className="bg-institutional-green/10 border border-institutional-green/30 rounded-lg p-6 mb-8">
                    <h4 className="font-bold text-institutional-lightGreen mb-4">Prochaines étapes :</h4>
                    <ol className="text-left space-y-3 text-sm">
                      <li className="flex gap-3">
                        <span className="text-institutional-orange font-bold">1.</span>
                        <span>Vérifiez votre email pour les détails d'accès</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-institutional-orange font-bold">2.</span>
                        <span>Rejoignez la communauté WhatsApp exclusive</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-institutional-orange font-bold">3.</span>
                        <span>Préparez-vous pour le 19 février à 17h00</span>
                      </li>
                    </ol>
                  </div>

                  <button
                    onClick={() => navigate('/')}
                    className="w-full bg-institutional-orange text-white py-4 font-sans text-sm font-bold uppercase tracking-widest hover:bg-institutional-orange/90 transition-all rounded mb-4"
                  >
                    Retour à l'Accueil
                  </button>

                  <p className="text-xs text-white/40">
                    Des questions? Contactez support@mboma.org
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Poster Section */}
      <section className="py-20 bg-white/5 border-y border-white/10">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Affiche Officielle</h2>
            <p className="text-white/60">Partagez cette affiche avec votre réseau</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Poster Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-white/10 border border-white/20 rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="/IMG_9444.PNG" 
                  alt="Affiche Masterclass MboMa & Co" 
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            {/* Share Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold mb-4">Partagez l'affiche</h3>
                <p className="text-white/60 text-sm mb-6">Aidez-nous à atteindre plus d'entrepreneurs en partageant cette masterclass</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => shareOnSocial('facebook')}
                  className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all font-bold"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>

                <button
                  onClick={() => shareOnSocial('whatsapp')}
                  className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-all font-bold"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.557.821-2.816 2.088-3.646 3.514-1.676 2.697-.505 6.428 2.585 8.233 2.13 1.233 5.913 1.626 8.56-.165 1.304-.92 2.271-2.193 2.863-3.706.652-1.666.667-3.424.123-5.12-.592-1.956-2.112-3.461-3.901-4.165-1.573-.604-3.356-.461-4.514.388l-.002-.001z"/>
                  </svg>
                  WhatsApp
                </button>

                <button
                  onClick={() => shareOnSocial('telegram')}
                  className="w-full flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-all font-bold"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a11.955 11.955 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.365-1.337.175-.437-.148-1.33-.414-1.98-.742-.798-.36-1.432-.566-1.386-.95.023-.566.332-.1.887-.927 1.9-1.923 3.115-2.874 3.71-3.853.531-.954.534-1.338.473-1.338z"/>
                  </svg>
                  Telegram
                </button>

                <button
                  onClick={() => shareOnSocial('instagram')}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-lg transition-all font-bold"
                  title="Copie le lien pour partager sur Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                  </svg>
                  Instagram
                </button>

                <button
                  onClick={() => shareOnSocial('tiktok')}
                  className="w-full flex items-center justify-center gap-3 bg-black hover:bg-gray-900 text-white py-3 rounded-lg transition-all font-bold border border-white/20"
                  title="Copie le lien pour partager sur TikTok"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.498 3h-3.5a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h3.5a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-9.5 13.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0z"/>
                  </svg>
                  TikTok
                </button>
              </div>

              <div className="bg-institutional-orange/10 border border-institutional-orange/30 rounded-lg p-4">
                <p className="text-xs text-white/70">
                  <strong>Conseil:</strong> Partagez sur WhatsApp et Telegram pour atteindre directement vos contacts!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MasterclassPage;
