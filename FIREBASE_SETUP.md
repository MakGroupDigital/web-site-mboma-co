# 🔥 Firebase Setup - Complete Guide

## 📋 Vue d'ensemble

Firebase fournit:
- ✅ **Firestore** - Base de données NoSQL
- ✅ **Cloud Storage** - Stockage de fichiers (PDFs)
- ✅ **Cloud Functions** - Backend serverless (emails)
- ✅ **Authentication** - Authentification utilisateurs
- ✅ **Hosting** - Déploiement

---

## 🚀 Installation

### 1. Installer Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Installer les dépendances du projet
```bash
npm install
```

### 3. Initialiser Firebase (si pas déjà fait)
```bash
firebase login
firebase init
```

---

## 🔧 Configuration

### 1. Firestore Database

1. Va sur [Firebase Console](https://console.firebase.google.com)
2. Sélectionne ton projet `studio-7989313016-fb1dd`
3. Va dans **Firestore Database**
4. Crée deux collections:
   - `masterclass_registrations` - Pour les inscriptions masterclass
   - `audit_requests` - Pour les demandes d'audit

### 2. Cloud Storage

1. Va dans **Storage**
2. Crée un bucket (généralement auto-créé)
3. Configure les règles de sécurité:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /masterclass/{referenceNumber}/{allPaths=**} {
      allow read, write: if request.auth != null || request.auth == null;
    }
    match /audit/{referenceNumber}/{allPaths=**} {
      allow read, write: if request.auth != null || request.auth == null;
    }
  }
}
```

### 3. Cloud Functions

#### Étape 1: Configurer les variables d'environnement

```bash
firebase functions:config:set gmail.user="co@mboma.org" gmail.password="your_app_password"
```

**Important:** Utilise un [App Password Gmail](https://myaccount.google.com/apppasswords), pas ton mot de passe principal!

#### Étape 2: Déployer les functions

```bash
npm run deploy:functions
```

Ou depuis le dossier `functions/`:
```bash
cd functions
npm install
npm run deploy
```

### 4. Firestore Security Rules

Va dans **Firestore** → **Rules** et configure:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read/write registrations (public form)
    match /masterclass_registrations/{document=**} {
      allow read, write: if true;
    }
    
    // Allow anyone to read/write audit requests (public form)
    match /audit_requests/{document=**} {
      allow read, write: if true;
    }
  }
}
```

---

## 📱 Utilisation dans l'app

### Masterclass Registration

```typescript
import { saveMasterclassRegistration, uploadPdfToStorage, updateRegistrationWithPdfs, sendConfirmationEmail } from './services/masterclassService';

// 1. Save registration
const registrationId = await saveMasterclassRegistration({
  firstName: 'Jean',
  lastName: 'Dupont',
  email: 'jean@example.com',
  phone: '+243xxxxxxxxx',
  company: 'Ma Startup',
  country: 'RDC',
  city: 'Kinshasa',
  referenceNumber: 'MC-123456',
  registrationDate: '09/01/2026',
  paymentStatus: 'pending'
});

// 2. Upload PDFs
const registrationPdfUrl = await uploadPdfToStorage(
  pdfBlob,
  'registration.pdf',
  'MC-123456'
);

// 3. Update registration with PDF URLs
await updateRegistrationWithPdfs(registrationId, registrationPdfUrl);

// 4. Send confirmation email
await sendConfirmationEmail(registrationId, registrationData);
```

### Audit Request

```typescript
import { saveAuditRequest, sendAuditConfirmationEmail } from './services/auditService';

// 1. Save audit request
const auditId = await saveAuditRequest({
  firstName: 'Jean',
  lastName: 'Dupont',
  email: 'jean@example.com',
  company: 'Ma Startup',
  auditType: 'Audit de Sécurité',
  message: 'Nous avons besoin d\'un audit...',
  referenceNumber: 'AUDIT-123456',
  submissionDate: '09/01/2026',
  status: 'new'
});

// 2. Send confirmation email
await sendAuditConfirmationEmail(auditData);
```

---

## 🧪 Tester localement

### Avec l'émulateur Firebase

```bash
firebase emulators:start
```

Cela démarre:
- Firestore Emulator (port 8080)
- Functions Emulator (port 5001)
- Storage Emulator (port 9199)

### Tester les Cloud Functions

```bash
firebase functions:shell
> sendMasterclassConfirmation({firstName: 'Test', ...})
```

---

## 📊 Monitoring

### Logs des Cloud Functions

```bash
firebase functions:log
```

### Firestore Console

Va dans [Firebase Console](https://console.firebase.google.com) → Firestore → Data pour voir les données en temps réel

### Storage Console

Va dans [Firebase Console](https://console.firebase.google.com) → Storage pour voir les fichiers uploadés

---

## 🔒 Sécurité

✅ **Bonnes pratiques:**
- Firestore rules configurées pour les formulaires publics
- Cloud Functions gèrent les emails (pas exposé au frontend)
- PDFs stockés dans Cloud Storage avec URLs sécurisées
- Credentials Gmail dans les variables d'environnement

⚠️ **À faire en production:**
- Ajouter authentification utilisateur
- Limiter les requêtes (rate limiting)
- Ajouter logging et monitoring
- Configurer les backups automatiques

---

## 🐛 Troubleshooting

### "Permission denied" sur Firestore
- Vérifie les Firestore Security Rules
- Assure-toi que `allow read, write: if true;` est configuré pour les collections publiques

### "Email not sent"
- Vérifie que les variables d'environnement sont configurées:
  ```bash
  firebase functions:config:get
  ```
- Utilise un [App Password Gmail](https://myaccount.google.com/apppasswords)
- Vérifie les logs: `firebase functions:log`

### "PDF upload failed"
- Vérifie les Storage Security Rules
- Assure-toi que le bucket existe
- Vérifie les permissions

### "Cloud Functions not deployed"
```bash
cd functions
npm install
npm run deploy
```

---

## 📚 Ressources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Cloud Functions Guide](https://firebase.google.com/docs/functions)
- [Cloud Storage Guide](https://firebase.google.com/docs/storage)

