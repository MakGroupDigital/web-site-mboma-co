import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const VerificationPage: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [verificationData, setVerificationData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate verification lookup
    const verifyData = async () => {
      try {
        // In a real app, this would call an API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (type === 'registration') {
          setVerificationData({
            type: 'Fiche d\'Inscription',
            referenceNumber: id,
            status: 'Valide',
            date: new Date().toLocaleDateString('fr-FR'),
            message: 'Cette fiche d\'inscription est authentique et valide.'
          });
        } else if (type === 'payment') {
          setVerificationData({
            type: 'Reçu de Paiement',
            transactionId: id,
            status: 'Confirmé',
            date: new Date().toLocaleDateString('fr-FR'),
            message: 'Ce paiement a été confirmé avec succès.'
          });
        } else {
          setError('Type de vérification non reconnu');
        }
      } catch (err) {
        setError('Erreur lors de la vérification');
      } finally {
        setLoading(false);
      }
    };

    verifyData();
  }, [type, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-institutional-grey to-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 border-4 border-institutional-orange border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-institutional-grey to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Erreur de Vérification</h1>
          <p className="text-white/70">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-institutional-grey to-black text-white pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/5 border border-institutional-green/40 rounded-lg p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <svg className="w-16 h-16 text-institutional-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>

            <h1 className="text-4xl font-bold mb-4">{verificationData?.type}</h1>
            
            <div className="bg-institutional-green/10 border border-institutional-green/30 rounded-lg p-6 mb-8">
              <p className="text-white/70 mb-4">Statut: <span className="text-institutional-green font-bold">{verificationData?.status}</span></p>
              <p className="text-white/70 mb-4">Numéro: <span className="font-mono text-institutional-orange">{verificationData?.referenceNumber || verificationData?.transactionId}</span></p>
              <p className="text-white/70">Date: <span className="text-white">{verificationData?.date}</span></p>
            </div>

            <p className="text-lg text-white/80 mb-8">{verificationData?.message}</p>

            <div className="bg-institutional-orange/10 border border-institutional-orange/30 rounded-lg p-4">
              <p className="text-sm text-white/70">
                Ce document a été vérifié via code QR et est authentique.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerificationPage;
