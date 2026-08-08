# Service de notifications MboMa & Co.

Cette API s’exécute sur la VM Google Cloud et expédie deux messages pour chaque formulaire : une confirmation au visiteur et une alerte à l’équipe MboMa. Elle utilise le SMTP authentifié de la boîte LWS ; aucun secret n’est placé dans le navigateur et aucune Firebase Function n’est requise.

## Ce que le propriétaire doit récupérer dans LWS

Dans **LWS Panel > service du domaine > Emails > Action > Paramètres de configuration** pour `co@mboma.org`, relever :

- le serveur sortant SMTP exact ;
- le port SMTP, de préférence `465` avec SSL/TLS ;
- l’adresse complète `co@mboma.org` comme identifiant ;
- le mot de passe de cette boîte.

Vérifier également dans **Action > Configurer les restrictions** que SMTP n’est pas bloqué. Ne jamais envoyer le mot de passe dans GitHub ou dans une conversation : il doit être saisi directement dans `.env` sur la VM.

## Installation sur la VM

```bash
cd notification-server
cp .env.example .env
nano .env
docker compose up -d --build
curl http://127.0.0.1:8790/health
```

Créer ensuite dans la zone DNS LWS un enregistrement `A` :

```text
notifications.mboma.org -> ADRESSE_IP_PUBLIQUE_DE_LA_VM
```

Installer la configuration Nginx fournie, puis activer HTTPS avec Certbot. Le frontend doit être construit avec :

```text
VITE_NOTIFICATION_API_URL=https://notifications.mboma.org
```

Sur la VM `enkambavps`, Caddy est déjà utilisé par Docker. Le fichier `deploy/Caddyfile.snippet` fournit donc aussi une route HTTPS temporaire fonctionnant sans changement DNS :

```text
https://mboma-notifications.104.154.90.30.sslip.io
```

## Test SMTP depuis la VM

Avant le déploiement, la connectivité LWS peut être vérifiée sans révéler le mot de passe :

```bash
openssl s_client -connect SERVEUR_SMTP_LWS:465 -crlf -quiet
```

## Sécurité

- L’API accepte uniquement les formulaires MboMa prédéfinis.
- Les champs sont validés et limités en taille.
- Le contenu reçu est échappé avant insertion dans les e-mails.
- Chaque IP est limitée à dix soumissions par quinze minutes.
- Les origines autorisées sont définies dans `ALLOWED_ORIGINS`.
- Le service écoute uniquement sur `127.0.0.1` derrière Nginx.
