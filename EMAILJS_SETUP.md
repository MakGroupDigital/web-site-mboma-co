# 📧 Configuration EmailJS pour MboMa & Co.

## 🚀 Étapes de Configuration

### 1. Créer un compte EmailJS
1. Allez sur [emailjs.com](https://www.emailjs.com)
2. Cliquez sur "Sign Up"
3. Utilisez votre email `co@mboma.org`

### 2. Configurer le service email
1. Dans le dashboard, allez dans **"Email Services"**
2. Cliquez **"Add New Service"**
3. Choisissez votre provider email :
   - **Gmail** (recommandé)
   - **Outlook**
   - **Custom SMTP**

### 3. Créer les templates d'email

#### Template 1: Demande d'Audit (existant)
- **Template ID**: `template_n55j7vt`
- Utilisé pour les demandes d'audit

#### Template 2: Confirmation Admin Masterclass (À créer)
1. Allez dans **"Email Templates"**
2. Cliquez **"Create New Template"**
3. Nommez-le: `Masterclass Admin Confirmation`
4. Copiez ce contenu:

```
Objet: Nouvelle inscription à la masterclass - {{name}}

Bonjour,

Vous avez reçu une nouvelle inscription à la masterclass "Dormez & Gagnez" :

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INFORMATIONS PARTICIPANT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nom Complet: {{name}}
Email: {{email}}
Téléphone: {{phone}}
Entreprise/Projet: {{company}}
Pays: {{country}}
Ville: {{city}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DÉTAILS INSCRIPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Numéro de Référence: {{reference_number}}
Date d'Inscription: {{registration_date}}
Statut de Paiement: {{payment_status}}
ID Transaction: {{transaction_id}}
Date de Paiement: {{payment_date}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cordialement,
Système d'Inscription MboMa & Co.
```

**Template ID à récupérer après création**: `template_masterclass_admin`

#### Template 3: Confirmation Utilisateur Masterclass (À créer)
1. Allez dans **"Email Templates"**
2. Cliquez **"Create New Template"**
3. Nommez-le: `Masterclass User Confirmation`
4. Copiez ce contenu:

```
Objet: Bienvenue à la Masterclass MboMa & Co! 🎉

Bonjour {{name}},

Merci de vous être inscrit à notre masterclass exclusive "Dormez & Gagnez" !

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONFIRMATION D'INSCRIPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Votre inscription a été confirmée avec succès!

Numéro de Référence: {{reference_number}}
Date d'Inscription: {{registration_date}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DÉTAILS DE LA MASTERCLASS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Titre: Dormez & Gagnez - L'art de l'automatisation totale
Dates: 19-21 Février 2026
Horaires: 17h00-19h30
Format: En ligne & Présentiel (Kinshasa)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STATUT DE PAIEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Statut: {{payment_status}}
{{#if_eq payment_status "Paiement Effectué"}}
ID Transaction: {{transaction_id}}
Date de Paiement: {{payment_date}}
Votre reçu de paiement est en pièce jointe.
{{/if_eq}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROCHAINES ÉTAPES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Téléchargez votre fiche d'inscription (en pièce jointe)
2. Conservez votre numéro de référence
3. Rejoignez notre communauté WhatsApp exclusive
4. Préparez-vous pour le 19 février à 17h00

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pour toute question: co@mboma.org

Bienvenue à la masterclass!

L'équipe MboMa & Co.
```

**Template ID à récupérer après création**: `template_masterclass_user`

### 4. Vos clés EmailJS (configurées)
- **Public Key** : `ysWtYnFgf6oXyDQdz` ✅
- **Private Key** : `N8TXcF7LXxYiMVPcCPenM` (à garder secrète, côté serveur uniquement)
- **Service ID** : `service_zsemrdi` ✅
- **Template ID Audit** : `template_n55j7vt` ✅
- **Template ID Admin Masterclass** : À récupérer après création
- **Template ID User Masterclass** : À récupérer après création

### 5. Configurer les variables d'environnement
Le fichier `.env.local` est déjà configuré avec votre Public Key :

```bash
VITE_EMAILJS_SERVICE_ID=service_zsemrdi
VITE_EMAILJS_PUBLIC_KEY=ysWtYnFgf6oXyDQdz
```

### 6. Tester le formulaire
1. Allez sur votre site
2. Naviguez vers "Masterclass"
3. Remplissez le formulaire d'inscription
4. Vérifiez que vous recevez l'email sur `co@mboma.org` ET sur votre email personnel

## 🔧 Fonctionnalités incluses

- ✅ **Formulaire complet** avec validation
- ✅ **Sélection pays/ville** dynamique
- ✅ **Messages de statut** (succès/erreur)
- ✅ **Design responsive**
- ✅ **Anti-spam** (via EmailJS)
- ✅ **Données formatées** dans l'email
- ✅ **PDFs en pièces jointes** (fiche + reçu)

## 📊 Limites du plan gratuit
- **200 emails/mois** gratuits
- **Upgrade** : $15/mois pour 1000 emails

## 🛠️ Personnalisation
Vous pouvez modifier :
- Le template d'email dans EmailJS
- Les champs du formulaire dans `pages/MasterclassPage.tsx`
- Le design dans les classes CSS

## 🔒 Sécurité
- Les clés sont dans `.env.local` (non versionnées)
- EmailJS gère l'anti-spam automatiquement
- Validation côté client et serveur
