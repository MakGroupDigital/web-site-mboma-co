# 📧 Test des Emails - MboMa & Co

## Configuration Actuelle

### Templates EmailJS
- **Template Admin (Générique)**: `template_d4tyizn`
- **Template User (Confirmation)**: `template_nnfd7xd`
- **Service ID**: `service_zsemrdi`
- **Public Key**: `ysWtYnFgf6oXyDQdz`

### Services Configurés

#### 1. Service Masterclass (`services/masterclassEmailService.ts`)
- Envoie 2 emails lors de l'inscription à la masterclass
- Email Admin: Tous les détails de l'inscription
- Email User: Confirmation avec détails de la masterclass

#### 2. Service Audit (`services/emailService.ts`)
- Envoie 2 emails lors d'une demande d'audit
- Email Admin: Détails de la demande d'audit
- Email User: Confirmation de réception

---

## 🧪 Test 1: Inscription Masterclass

### Étapes:
1. Va sur `/masterclass`
2. Remplis le formulaire:
   - Prénom: `Test`
   - Nom: `User`
   - Email: `ton-email@example.com`
   - Entreprise: `Test Company`
   - Téléphone: `+243123456789`
   - Pays: `République Démocratique du Congo`
   - Ville: `Kinshasa`
3. Clique sur "S'inscrire"
4. Complète les étapes jusqu'à la confirmation (étape 5)

### Résultats Attendus:
- ✅ Email reçu à `co@mboma.org` avec tous les détails
- ✅ Email reçu à `ton-email@example.com` avec confirmation
- ✅ Console affiche: `✅ Admin email sent successfully` et `✅ User email sent successfully`

---

## 🧪 Test 2: Demande d'Audit

### Étapes:
1. Va sur `/audit-booking`
2. Remplis le formulaire:
   - Prénom: `Test`
   - Nom: `Audit`
   - Email: `ton-email@example.com`
   - Entreprise: `Test Audit Company`
   - Type d'Audit: Sélectionne un type
   - Message: `Ceci est un test`
3. Clique sur "Envoyer"

### Résultats Attendus:
- ✅ Email reçu à `co@mboma.org` avec détails de l'audit
- ✅ Email reçu à `ton-email@example.com` avec confirmation
- ✅ Console affiche: `✅ Admin audit email sent` et `✅ User audit confirmation email sent`

---

## 📋 Paramètres des Templates

### Template Admin (template_d4tyizn)
```
to_email: Email de destination (co@mboma.org)
name: Nom complet
email: Email du client
phone: Téléphone
company: Entreprise
country: Pays
city: Ville
service_type: Type de service (Masterclass / Audit)
reference_number: Numéro de référence unique
submission_date: Date de soumission
status: Statut
additional_label: Label optionnel
additional_info: Info optionnelle
message: Message détaillé
```

### Template User (template_nnfd7xd)
```
to_email: Email du client
name: Nom complet
service_type: Type de service
reference_number: Numéro de référence
submission_date: Date de soumission
details: Détails du service
```

---

## 🔍 Dépannage

### Les emails ne sont pas envoyés?

1. **Vérifiez la console du navigateur** (F12 → Console)
   - Cherchez les messages `✅` ou `❌`
   - Notez les erreurs exactes

2. **Vérifiez les paramètres EmailJS**
   - Service ID: `service_zsemrdi` ✅
   - Public Key: `ysWtYnFgf6oXyDQdz` ✅
   - Template IDs: Vérifiez dans le dashboard EmailJS

3. **Vérifiez les templates dans EmailJS**
   - Allez sur https://dashboard.emailjs.com/
   - Vérifiez que les templates existent
   - Vérifiez que les variables correspondent

4. **Vérifiez les emails de spam**
   - Les emails peuvent être dans le dossier spam
   - Vérifiez `co@mboma.org` et votre email personnel

---

## ✅ Checklist de Vérification

- [ ] Template Admin créé: `template_d4tyizn`
- [ ] Template User créé: `template_nnfd7xd`
- [ ] Service ID correct: `service_zsemrdi`
- [ ] Public Key correct: `ysWtYnFgf6oXyDQdz`
- [ ] Test Masterclass réussi
- [ ] Test Audit réussi
- [ ] Emails reçus à `co@mboma.org`
- [ ] Emails reçus à l'adresse utilisateur
- [ ] Pas d'erreurs dans la console

---

## 📞 Support

Si les emails ne fonctionnent pas:
1. Vérifiez les logs dans la console (F12)
2. Vérifiez le dashboard EmailJS
3. Vérifiez que les templates existent
4. Vérifiez que les variables correspondent
