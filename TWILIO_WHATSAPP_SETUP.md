# 📱 Configuration Twilio WhatsApp

## 🚀 Setup Twilio

### Étape 1: Créer un compte Twilio
1. Va sur [twilio.com](https://www.twilio.com)
2. Crée un compte gratuit
3. Tu reçois **$15 de crédit gratuit** (suffisant pour ~150 messages WhatsApp)

### Étape 2: Activer WhatsApp Sandbox
1. Dans le dashboard Twilio, va dans **Messaging** → **Try it out** → **Send a WhatsApp message**
2. Twilio te donne un **numéro WhatsApp sandbox** (ex: `+1234567890`)
3. **Important:** Tu dois d'abord envoyer un message au numéro Twilio pour "activer" le sandbox
   - Envoie `join code-word` au numéro Twilio (le code est affiché dans le dashboard)

### Étape 3: Récupérer tes credentials
1. Va dans **Account** → **API keys & tokens**
2. Copie:
   - **Account SID** (commence par `AC...`)
   - **Auth Token** (garde-le secret!)
3. Va dans **Messaging** → **Services** → **WhatsApp Sandbox**
4. Copie le **numéro WhatsApp** (ex: `whatsapp:+1234567890`)

### Étape 4: Configurer `.env.local`
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

**Important:** 
- `ADMIN_WHATSAPP_NUMBER` = ton numéro WhatsApp personnel (format: `+243...` pour RDC)
- `TWILIO_WHATSAPP_NUMBER` = le numéro sandbox Twilio

---

## 🔧 Installation des dépendances

```bash
npm install
```

Cela installe:
- `twilio` - SDK Twilio
- `express` - Serveur backend
- `cors` - Cross-origin requests
- `dotenv` - Variables d'environnement

---

## ▶️ Lancer le serveur

### Option 1: Frontend + Backend séparés
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server
```

### Option 2: Les deux ensemble
```bash
npm run dev:all
```

Le serveur démarre sur `http://localhost:5000`

---

## 📋 Endpoints API

### 1. Envoyer confirmation à l'utilisateur + admin
**POST** `/api/whatsapp/send-confirmation`

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

**Réponse:**
```json
{
  "success": true,
  "userMessageSid": "SM...",
  "adminMessageSid": "SM..."
}
```

### 2. Envoyer message à l'utilisateur seulement
**POST** `/api/whatsapp/send-user-confirmation`

### 3. Envoyer notification à l'admin seulement
**POST** `/api/whatsapp/send-admin-notification`

---

## 🧪 Tester

### Test manuel avec cURL
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

### Test dans l'app
1. Remplis le formulaire de Masterclass
2. Complète jusqu'au step 5
3. Tu devrais recevoir un message WhatsApp

---

## 💰 Tarification

### Plan Gratuit
- **$15 de crédit** au démarrage
- **~150 messages WhatsApp** gratuits
- Parfait pour tester

### Plan Payant
- **$0.0075 par message** après crédit gratuit
- Très bon marché
- Paiement à l'usage

---

## ⚠️ Limitations du Sandbox

Le sandbox Twilio a des limitations:
- ✅ Envoie des messages à des numéros approuvés
- ✅ Reçoit des messages de numéros approuvés
- ❌ Pas d'envoi en masse
- ❌ Limité à 100 messages/jour

**Pour la production:** Demande l'accès WhatsApp Business API (gratuit après approbation)

---

## 🔒 Sécurité

- ✅ Les credentials sont dans `.env.local` (non versionnées)
- ✅ Le backend gère les appels Twilio (pas exposé au frontend)
- ✅ Les tokens sont sécurisés côté serveur
- ✅ CORS configuré pour accepter les requêtes du frontend

---

## 🐛 Troubleshooting

### "Invalid phone number"
- Vérifie le format: `+243xxxxxxxxx` (avec le +)
- Assure-toi que le numéro est approuvé dans le sandbox

### "Invalid credentials"
- Vérifie `TWILIO_ACCOUNT_SID` et `TWILIO_AUTH_TOKEN`
- Assure-toi qu'ils sont dans `.env.local`

### "Message not sent"
- Vérifie que le serveur tourne: `http://localhost:5000/health`
- Vérifie les logs du serveur pour les erreurs

### "CORS error"
- Assure-toi que `VITE_API_URL=http://localhost:5000` est configuré
- Vérifie que le serveur a CORS activé

---

## 📚 Ressources

- [Twilio WhatsApp Docs](https://www.twilio.com/docs/whatsapp)
- [Twilio Node.js SDK](https://www.twilio.com/docs/libraries/node)
- [Twilio Sandbox Setup](https://www.twilio.com/docs/whatsapp/sandbox)

