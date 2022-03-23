## Work in progress branch

Er zijn is een probleem met de DialogAPI waardoor deze branch open blijft. Het probleem stelt hem in het volgende scenario.

Opgeslagen informatie (Top 5 definities, instellingen, ...) naar de dialog sturen om in te laden. Als de call voor informatie komt van de dialogAPI kan hij niet 'goed' de informatie uit webstorage halen.

Technieken die getest zijn maar niet werken:
1. localstorage
2. filestorage
3. sessionstorage
4. indexedDB (met localforage)

De informatie is goed opgeslagen en kan je zien via de taskpanes maar, de dialogAPI ziet niet die informatie.

Informatie uit de dialogAPI naar het programma sturen lukt alleen via een eventhandler.

Button in dialogAPI -> messageParent -> event -> eventHandler

https://docs.microsoft.com/en-us/office/dev/add-ins/develop/dialog-api-in-office-add-ins