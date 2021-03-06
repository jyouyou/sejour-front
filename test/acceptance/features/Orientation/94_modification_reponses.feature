#language: fr
Fonctionnalité: Modification des réponses données lors de l'orientation

En tant que usager
Je veux modifier mes réponses aux questions d'orientation
Afin de pouvoir corriger une mauvaise saisie

Critères d'acceptance :
** Lorsque je répond à une question, il m'est possible de revenir à cette question afin de changer ma réponse

Scénario: Je suis un salarié à l'étranger avec une autorisation de travail
    Etant donné un usager non connecté
    Lorsque je suis un particulier
    Et je suis né le 04/08/1967
    Et je suis de nationalité argentine
    Et je corrige ma date de naissance
    Et je suis né le 04/08/1966
    Alors je vois que je suis né le 04/08/1966
