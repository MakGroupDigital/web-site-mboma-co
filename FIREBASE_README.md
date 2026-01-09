# 🔥 Firebase Integration - Complete Setup

## 📋 Vue d'ensemble

Ce projet utilise **Firebase** pour:
- 📝 **Firestore** - Stocker les inscriptions et demandes d'audit
- 📤 **Cloud Storage** - Stocker les PDFs
- 📧 **Cloud Functions** - Envoyer les emails de confirmation
- 🌐 **Hosting** - Déployer l'app

---

## 🚀 Quick Start

### 1. Installation
```bash
npm install
```

### 2. Configuration Gmail
```bash
firebase functions:config:set gmail.user="co@mboma.org" gmail.password="your_app_password"
```

### 3. Déployer
```bash
npm run deploy
```

### 4. Tester
- Frontend: https://studio-7989313016-fb1dd.web.app
- Remplis le formulaire et soumets

---

## 📁 Structure du projet

```
.
├── services/
│   ├── firebase.ts                 # Configuration Firebase
│   ├── masterclassService.ts       # Masterclass Firestore + Storage
│   ├── auditService.ts             # Audit Firestore
│   └── pdfGenerator.ts             # Génération de PDFs
├── functions/
│   ├── src/
│   │   └── index.ts                # Cloud Functions (emails)
│   ├── package.json
│   └── tsconfig.json
├── pages/
│   ├── MasterclassPage.tsx         # Formulaire Masterclass
│   └── AuditBookingPage.tsx        # Formulaire Audit
├── firebase.json                    # Configuration Firebase
├── firestore.rules                  # Firestore Security Rules
├── storage.rules                    # Storage Security Rules
├── FIREBASE_SETUP.md               # Guide détaillé
└── FIREBASE_DEPLOYMENT.md          # Guide de déploiement
```

---

## 🔧 Services Firebase

### Firestore Collections

**masterclass_registrations**
```json
{
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean@example.com",
  "phone": "+243xxxxxxxxx",
  "company": "Ma Startup",
  "country": "RDC",
  "city": "Kinshasa",
  "referenceNumber": "MC-123456",
  "registrationDate": "09/01/2026",
  "paymentStatus": "pending",
  "registrationPdfUrl": "https://...",
  "receiptPdfUrl": "https://...",
  "createdAt": "2026-01-09T10:00:00Z",
  "updatedAt": "2026-01-09T10:00:00Z"
}
```

**audit_requests**
```json
{
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean@example.com",
  "company": "Ma Startup",
  "auditType": "Audit de Sécurité",
  "message": "Nous avons besoin d'un audit...",
  "referenceNumber": "AUDIT-123456",
  "submissionDate": "09/01/2026",
  "status": "new",
  "createdAt": "2026-01-09T10:00:00Z",
  "updatedAt": "2026-01-09T10:00:00Z"
}
```

### Cloud Storage Buckets

```
studio-7989313016-fb1dd.firebasestorage.app/
├── masterclass/
│   └── MC-123456/
│       ├── registration.pdf
│       └── receipt.pdf
└── audit/
    └── AUDIT-123456/
        └── request.pdf
```

### Cloud Functions

**sendMasterclassConfirmation**
- Envoie un email de confirmation à l'utilisateur
- Envoie une notification à l'admin
- Appelée automatiquement après l'inscription

**sendAuditConfirmation**
- Envoie un email de confirmation à l'utilisateur
- Envoie une notification à l'admin
- Appelée automatiquement après la soumission

---

## 📧 Flux d'email

### Masterclass Registration
1. Utilisateur remplit le formulaire
2. Données sauvegardées dans Firestore
3. PDFs uploadés dans Cloud Storage
4. Cloud Function envoie 2 emails:
   - Email utilisateur avec confirmation
   - Email admin avec détails

### Audit Request
1. Utilisateur remplit le formulaire
2. Données sauvegardées dans Firestore
3. Cloud Function envoie 2 emails:
   - Email utilisateur avec confirmation
   - Email admin avec détails

---

## 🧪 Tester localement

### Démarrer l'émulateur
```bash
npm run firebase:emulate
```

### Accéder à Firestore Emulator
http://localhost:4000

### Voir les logs
```bash
firebase functions:log --follow
```

---

## 🚀 Déployer en Production

### Déployer tout
```bash
npm run deploy
```

### Déployer uniquement les functions
```bash
npm run deploy:functions
```

### Vérifier le déploiement
```bash
firebase functions:log
```

---

## 🔒 Sécurité

✅ **Implémenté:**
- Firestore Rules pour les formulaires publics
- Storage Rules pour les PDFs
- Cloud Functions gèrent les emails (pas exposé au frontend)
- Gmail App Password (pas le mot de passe principal)

⚠️ **À faire:**
- Ajouter rate limiting
- Ajouter validation côté serveur
- Ajouter logging et monitoring
- Configurer les backups

---

## 🐛 Troubleshooting

### Email not sending
```bash
firebase functions:config:get
firebase functions:log
```

### Firestore permission denied
```bash
firebase deploy --only firestore:rules
```

### Storage upload failing
```bash
firebase deploy --only storage
```

### Functions not deploying
```bash
cd functions
npm install
npm run build
cd ..
firebase deploy --only functions
```

---

## 📚 Documentation

- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - Guide détaillé de configuration
- [FIREBASE_DEPLOYMENT.md](./FIREBASE_DEPLOYMENT.md) - Guide de déploiement
- [Firebase Docs](https://firebase.google.com/docs)

---

## 📞 Support

Pour toute question:
- Vérifie les logs: `firebase functions:log`
- Consulte la documentation Firebase
- Contacte: co@mboma.org

