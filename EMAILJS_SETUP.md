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

### 3. Créer le template d'email
1. Allez dans **"Email Templates"**
2. Cliquez **"Create New Template"**
3. Copiez ce template en français :

```
Objet: Confirmation de votre demande - {{title}}

Bonjour {{name}},

Merci de nous avoir contactés ! Nous avons bien reçu votre demande : "{{title}}", et nous ferons de notre mieux pour la traiter dans un délai de 3 jours ouvrables.

Cordialement,
L'équipe MboMa & Co.
```

**Template alternatif (notification interne) :**
```
Objet: Nouvelle demande d'audit - {{company}}

Bonjour,

Vous avez reçu une nouvelle demande d'audit depuis mboma.org :

INFORMATIONS CLIENT :
- Nom : {{first_name}} {{last_name}}
- Email : {{email}}
- Entreprise : {{company}}
- Type d'audit : {{audit_type}}

MESSAGE :
{{message}}

DÉTAILS :
- Date : {{date}}
- Navigateur : {{user_agent}}

---
Envoyé automatiquement depuis mboma.org
```

### 4. Vos clés EmailJS (configurées)
- **Public Key** : `ysWtYnFgf6oXyDQdz` ✅
- **Private Key** : `N8TXcF7LXxYiMVPcCPenM` (à garder secrète, côté serveur uniquement)
- **Service ID** : À récupérer dans votre dashboard EmailJS
- **Template ID** : À récupérer après création du template

### 5. Configurer les variables d'environnement
Le fichier `.env.local` est déjà configuré avec votre Public Key :

```bash
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx    # À remplacer
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx  # À remplacer
VITE_EMAILJS_PUBLIC_KEY=ysWtYnFgf6oXyDQdz  # ✅ Configuré
```

### 6. Tester le formulaire
1. Allez sur votre site
2. Naviguez vers "Audit Gratuit"
3. Remplissez le formulaire
4. Vérifiez que vous recevez l'email sur `co@mboma.org`

## 🔧 Fonctionnalités incluses

- ✅ **Formulaire complet** avec validation
- ✅ **Messages de statut** (succès/erreur)
- ✅ **Sélection d'audit** depuis les cartes
- ✅ **Design responsive**
- ✅ **Anti-spam** (via EmailJS)
- ✅ **Données formatées** dans l'email

## 📊 Limites du plan gratuit
- **200 emails/mois** gratuits
- **Upgrade** : $15/mois pour 1000 emails

## 🛠️ Personnalisation
Vous pouvez modifier :
- Le template d'email dans EmailJS
- Les champs du formulaire dans `App.tsx`
- Le design dans les classes CSS

## 🔒 Sécurité
- Les clés sont dans `.env.local` (non versionnées)
- EmailJS gère l'anti-spam automatiquement
- Validation côté client et serveur