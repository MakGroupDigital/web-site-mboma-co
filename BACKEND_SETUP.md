# 🚀 Backend Setup - Twilio WhatsApp Integration

## 📋 Vue d'ensemble

Ce projet utilise une architecture **Frontend + Backend**:
- **Frontend**: React + Vite (port 5173)
- **Backend**: Node.js + Express (port 5000)
- **Service**: Twilio WhatsApp API

---

## 🔧 Installation

### 1. Installer les dépendances
```bash
npm install
```

Cela installe:
- `twilio` - SDK Twilio pour WhatsApp
- `express` - Serveur backend
- `cors` - Cross-origin requests
- `dotenv` - Variables d'environnement

### 2. Configurer les variables d'environnement

Crée un fichier `.env.local` à la racine du projet:

```bash
# Twilio WhatsApp Configuration
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890
ADMIN_WHATSAPP_NUMBER=+243xxxxxxxxx

# API Configuration
VITE_API_URL=http://localhost:5000
PORT=5000
```

**Où trouver ces valeurs:**
- `TWILIO_ACCOUNT_SID` et `TWILIO_AUTH_TOKEN`: [Twilio Console](https://console.twilio.com)
- `TWILIO_WHATSAPP_NUMBER`: Twilio Messaging → WhatsApp Sandbox
- `ADMIN_WHATSAPP_NUMBER`: Ton numéro WhatsApp personnel

---

## ▶️ Lancer l'application

### Option 1: Frontend et Backend séparés (recommandé pour le développement)

**Terminal 1 - Frontend:**
```bash
npm run dev
```
Accès: `http://localhost:5173`

**Terminal 2 - Backend:**
```bash
npm run server
```
Accès: `http://localhost:5000`

### Option 2: Les deux ensemble
```bash
npm run dev:all
```
(Nécessite `concurrently` installé: `npm install -D concurrently`)

---

## 📱 Endpoints API

### 1. Envoyer confirmation (user + admin)
**POST** `/api/whatsapp/send-confirmation`

**Body:**
```json
{
  "phoneNumber": "+243xxxxxxxxx",
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean@example.com",
  "phone": "+243xxxxxxxxx",
  "company": "Ma Startup",
  "country": "RDC",
  "city": "Kinshasa",
  "referenceNumber": "MC-1234567890-ABC123",
  "registrationDate": "09/01/2026",
  "service": "Masterclass - Dormez & Gagnez",
  "paymentStatus": "En Attente"
}
```

**Response:**
```json
{
  "success": true,
  "userMessageSid": "SM...",
  "adminMessageSid": "SM..."
}
```

### 2. Envoyer message à l'utilisateur
**POST** `/api/whatsapp/send-user-confirmation`

### 3. Envoyer notification à l'admin
**POST** `/api/whatsapp/send-admin-notification`

### 4. Health check
**GET** `/health`

---

## 🧪 Tester l'API

### Avec cURL
```bash
curl -X POST http://localhost:5000/api/whatsapp/send-confirmation \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+243xxxxxxxxx",
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "+243xxxxxxxxx",
    "company": "Test Co",
    "country": "RDC",
    "city": "Kinshasa",
    "referenceNumber": "TEST-123",
    "registrationDate": "09/01/2026",
    "service": "Masterclass",
    "paymentStatus": "En Attente"
  }'
```

### Avec Postman
1. Crée une nouvelle requête POST
2. URL: `http://localhost:5000/api/whatsapp/send-confirmation`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON): Copie le JSON ci-dessus

### Dans l'app
1. Remplis le formulaire de Masterclass ou Audit
2. Soumets le formulaire
3. Tu devrais recevoir un message WhatsApp

---

## 📁 Structure du projet

```
.
├── server.js                          # Backend Express
├── services/
│   ├── whatsappService.ts            # Frontend service (appelle le backend)
│   ├── masterclassEmailService.ts    # (Deprecated - utilise WhatsApp)
│   ├── emailService.ts               # (Deprecated - utilise WhatsApp)
│   └── pdfGenerator.ts               # Génération de PDFs
├── pages/
│   ├── MasterclassPage.tsx           # Formulaire Masterclass (utilise WhatsApp)
│   └── AuditBookingPage.tsx          # Formulaire Audit (utilise WhatsApp)
├── .env.local                         # Variables d'environnement (à créer)
├── .env.local.example                 # Template d'env
├── TWILIO_WHATSAPP_SETUP.md          # Guide Twilio
└── BACKEND_SETUP.md                   # Ce fichier
```

---

## 🔒 Sécurité

✅ **Bonnes pratiques implémentées:**
- Credentials stockés dans `.env.local` (non versionnés)
- Backend gère les appels Twilio (pas exposé au frontend)
- CORS configuré pour accepter les requêtes du frontend
- Validation des données côté serveur
- Gestion d'erreurs robuste

⚠️ **À faire en production:**
- Utiliser HTTPS (pas HTTP)
- Ajouter authentification API (tokens)
- Limiter les requêtes (rate limiting)
- Ajouter logging et monitoring
- Déployer le backend sur un serveur sécurisé

---

## 🐛 Troubleshooting

### "Cannot connect to server"
```bash
# Vérifie que le serveur tourne
curl http://localhost:5000/health

# Vérifie le port
lsof -i :5000
```

### "Invalid credentials"
- Vérifie `TWILIO_ACCOUNT_SID` et `TWILIO_AUTH_TOKEN`
- Assure-toi qu'ils sont dans `.env.local`
- Redémarre le serveur après modification

### "Message not sent"
- Vérifie que le numéro est approuvé dans le sandbox Twilio
- Vérifie le format: `+243xxxxxxxxx` (avec le +)
- Regarde les logs du serveur pour les erreurs

### "CORS error"
- Assure-toi que `VITE_API_URL=http://localhost:5000` est configuré
- Vérifie que le serveur a CORS activé (voir `server.js`)

### "Phone number format error"
- Format correct: `+243xxxxxxxxx` (code pays + numéro)
- Pour RDC: `+243` + numéro sans le 0 initial
- Exemple: `+243812345678`

---

## 📊 Logs et Debugging

### Logs du serveur
```bash
npm run server
# Affiche les logs en temps réel
```

### Logs du frontend
Ouvre la console du navigateur (F12) et regarde:
- Network tab: Requêtes API
- Console tab: Erreurs JavaScript

### Logs Twilio
Va sur [Twilio Console](https://console.twilio.com) → Logs pour voir l'historique des messages

---

## 💰 Coûts

- **Gratuit**: $15 de crédit au démarrage
- **Après crédit**: $0.0075 par message WhatsApp
- **Très bon marché** pour un petit volume

---

## 🚀 Déploiement

### Frontend (Netlify/Vercel)
```bash
npm run build
# Déploie le dossier `dist/`
```

### Backend (Heroku/Railway/Render)
```bash
# Crée un Procfile
echo "web: node server.js" > Procfile

# Déploie avec les variables d'environnement
```

---

## 📚 Ressources

- [Twilio WhatsApp Docs](https://www.twilio.com/docs/whatsapp)
- [Twilio Node.js SDK](https://www.twilio.com/docs/libraries/node)
- [Express.js Docs](https://expressjs.com)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

