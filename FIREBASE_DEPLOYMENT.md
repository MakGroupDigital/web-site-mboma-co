# 🚀 Firebase Deployment Guide

## 📋 Prérequis

- ✅ Firebase CLI installé: `npm install -g firebase-tools`
- ✅ Compte Firebase avec projet `studio-7989313016-fb1dd`
- ✅ Gmail App Password configuré
- ✅ Node.js 18+

---

## 🔧 Configuration Initiale

### 1. Installer Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Se connecter à Firebase
```bash
firebase login
```

### 3. Initialiser le projet (si pas déjà fait)
```bash
firebase init
```

Sélectionne:
- ✅ Firestore
- ✅ Functions
- ✅ Hosting
- ✅ Storage

---

## 📧 Configurer Gmail pour les Cloud Functions

### Étape 1: Créer un App Password Gmail

1. Va sur [Google Account Security](https://myaccount.google.com/security)
2. Active **2-Step Verification** si pas déjà activé
3. Va dans **App passwords**
4. Sélectionne **Mail** et **Windows Computer**
5. Copie le mot de passe généré (16 caractères)

### Étape 2: Configurer les variables d'environnement Firebase

```bash
firebase functions:config:set gmail.user="co@mboma.org" gmail.password="your_16_char_password"
```

Vérifie la configuration:
```bash
firebase functions:config:get
```

---

## 🔥 Déployer sur Firebase

### Option 1: Déployer tout
```bash
npm run deploy
```

Cela déploie:
- ✅ Cloud Functions
- ✅ Firestore Rules
- ✅ Storage Rules
- ✅ Hosting

### Option 2: Déployer par service

**Déployer uniquement les Cloud Functions:**
```bash
npm run deploy:functions
```

**Déployer uniquement Firestore Rules:**
```bash
npm run deploy:firestore
```

**Déployer uniquement Storage Rules:**
```bash
npm run deploy:storage
```

**Déployer uniquement Hosting:**
```bash
npm run deploy:hosting
```

---

## 🧪 Tester localement

### Démarrer l'émulateur Firebase
```bash
npm run firebase:emulate
```

Cela démarre:
- Firestore Emulator (port 8080)
- Functions Emulator (port 5001)
- Storage Emulator (port 9199)
- Hosting Emulator (port 5000)

### Accéder à l'émulateur
- Firestore: http://localhost:4000
- Hosting: http://localhost:5000

---

## 📊 Vérifier le déploiement

### Logs des Cloud Functions
```bash
firebase functions:log
```

### Firestore Console
Va sur [Firebase Console](https://console.firebase.google.com) → Firestore → Data

### Storage Console
Va sur [Firebase Console](https://console.firebase.google.com) → Storage

### Hosting Console
Va sur [Firebase Console](https://console.firebase.google.com) → Hosting

---

## 🔍 Troubleshooting

### "Permission denied" sur Firestore
```bash
firebase deploy --only firestore:rules
```

### "Cloud Functions not deploying"
```bash
cd functions
npm install
npm run build
cd ..
firebase deploy --only functions
```

### "Email not sending"
1. Vérifie les variables d'environnement:
   ```bash
   firebase functions:config:get
   ```
2. Vérifie les logs:
   ```bash
   firebase functions:log
   ```
3. Assure-toi que l'App Password est correct

### "Storage upload failing"
```bash
firebase deploy --only storage
```

---

## 📱 Utilisation dans l'app

### Après déploiement, l'app:
1. Sauvegarde les inscriptions dans Firestore
2. Upload les PDFs dans Cloud Storage
3. Envoie les emails via Cloud Functions
4. Affiche les confirmations à l'utilisateur

### Tester le formulaire:
1. Va sur https://studio-7989313016-fb1dd.web.app
2. Remplis le formulaire de Masterclass ou Audit
3. Soumets le formulaire
4. Vérifie que tu reçois un email

---

## 🔒 Sécurité en Production

### Firestore Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /masterclass_registrations/{document=**} {
      allow read, write: if true;
    }
    match /audit_requests/{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Storage Rules
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /masterclass/{referenceNumber}/{allPaths=**} {
      allow read, write: if true;
    }
    match /audit/{referenceNumber}/{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

---

## 📈 Monitoring

### Voir les statistiques
```bash
firebase open console
```

### Voir les logs en temps réel
```bash
firebase functions:log --follow
```

### Voir les erreurs
```bash
firebase functions:log --limit 50
```

---

## 🚀 Déploiement Continu (CI/CD)

### Avec GitHub Actions

Crée `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: studio-7989313016-fb1dd
```

---

## 📚 Ressources

- [Firebase Deployment](https://firebase.google.com/docs/hosting/deploying)
- [Cloud Functions Deployment](https://firebase.google.com/docs/functions/manage-functions)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/start)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)

