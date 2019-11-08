import { SVG_NS, BALL, P_PROPERTIES } from "../settings";

export default class Ball {
    constructor(radius, boardWidth, boardHeight) {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;
        this.reset()
    }

    ballMove() {
        this.x += this.vx;
        this.y += this.vy;
    }

    reset() {
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;

        this.vy = 0;
        while (this.vy === 0) {
            this.vy = Math.floor(Math.random() * 10) - 5;
        }
        this.vx = this.direction * (6 - Math.abs(this.vy));

    }

    collision(paddle1, paddle2) {
        const hitTop = (this.y - this.radius <= 0);
        const hitBottom = (this.y + this.radius >= this.boardHeight);
        const hitLeft = (this.x < 0);
        const hitRight = (this.x > this.boardWidth);

        if (hitTop || hitBottom) {
            this.vy = this.vy * -1;
        }

        if (hitLeft) {
            this.direction = 1;
            paddle2.increaseScore();
            this.reset();
        }

        if (hitRight) {
            this.direction = -1;
            paddle1.increaseScore();
            this.reset();
        }
    }

    paddleCollision(paddle1, paddle2) {
        let hitWall = false,
            checkTop = false,
            checkBottom = false;

        if (this.vx > 0) {
            const p2Walls = paddle2.getCoordinates();
            hitWall = (this.x + this.radius >= p2Walls.left);
            checkTop = (this.y - this.radius >= p2Walls.top);
            checkBottom = (this.y + this.radius <= p2Walls.bottom);

        } else {
            const p1Walls = paddle1.getCoordinates();
            hitWall = (this.x - this.radius <= p1Walls.right);
            checkTop = (this.y - this.radius >= p1Walls.top);
            checkBottom = (this.y + this.radius <= p1Walls.bottom);
        }
        if (hitWall && checkTop && checkBottom) {
            this.vx *= -1;
        }
    }

    render(svg, paddle1, paddle2) {
        let ball = document.createElementNS(SVG_NS, "circle");
        ball.setAttributeNS(null, "r", BALL.radius);
        ball.setAttributeNS(null, "cx", this.x);
        ball.setAttributeNS(null, "cy", this.y);
        ball.setAttributeNS(null, "fill", BALL.color);

        svg.appendChild(ball);
        this.ballMove();
        this.collision(paddle1, paddle2);
        this.paddleCollision(paddle1, paddle2);
    }
}