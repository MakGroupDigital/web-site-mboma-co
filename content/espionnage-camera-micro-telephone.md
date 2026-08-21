# Peut-on être espionné à travers la caméra ou le micro de son téléphone ?

## Étude complète

### Introduction

Le smartphone est devenu l’un des objets les plus sensibles que nous possédons.

Il contient nos conversations, nos photos, nos documents, notre localisation, nos contacts, nos habitudes, nos moyens de paiement et, dans de nombreux cas, une partie importante de notre vie professionnelle.

Mais il possède également deux capteurs particulièrement sensibles : **une caméra et un microphone**.

Une question revient alors régulièrement :

**Une personne, une organisation ou un logiciel malveillant peut-il utiliser la caméra ou le microphone d’un téléphone pour observer ou écouter son propriétaire à son insu ?**

La réponse est **oui, techniquement cela est possible**.

Cependant, la réalité est beaucoup plus complexe que certaines affirmations circulant sur Internet. Un smartphone moderne n’active normalement pas librement sa caméra ou son microphone sans contrôle. Android et iOS disposent aujourd’hui de systèmes d’autorisation, d’indicateurs visuels et de mécanismes de protection destinés précisément à limiter ce type d’accès.

Le véritable danger apparaît principalement lorsqu’une application dispose de permissions excessives, lorsqu’un utilisateur installe un logiciel malveillant ou lorsqu’une vulnérabilité de sécurité permet à un attaquant de contourner les mécanismes de protection du système.

Cette étude de MboMa & Co. analyse les mécanismes techniques permettant une telle surveillance, les risques réels, les signes à observer et les mesures permettant de renforcer la sécurité de son appareil.

---

# 1. Pourquoi la caméra et le microphone représentent-ils un enjeu de cybersécurité ?

Une caméra ne produit pas simplement des photographies.

Elle peut potentiellement révéler :

* l'environnement dans lequel se trouve une personne ;
* son domicile ;
* son bureau ;
* les personnes avec lesquelles elle se trouve ;
* des documents visibles à proximité ;
* des écrans d'ordinateur ;
* des réunions professionnelles ;
* des informations confidentielles.

Le microphone est potentiellement encore plus sensible.

Un microphone compromis pourrait permettre d'enregistrer :

* des conversations privées ;
* des réunions ;
* des appels ;
* des discussions professionnelles ;
* des informations financières ;
* des mots de passe prononcés oralement ;
* des informations personnelles ou confidentielles.

Un téléphone compromis ne représente donc plus simplement une perte de confidentialité numérique.

Il peut devenir un **capteur d'espionnage placé en permanence à proximité de son propriétaire**.

---

# 2. Une application peut-elle réellement utiliser votre microphone ?

Oui.

Le microphone d'un smartphone est accessible aux applications lorsque le système leur accorde l'autorisation correspondante.

Sur Android, l'autorisation « Microphone » permet notamment à une application d'enregistrer de l'audio. Google permet aux utilisateurs de consulter et de modifier ces permissions depuis les paramètres de confidentialité.

Sur iPhone, les applications doivent également demander l'autorisation avant d'utiliser le microphone. L'utilisateur peut ensuite retirer cette autorisation depuis :

**Réglages > Confidentialité et sécurité > Microphone.**

Il faut néanmoins comprendre une distinction fondamentale :

**posséder l'autorisation d'utiliser le microphone ne signifie pas nécessairement qu'une application espionne son utilisateur.**

Une application d'appel, de visioconférence ou d'enregistrement audio a naturellement besoin du microphone.

Le problème apparaît lorsqu'une application demande un accès qui n'est pas cohérent avec sa fonction.

Par exemple, une application très simple de calculatrice n'a généralement aucune raison légitime d'accéder au microphone.

---

# 3. Une application peut-elle utiliser la caméra ?

Le principe est similaire.

Une application disposant de l'autorisation appropriée peut utiliser la caméra pour prendre des photos ou enregistrer des vidéos.

Cette fonctionnalité est évidemment nécessaire pour de nombreuses applications :

* visioconférence ;
* messagerie ;
* réseaux sociaux ;
* scanner de documents ;
* reconnaissance de QR codes ;
* photographie ;
* applications bancaires utilisant la vérification faciale.

Le risque apparaît lorsqu'une application malveillante obtient ou détourne cette autorisation.

---

# 4. Votre téléphone vous avertit normalement lorsqu'une caméra ou un microphone est utilisé

Les systèmes mobiles modernes intègrent désormais plusieurs mécanismes destinés à rendre ces accès plus visibles.

## Sur iPhone

Depuis iOS 14, Apple affiche un indicateur dans la partie supérieure de l'écran.

Un **indicateur orange** signifie qu'une application utilise le microphone.

Un **indicateur vert** signifie qu'une application utilise la caméra, ou la caméra et le microphone simultanément.

Le Centre de contrôle peut également indiquer quelle application a récemment utilisé ces fonctionnalités.

## Sur Android

Sur les versions modernes d'Android, notamment Android 12 et versions ultérieures, un indicateur vert apparaît également lorsqu'une application utilise la caméra ou le microphone.

En touchant cet indicateur, l'utilisateur peut identifier l'application ou le service responsable de cet accès.

Android permet même, sur les appareils compatibles, de désactiver globalement l'accès à la caméra ou au microphone depuis les paramètres rapides.

---

# 5. Alors comment un téléphone peut-il être espionné ?

Il existe plusieurs scénarios.

## Scénario 1 : une application malveillante

Un utilisateur peut installer une application qui semble légitime alors qu'elle contient du code malveillant.

Cela peut arriver notamment avec :

* de fausses applications ;
* des applications téléchargées depuis des sources non officielles ;
* des fichiers APK modifiés ;
* des applications piratées ;
* des applications utilisant des techniques d'ingénierie sociale.

Une fois installée, l'application peut tenter d'obtenir des permissions sensibles.

CISA souligne notamment l'utilisation d'applications « trojanisées », c'est-à-dire des applications apparemment légitimes contenant des fonctionnalités malveillantes permettant de récupérer des informations sensibles ou de prendre le contrôle de certaines fonctions d'un appareil.

---

# 6. Le rôle de l'ingénierie sociale

Dans de nombreux incidents de cybersécurité, la technologie n'est pas nécessairement le premier point d'entrée.

L'utilisateur peut être manipulé.

Un attaquant peut envoyer :

* un SMS ;
* un e-mail ;
* un lien WhatsApp ;
* un faux message de sécurité ;
* une fausse notification ;
* une fausse mise à jour ;
* une fausse application.

L'objectif est généralement de convaincre la victime d'effectuer elle-même une action.

Par exemple :

**« Votre compte sera suspendu. Cliquez ici pour confirmer votre identité. »**

ou :

**« Installez cette application pour consulter le document. »**

Une attaque peut donc commencer par un simple message.

---

# 7. Les logiciels espions

Le scénario le plus sérieux concerne les **spywares**, ou logiciels espions.

Ces programmes sont spécialement conçus pour surveiller un appareil et extraire des informations.

Selon les capacités du logiciel utilisé, un spyware peut potentiellement accéder à :

* des messages ;
* des contacts ;
* des photos ;
* des fichiers ;
* la localisation ;
* certaines communications ;
* des données d'applications ;
* le microphone ;
* la caméra.

Amnesty International décrit les logiciels espions avancés comme des outils pouvant offrir un accès particulièrement étendu à un appareil compromis, y compris la possibilité de détourner sa caméra et son microphone à des fins de surveillance.

---

# 8. Pegasus : lorsque l'espionnage devient extrêmement sophistiqué

L'un des exemples les plus connus est **Pegasus**, développé par NSO Group.

Pegasus est devenu célèbre parce qu'il illustre une catégorie de logiciels espions beaucoup plus sophistiqués que les malwares ordinaires.

Dans certaines campagnes documentées, ces outils ont visé notamment :

* journalistes ;
* militants ;
* responsables politiques ;
* membres de la société civile ;
* personnalités particulièrement exposées.

L'intérêt de ce cas n'est pas d'affirmer que chaque utilisateur risque d'être infecté par Pegasus.

Ce serait incorrect.

L'intérêt est de démontrer qu'un smartphone moderne peut, dans certaines circonstances, être transformé en outil de surveillance lorsqu'un attaquant suffisamment sophistiqué parvient à compromettre le système.

---

# 9. Peut-on être infecté sans installer volontairement une application ?

Dans certaines attaques avancées, oui.

Les attaques dites **zero-click** peuvent exploiter une vulnérabilité sans nécessiter que la victime clique explicitement sur un lien.

Ces techniques sont cependant beaucoup plus sophistiquées que les attaques auxquelles l'utilisateur moyen est confronté quotidiennement.

Pour la majorité des utilisateurs, les risques les plus courants restent :

* le phishing ;
* les applications douteuses ;
* les mots de passe compromis ;
* les systèmes non mis à jour ;
* les permissions excessives ;
* les comptes cloud compromis.

---

# 10. Le téléphone peut-il nous écouter pour afficher des publicités ?

C'est probablement l'une des croyances numériques les plus répandues.

Une personne parle d'un produit puis, quelques minutes ou quelques heures plus tard, voit une publicité correspondant exactement au sujet de la conversation.

Elle peut naturellement conclure :

**« Mon téléphone m'écoute. »**

Cette conclusion n'est toutefois pas nécessairement correcte.

Les systèmes publicitaires disposent déjà d'une quantité considérable d'informations permettant d'anticiper les intérêts des utilisateurs :

* recherches Internet ;
* historique de navigation ;
* localisation ;
* interactions avec des publications ;
* achats ;
* applications utilisées ;
* données démographiques ;
* centres d'intérêt ;
* profils similaires ;
* personnes se trouvant dans le même environnement numérique.

Les algorithmes publicitaires peuvent donc produire des coïncidences extrêmement convaincantes sans qu'un microphone soit utilisé pour écouter continuellement les conversations.

Cela ne signifie pas que l'accès abusif au microphone est impossible.

Cela signifie simplement qu'une publicité correspondant à une conversation **ne constitue pas, à elle seule, une preuve d'espionnage**.

---

# 11. Peut-on utiliser votre microphone lorsque l'écran est verrouillé ?

La réponse dépend du système, des permissions accordées et du type d'application.

Certaines applications légitimes doivent naturellement fonctionner en arrière-plan.

Par exemple :

* appels ;
* assistants vocaux ;
* enregistrements autorisés ;
* certaines fonctions d'accessibilité ;
* communications audio.

Les systèmes modernes limitent toutefois progressivement les possibilités d'accès silencieux aux capteurs sensibles.

Un appareil réellement compromis par un logiciel malveillant sophistiqué constitue cependant un scénario différent : l'attaquant peut tenter de contourner les restrictions normales du système.

---

# 12. Comment vérifier les permissions sur Android ?

Les utilisateurs Android peuvent consulter le gestionnaire de permissions.

Selon le constructeur et la version d'Android, le chemin peut légèrement varier, mais il se trouve généralement dans :

**Paramètres > Sécurité et confidentialité > Confidentialité > Gestionnaire d'autorisations.**

Google permet notamment de voir quelles applications disposent d'un accès à :

* la caméra ;
* le microphone ;
* la localisation ;
* les contacts ;
* les fichiers ;
* les SMS ;
* le journal d'appels.

---

# 13. Le tableau de bord de confidentialité Android

Android dispose également d'un tableau de bord de confidentialité.

Il permet de consulter l'utilisation récente des autorisations sensibles.

Selon Google, ce tableau de bord permet notamment de voir quelles applications ont utilisé certaines permissions et à quel moment.

Cela peut être particulièrement utile pour identifier une application utilisant régulièrement :

* le microphone ;
* la caméra ;
* la localisation.

---

# 14. Comment vérifier les permissions sur iPhone ?

Sur iPhone :

**Réglages > Confidentialité et sécurité**

Puis sélectionner :

**Microphone**

ou :

**Appareil photo**

L'utilisateur obtient alors la liste des applications ayant demandé cette autorisation.

Il peut désactiver individuellement l'accès pour les applications qu'il juge inutiles ou suspectes.

---

# 15. Quels signes peuvent éventuellement indiquer un appareil compromis ?

Il faut être extrêmement prudent sur ce point.

Aucun des signes suivants ne constitue, à lui seul, une preuve de piratage.

Cependant, plusieurs anomalies simultanées peuvent justifier une analyse.

### 1. Consommation inhabituelle de batterie

Un logiciel fonctionnant constamment en arrière-plan peut augmenter la consommation énergétique.

Mais une batterie vieillissante peut produire exactement le même phénomène.

### 2. Utilisation inhabituelle des données mobiles

Une application malveillante qui transmet des données vers un serveur distant peut générer du trafic réseau.

### 3. Chauffe excessive sans utilisation intensive

Une activité persistante en arrière-plan peut contribuer à faire chauffer le téléphone.

Mais de nombreuses causes parfaitement normales peuvent également expliquer ce phénomène.

### 4. Applications inconnues

La présence d'une application que l'utilisateur ne reconnaît pas mérite une vérification.

### 5. Activité inhabituelle de la caméra ou du microphone

Un indicateur de microphone ou de caméra qui apparaît alors qu'aucune application légitime ne devrait utiliser ces fonctions doit être examiné.

### 6. Permissions incohérentes

Une application dont la fonction ne justifie pas l'accès à la caméra, au microphone, aux SMS et aux contacts mérite une attention particulière.

### 7. Comportements inhabituels du système

Redémarrages inexpliqués, fenêtres inhabituelles ou comportements anormaux peuvent également justifier un diagnostic.

Encore une fois :

**ces signes sont des indicateurs potentiels, pas des preuves.**

---

# 16. Quelles personnes sont les plus exposées ?

Tout utilisateur peut être victime de cybercriminalité.

Cependant, le niveau et le type de menace ne sont pas identiques pour tous.

Les personnes particulièrement exposées peuvent inclure :

* responsables d'entreprises ;
* dirigeants ;
* responsables politiques ;
* journalistes ;
* chercheurs ;
* diplomates ;
* militants ;
* responsables financiers ;
* personnes manipulant des informations stratégiques.

Pour ces profils, un smartphone représente potentiellement une porte d'accès vers beaucoup plus que des informations personnelles.

Il peut contenir :

* conversations professionnelles ;
* documents internes ;
* informations financières ;
* données de partenaires ;
* accès aux systèmes de l'organisation ;
* e-mails professionnels ;
* applications d'authentification.

---

# 17. Le téléphone personnel peut devenir une porte d'entrée vers l'entreprise

La cybersécurité mobile n'est donc pas seulement un problème individuel.

Dans une entreprise, un téléphone compromis peut potentiellement exposer :

**Téléphone compromis
↓
Compte professionnel
↓
E-mail
↓
Documents internes
↓
Cloud
↓
Infrastructure de l'organisation**

C'est pourquoi la sécurité des appareils mobiles doit faire partie d'une politique globale de cybersécurité.

Le NIST recommande aux organisations d'encadrer l'utilisation des appareils et applications mobiles, notamment en tenant compte des fonctionnalités et données accessibles aux applications, telles que le microphone, la caméra, la localisation ou les contacts.

---

# 18. Pourquoi les mises à jour sont essentielles

Lorsqu'une vulnérabilité est découverte, les éditeurs peuvent publier un correctif.

Un téléphone qui n'est pas régulièrement mis à jour peut donc rester vulnérable à une faille déjà connue.

C'est pourquoi l'une des premières règles de cybersécurité reste extrêmement simple :

**mettre à jour régulièrement le système d'exploitation et les applications.**

CISA recommande notamment d'activer les mises à jour automatiques afin de bénéficier des correctifs de sécurité disponibles.

---

# 19. Télécharger des applications uniquement depuis des sources fiables

L'installation d'applications provenant de sources inconnues augmente considérablement la surface de risque.

Il faut être particulièrement prudent avec :

* APK envoyés sur WhatsApp ;
* logiciels crackés ;
* applications modifiées ;
* boutiques alternatives inconnues ;
* fausses mises à jour ;
* liens de téléchargement reçus par message.

Même une application visuellement professionnelle peut contenir du code malveillant.

CISA recommande notamment aux utilisateurs Android de maintenir Google Play Protect actif et d'être particulièrement prudents concernant l'installation d'applications provenant de sources tierces.

---

# 20. Principe essentiel : donner le minimum de permissions nécessaires

Une règle importante en cybersécurité est le **principe du moindre privilège**.

Une application ne devrait disposer que des autorisations nécessaires à son fonctionnement.

Par exemple :

Une application de visioconférence peut légitimement avoir besoin :

* du microphone ;
* de la caméra.

Une application de cartographie peut avoir besoin :

* de la localisation.

Mais une application qui demande simultanément :

* caméra ;
* microphone ;
* contacts ;
* localisation ;
* SMS ;
* fichiers ;

doit pouvoir justifier précisément ces accès.

CISA recommande de vérifier régulièrement les autorisations des applications et de retirer celles qui ne sont pas nécessaires, particulièrement pour des permissions sensibles telles que la localisation, la caméra ou le microphone.

---

# 21. Utiliser les permissions temporaires lorsque cela est possible

Les systèmes modernes proposent de plus en plus de permissions limitées.

Par exemple :

**Autoriser uniquement pendant l'utilisation de l'application.**

Cette option est généralement préférable à un accès permanent lorsque l'application n'a pas besoin de fonctionner continuellement.

---

# 22. Désactiver une permission inutile

Un principe simple peut être appliqué :

**Si vous ne savez pas pourquoi une application a besoin de votre microphone, désactivez son accès et observez si l'application continue à fonctionner normalement.**

La même logique peut être appliquée à :

* caméra ;
* localisation ;
* contacts ;
* Bluetooth ;
* fichiers.

---

# 23. Que faire si l'on suspecte réellement une surveillance ?

La réaction doit dépendre du niveau de risque.

Pour un utilisateur ordinaire :

1. vérifier les applications installées ;
2. supprimer les applications inconnues ;
3. vérifier les permissions ;
4. mettre à jour le système ;
5. modifier les mots de passe sensibles ;
6. activer l'authentification multifacteur ;
7. vérifier les sessions ouvertes sur ses comptes ;
8. analyser les événements de sécurité disponibles.

Si les anomalies persistent, une réinitialisation complète peut être envisagée après sauvegarde prudente des données nécessaires.

---

# 24. Cas sensibles : dirigeants, journalistes et personnalités exposées

Pour une personne à haut risque, une simple application antivirus n'est pas nécessairement suffisante.

Une véritable suspicion de spyware avancé peut nécessiter :

* une analyse forensique ;
* l'examen des journaux système ;
* l'analyse des sauvegardes ;
* l'analyse réseau ;
* la recherche d'indicateurs de compromission ;
* l'intervention de spécialistes en sécurité mobile.

Les logiciels espions avancés sont précisément conçus pour être difficiles à détecter.

---

# 25. Mettre un cache sur sa caméra suffit-il ?

Un cache physique peut empêcher une caméra couverte de capturer une image exploitable.

Il peut donc constituer une protection physique supplémentaire.

Mais il ne protège pas :

* le microphone ;
* les fichiers ;
* les messages ;
* la localisation ;
* les contacts ;
* les comptes ;
* les mots de passe.

Couvrir uniquement sa caméra tout en laissant un appareil compromis connecté à ses comptes ne résout donc qu'une partie extrêmement limitée du problème.

---

# 26. Éteindre son téléphone protège-t-il ?

Un téléphone réellement éteint réduit évidemment considérablement ses capacités de communication et de captation.

Cependant, dans la vie quotidienne, la meilleure approche reste d'empêcher la compromission plutôt que de compter sur l'extinction de l'appareil.

La cybersécurité doit fonctionner lorsque l'appareil est utilisé normalement.

---

# 27. Les applications « antivirus » peuvent-elles tout détecter ?

Non.

Les outils de sécurité peuvent être utiles contre certaines catégories de menaces, mais aucun antivirus ne garantit une détection absolue.

Les systèmes mobiles modernes isolent également fortement les applications, ce qui limite parfois la capacité d'une application de sécurité à inspecter l'intégralité du système.

Il faut donc considérer la cybersécurité comme une combinaison de :

* prévention ;
* mises à jour ;
* gestion des permissions ;
* bonnes pratiques ;
* authentification ;
* surveillance ;
* réaction aux incidents.

---

# 28. Les principaux niveaux de risque

On peut schématiser le risque de surveillance mobile en quatre niveaux.

### Niveau 1 — Faible

Applications légitimes avec permissions correctement configurées.

### Niveau 2 — Modéré

Application disposant de permissions inutiles ou excessives.

### Niveau 3 — Élevé

Application malveillante installée sur l'appareil ou compte principal compromis.

### Niveau 4 — Critique

Spyware sophistiqué exploitant des vulnérabilités du système et cherchant activement à contourner les mécanismes de sécurité.

Cette distinction est importante.

Tous les utilisateurs de smartphones sont exposés au risque cyber.

Mais tous ne sont pas confrontés au même niveau de menace.

---

# 29. Dix mesures essentielles pour protéger son smartphone

### 1. Maintenir le téléphone à jour

Installer les correctifs du système et des applications.

### 2. Utiliser un verrouillage robuste

Code complexe, biométrie et paramètres de verrouillage adaptés.

### 3. Activer l'authentification multifacteur

En particulier pour :

* e-mail ;
* cloud ;
* comptes professionnels ;
* réseaux sociaux ;
* services financiers.

### 4. Installer uniquement les applications nécessaires

Moins d'applications signifie généralement une surface d'attaque réduite.

### 5. Éviter les applications provenant de sources inconnues

Particulièrement les APK partagés par messagerie.

### 6. Vérifier régulièrement les permissions

Caméra, microphone, localisation et contacts doivent être surveillés.

### 7. Observer les indicateurs de confidentialité

Ne pas ignorer l'apparition inattendue de l'indicateur caméra ou microphone.

### 8. Supprimer les applications inutilisées

Une application abandonnée peut représenter un risque inutile.

### 9. Être extrêmement prudent avec les liens reçus

Même lorsqu'ils semblent provenir d'une personne connue.

### 10. Séparer autant que possible les usages professionnels et personnels

Particulièrement pour les personnes manipulant des informations sensibles.

---

# 30. Recommandations pour les entreprises

Les organisations devraient considérer les smartphones comme de véritables terminaux informatiques.

Une politique de cybersécurité mobile devrait notamment inclure :

* politique BYOD ;
* exigences minimales concernant les versions des systèmes ;
* authentification multifacteur ;
* contrôle des applications ;
* gestion des accès ;
* chiffrement ;
* sensibilisation au phishing ;
* gestion des appareils perdus ;
* révocation rapide des comptes ;
* procédures de réponse aux incidents.

Pour certaines organisations, des solutions de gestion centralisée des terminaux mobiles peuvent également être nécessaires.

---

# 31. Le facteur humain reste déterminant

Un système extrêmement sécurisé peut être compromis si son utilisateur :

* communique son mot de passe ;
* installe une application douteuse ;
* ignore les mises à jour ;
* accorde toutes les permissions ;
* clique systématiquement sur les liens reçus ;
* désactive les protections du système.

La cybersécurité ne dépend donc pas uniquement de la technologie.

Elle dépend également du comportement humain.

---

# 32. La vraie question n'est plus seulement : « Peut-on m'espionner ? »

Techniquement, la réponse est oui.

La question plus pertinente devient :

**Quel serait l'intérêt pour quelqu'un de me cibler, quelles informations pourrait-il obtenir et quelles protections ai-je mises en place pour rendre cette attaque difficile ?**

Cette approche permet de passer de la peur à une véritable logique de gestion du risque.

---

# Conclusion

Oui, un smartphone compromis peut théoriquement devenir un outil de surveillance capable d'exposer son microphone, sa caméra ou d'autres données sensibles.

Mais il faut distinguer la **possibilité technique** de la **probabilité réelle**.

Pour la majorité des utilisateurs, les principales menaces restent beaucoup plus classiques :

* phishing ;
* applications malveillantes ;
* permissions excessives ;
* mots de passe compromis ;
* absence de mises à jour ;
* mauvaise configuration des comptes.

À l'inverse, certaines personnes particulièrement exposées peuvent être confrontées à des attaques beaucoup plus sophistiquées.

La meilleure défense reste donc une approche combinant technologie, discipline numérique et compréhension des risques.

Un smartphone ne doit plus être considéré simplement comme un téléphone.

**C'est un ordinateur personnel contenant des capteurs, des identités numériques, des moyens d'authentification et parfois l'accès à toute l'infrastructure numérique d'une personne ou d'une organisation.**

Sa protection doit être proportionnelle à la valeur des informations qu'il contient.

---

## À retenir

**Peut-on être espionné à travers la caméra ou le microphone de son téléphone ?**

**Oui, techniquement.**

Mais dans des conditions normales, Android et iOS imposent des permissions et affichent des indicateurs lorsque ces capteurs sont utilisés.

Le risque devient beaucoup plus important lorsqu'un appareil est compromis par une application malveillante, un logiciel espion ou une vulnérabilité sophistiquée.

**La cybersécurité commence donc moins par la peur d'être surveillé que par le contrôle de ce que nous autorisons à accéder à nos appareils.**

### MboMa & Co.

**Innovation technologique — Cybersécurité — Transformation numérique**

*Nous ne faisons pas du bruit, nous laissons des traces.*
