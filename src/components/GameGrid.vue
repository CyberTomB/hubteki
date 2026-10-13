<template>
  <div id="game-grid">
    <!-- FRONT -->
    <div id="front-left-instant" class="item">⚡</div>
    <div id="front-center-instant" class="item">⚡</div>
    <div id="front-right-instant" class="item">⚡</div>
    <div id="front-left-slot" class="item">FL SLOT</div>
    <div id="front-center-slot" class="item">FC SLOT</div>
    <div id="front-right-slot" class="item">FR SLOT</div>
    <div id="seeker" class="item">SEEKER</div>
    <!-- MIDDLE -->
    <div id="middle-left-instant" class="item">⚡</div>
    <div id="middle-center-instant" class="item">⚡</div>
    <div id="middle-right-instant" class="item">⚡</div>
    <div id="middle-left-slot" class="item">ML SLOT</div>
    <div id="middle-center-slot" class="item">MC SLOT</div>
    <div id="middle-right-slot" class="item">MR SLOT</div>
    <div id="tokens" class="item">TOKENS</div>
    <!-- BACK -->

    <div id="back-left-instant" class="item">⚡</div>
    <div id="back-center-instant" class="item">⚡</div>
    <div id="back-right-instant" class="item">⚡</div>
    <div id="back-left-slot" class="item">BL SLOT</div>
    <div id="back-center-slot" class="item">BC SLOT</div>
    <div id="back-right-slot" class="item">BR SLOT</div>
    <div id="archives-instant" class="item">⚡</div>
    <div id="network-instant" class="item">⚡</div>
    <div id="archives" class="item">ARCHIVES</div>
    <div id="scrap" class="item">SCRAP</div>
    <div id="network" class="item">NETWORK</div>
  </div>
</template>

<style scoped>
#game-grid {
  display: grid;
  grid-template-areas:
    '. . . front-left-instant front-center-instant front-right-instant . seeker'
    '. . . front-left-slot front-center-slot front-right-slot . seeker'
    '. . . middle-left-instant middle-center-instant middle-right-instant tokens tokens'
    '. . . middle-left-slot middle-center-slot middle-right-slot tokens tokens'
    '. . . back-left-instant back-center-instant back-right-instant tokens tokens'
    'scrap archives archives-instant back-left-slot back-center-slot back-right-slot network-instant network';
}

.item {
  border: 1px solid blue;
  padding: 10px;
  text-align: center;
  background-color: #f1f1f1;
}

#front-left-instant {
  grid-area: front-left-instant;
}
#front-center-instant {
  grid-area: front-center-instant;
}
#front-right-instant {
  grid-area: front-right-instant;
}

#middle-left-instant {
  grid-area: middle-left-instant;
}
#middle-center-instant {
  grid-area: middle-center-instant;
}
#middle-right-instant {
  grid-area: middle-right-instant;
}

#back-left-instant {
  grid-area: back-left-instant;
}
#back-center-instant {
  grid-area: back-center-instant;
}
#back-right-instant {
  grid-area: back-right-instant;
}

#front-left-slot {
  grid-area: front-left-slot;
}
#front-center-slot {
  grid-area: front-center-slot;
}
#front-right-slot {
  grid-area: front-right-slot;
}

#middle-left-slot {
  grid-area: middle-left-slot;
}
#middle-center-slot {
  grid-area: middle-center-slot;
}
#middle-right-slot {
  grid-area: middle-right-slot;
}

#back-left-slot {
  grid-area: back-left-slot;
}
#back-center-slot {
  grid-area: back-center-slot;
}
#back-right-slot {
  grid-area: back-right-slot;
}

#archives-instant {
  grid-area: archives-instant;
}

#network-instant {
  grid-area: network-instant;
}

#tokens {
  grid-area: tokens;
}

#seeker {
  grid-area: seeker;
}

#archives {
  grid-area: archives;
}

#scrap {
  grid-area: scrap;
}

#network {
  grid-area: network;
}
</style>
