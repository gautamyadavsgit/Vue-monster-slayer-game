
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const App = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            attackRound: 0,
            Winner: null,
        };
    }, watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.Winner = 'Draw';
            } else if (value <= 0) {
                this.Winner = 'Monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                // A draw
                this.Winner = 'Draw';
            } else if (value <= 0) {
                // Player Won
                this.Winner = 'Player';
            }
        }

    },

    methods: {
        attackMonster() {
            this.attackRound++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 12);
            this.playerHealth = this.playerHealth - attackValue;
        }, specialMonsterAttack() {
            this.attackRound++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.attackPlayer();
        }, HealPlayer() {
            const HealValue = getRandomValue(12, 20);
            if (this.playerHealth + HealValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth = this.playerHealth + HealValue;
            }

            this.attackPlayer();
        },surrender(){
            this.Winner = 'Monster';
        },restart(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.attackRound = 0;
            this.Winner = null;
        }
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.monsterHealth + '%' };
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return { width: '0%' };
            }

            return { width: this.playerHealth + '%' }
        }
    }

});

App.mount('#game');