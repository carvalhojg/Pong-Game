import { SVG_NS, P_PROPERTIES, KEYS, BALL, SCORE } from "../settings";
import Board from "./Board";
import Paddle from "./Paddle";
import Ball from "./Ball";
import Score from "./Score";


export default class Game {
    constructor(element, width, height) {
        this.element = element;
        this.width = width;
        this.height = height;
        this.gameElement = document.getElementById(this.element);

        const paddle1Gap = 10
        const paddle2Gap = (this.width - P_PROPERTIES.width - paddle1Gap)

        this.board = new Board(this.width, this.height);
        this.paddle1 = new Paddle(P_PROPERTIES.width, P_PROPERTIES.height, this.height, paddle1Gap, (this.height / 2) - (P_PROPERTIES.height / 2), KEYS.paddle1Up, KEYS.paddle1Down);
        this.paddle2 = new Paddle(P_PROPERTIES.width, P_PROPERTIES.height, this.height, paddle2Gap, (this.height / 2) - (P_PROPERTIES.height / 2), KEYS.paddle2Up, KEYS.paddle2Down);
        this.ball = new Ball(BALL.radius, this.width, this.height);
        this.ball2 = new Ball(BALL.radius, this.width, this.height);
        this.ball3 = new Ball(BALL.radius, this.width, this.height);
        this.score1 = new Score(this.width / 2 - 50, 30, SCORE.size);
        this.player1 = new Score(this.width / 2 - 230, 25, SCORE.size / 2);
        this.score2 = new Score(this.width / 2 + 25, 30, SCORE.size);
        this.player2 = new Score(this.width / 2 + 150, 25, SCORE.size / 2);

        this.pause = false;
        document.addEventListener("keydown", event => {
            if (event.key === KEYS.pause) {
                this.paddle1.setSpeed(P_PROPERTIES.speed);
                this.paddle2.setSpeed(P_PROPERTIES.speed);
                this.pause = !this.pause;
                return
            }
        });
        // Other code goes here...
    }

    render() {
        if (this.pause) {
            this.paddle1.setSpeed(0);
            this.paddle2.setSpeed(0);
            return;
        }

        this.gameElement.innerHTML = "";
        let svg = document.createElementNS(SVG_NS, "svg");
        svg.setAttributeNS(null, "width", this.width);
        svg.setAttributeNS(null, "height", this.height);
        svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
        this.gameElement.appendChild(svg);
        this.board.render(svg);
        this.paddle1.render(svg);
        this.paddle2.render(svg);
        this.ball.render(svg, this.paddle1, this.paddle2);


        if (this.paddle1.getScore() > 2 || this.paddle2.getScore() > 2) {
            this.ball2.render(svg, this.paddle1, this.paddle2);
        }
        if (this.paddle1.getScore() > 6 || this.paddle2.getScore() > 6) {
            this.ball3.render(svg, this.paddle1, this.paddle2);
        }

        this.player1.render(svg, P_PROPERTIES.p1);
        this.player2.render(svg, P_PROPERTIES.p2);
        this.score1.render(svg, this.paddle1.getScore());
        this.score2.render(svg, this.paddle2.getScore());


        if (this.paddle2.getScore() === 15) {
            this.pause = true;

            this.paddle1.resetScore()
            this.paddle2.resetScore()

            const winner = document.createElementNS(SVG_NS, "text");
            winner.setAttributeNS(null, "x", this.width / 2 - 130);
            winner.setAttributeNS(null, "y", this.height / 2);
            winner.setAttributeNS(null, "font-size", SCORE.size);
            winner.setAttributeNS(null, "font-family", "Silkscreen Web");
            winner.setAttributeNS(null, "fill", "white");
            winner.textContent = P_PROPERTIES.p2 + " Wins!";
            svg.appendChild(winner);

            const startOver = document.createElementNS(SVG_NS, "text");
            startOver.setAttributeNS(null, "x", this.width / 2 - 140);
            startOver.setAttributeNS(null, "y", this.height * (3 / 5));
            startOver.setAttributeNS(null, "font-size", SCORE.size / 2);
            startOver.setAttributeNS(null, "font-family", "Silkscreen Web");
            startOver.setAttributeNS(null, "fill", "white");
            startOver.textContent = "To start a new game, press space";

            svg.appendChild(startOver);
            return;
        }

        if (this.paddle1.getScore() === 15) {
            this.pause = true;

            this.paddle1.resetScore()
            this.paddle2.resetScore()

            const winner = document.createElementNS(SVG_NS, "text");
            winner.setAttributeNS(null, "x", this.width / 2 - 130);
            winner.setAttributeNS(null, "y", this.height / 2);
            winner.setAttributeNS(null, "font-size", SCORE.size);
            winner.setAttributeNS(null, "font-family", "Silkscreen Web");
            winner.setAttributeNS(null, "fill", "white");
            winner.textContent = P_PROPERTIES.p1 + " Wins!";
            svg.appendChild(winner);

            const startOver = document.createElementNS(SVG_NS, "text");
            startOver.setAttributeNS(null, "x", this.width / 2 - 140);
            startOver.setAttributeNS(null, "y", this.height * (3 / 5));
            startOver.setAttributeNS(null, "font-size", SCORE.size / 2);
            startOver.setAttributeNS(null, "font-family", "Silkscreen Web");
            startOver.setAttributeNS(null, "fill", "white");
            startOver.textContent = "To start a new game, press space";

            svg.appendChild(startOver);
            return;
        }

        // More code goes here....
    }
}