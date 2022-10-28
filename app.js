
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const App = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100
        };
    },
    methods: {
        attackMonster() {
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 12);
            this.playerHealth = this.playerHealth - attackValue;
        }
    },
    computed: {
       monsterBarStyles(){
        return {width:this.monsterHealth + '%'};
       },
       playerBarStyles(){
        return {width:this.playerHealth + '%'}
    }
    }

});

App.mount('#game');