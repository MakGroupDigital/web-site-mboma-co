# Film profil institutionnel — MboMa & Co. (1:50)

Vidéo motion design 1920×1080, 30 i/s, durée exacte **1 min 50 s**, en français, voix off duo Canal+ (homme / femme, ElevenLabs).

Fichiers :
- `public/videos/mboma-profil-16x9.mp4` : version 16:9 (1920×1080) pour site, YouTube, LinkedIn et présentations
- `public/videos/mboma-profil-9x16.mp4` : version verticale 9:16 (1080×1920) pour TikTok, Instagram Reels, YouTube Shorts, statut WhatsApp. Même voix, même musique et même timing, mais chaque scène est remise en page pour l'écran vertical, avec les textes clés entre 250 px et 1700 px de hauteur, hors des zones masquées par les interfaces des applications.

## Intégration sur le site

Composant `components/ProfileVideo.tsx` : la version verticale est servie sur téléphone (largeur < 768 px), la version 16:9 sur tablette et ordinateur.

- **Accueil, bannière** : le film tourne en boucle, sans le son, sous le menu, avec les boutons « Activer le son » (relance le film depuis le début avec la voix) et « Regarder en plein écran ».
- **Accueil, section « Film institutionnel »** (`#film`) : lecteur avec le son, juste avant le rapport annuel.
- **Page Institution** : lecteur sous le profil institutionnel.
- Les visiteurs qui ont activé « réduire les animations » ou l'économiseur de données voient l'image fixe (`poster-*.jpg`) au lieu de la boucle.

## Déroulé

| Temps | Séquence | Voix | Contenu |
|---|---|---|---|
| 0:00 | Ouverture | Homme | « L'Afrique n'a plus le temps d'attendre » : carte de l'Afrique en points, liaisons entre capitales. Structure, vision, impact. |
| 0:08 | Institution | Femme | Révélation du logo, institution panafricaine de pilotage et de gouvernance, « à l'interface des nations… et du futur ». |
| 0:17 | 01 · L'institution | Homme | Portrait du fondateur Charmant Nyungu K. Partenaire institutionnel de long terme : vision politique, structure financière, déploiement technique. |
| 0:28 | 02 · Expertises | Femme | Transformation numérique, écosystèmes d'innovation, gouvernance de programmes, données, tokenisation & blockchain (une animation par expertise). |
| 0:41 | 03 · Méthode | Homme | Comprendre le terrain, auditer, concevoir le cadre, déployer. Architecture de marque : MboMa & Co. structure et dirige, YBS-Innovate conçoit et fabrique. |
| 0:54 | 04 · Sur le terrain | Femme | Plans de type « footage » : identification sécurisée, super-app de chantiers, plateformes diaspora, vidéo-surveillance IA, Clara AI (1 000 000 CV par minute). |
| 1:13 | 05 · Impact 2025 | Homme | 26 projets, 12 pays, 150+ solutions, 85 % d'expertise locale, 90 % de renouvellement, rapport annuel 2025. |
| 1:27 | 06 · Valeurs | Femme | Rigueur, intégrité, souveraineté africaine. L'humain au cœur, horizon 2050. |
| 1:38 | Signature | Homme + Femme | Logo, « Élever les standards. Créer l'impact. », « Nous ne faisons pas du bruit. Nous laissons une trace. », carton www.mboma.org. |

Aucune offre promotionnelle (campagne d'audits, Moni, masterclass) et aucun tarif n'apparaissent.

## Sources

- **Contenu** : pages du site (`constants.tsx`, pages Institution, Vision, Expertises, Architecture, Rapports) et rapport annuel 2025.
- **Charte** : vert #6E8F3A / #8BC34A, orange #E8902A / #C8742A, vert profond ; typographies Anton (titres), Montserrat, Libre Baskerville italique.
- **Visuels réels** : logo officiel, portrait du fondateur et couverture du rapport annuel, extraits du rapport.
- **Voix** : ElevenLabs « Canal+ Homme 1 » et « Canal+ Femme 1 » (modèle eleven_v4), découpées au mot près grâce à la transcription horodatée.
- **Musique et effets sonores** : bande originale synthétisée sur mesure (`music.py`). Elle est calée sur les changements de scène et la musique baisse automatiquement sous la voix (ducking). Mixage à −14 LUFS.

## Régénérer la vidéo

```bash
cd video-profil/source
npm install
python3 build_timeline.py          # découpe la voix, crée timeline.json, cues.json et vo_track.wav
python3 music.py cues.json music.wav
node render.js stills chk 5 30 60  # images de contrôle (optionnel)
node render.js range 0 3300 video.mp4
MOBILE=1 node render.js range 0 3300 video_mobile.mp4   # version verticale (film_mobile.html)
ffmpeg -i video.mp4 -i vo_track.wav -i music.wav -filter_complex \
  "[1:a]aformat=channel_layouts=stereo,highpass=f=80,equalizer=f=3500:t=q:w=1:g=2,acompressor=threshold=-20dB:ratio=3:attack=5:release=120,volume=1.6,asplit=2[vo][sc];[2:a]volume=0.55[mu];[mu][sc]sidechaincompress=threshold=0.03:ratio=6:attack=40:release=450[d];[d][vo]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 256k -movflags +faststart MboMa-Co_Profil_Institutionnel_1m50.mp4
```

`render.js` utilise Chromium (`/opt/pw-browsers/chromium` par défaut, modifiable dans le script). Tous les textes et toutes les animations se trouvent dans `film.html` (16:9) et `film_mobile.html` (9:16). `film_mobile.html` est assemblé à partir du moteur de `film.html` et des scènes verticales de `mobile_scenes.js` : chaque scène est une fonction synchronisée sur les mots de la voix (`WT('scene', 'mot')`).
