test("test player vertical movement", function () {
    var canvas = document.createElement('canvas');
    canvas.width = 550;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");
    var container = new gameContainer(550, 500, ctx, 0, 1, 'rgb(0,0,0)');
    container._player._speedY -= 20;
    var expected = container._player._super._super.positionY - 20;
    container.movePlayer();
    var actual = container._player._super._super.positionY;
    equal(actual, expected);
});

test("test player move when player is close to top of the screen", function () {
    var canvas = document.createElement('canvas');
    canvas.width = 550;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");
    var container = new gameContainer(550, 500, ctx, 0, 1, 'rgb(0,0,0)');
    container._player._super._super.positionY = 90;
    var expected = 100;
    container.moveObjects();
    var actual = container._player._super._super.positionY;
    equal(actual, expected);
});

test("test objects move when player is close to top of the screen", function () {
    var canvas = document.createElement('canvas');
    canvas.width = 550;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");
    var container = new gameContainer(550, 500, ctx, 0, 1, 'rgb(0,0,0)');
    container._player._super._super.positionY = 90;

    container._super._uiElements = new Array();
    container._super._uiElements.push(new Floor(0, 90, container._super.width, 20, container._super._canvas, 'rgb(0,0,0)'));

    var expected = 100;
    container.moveObjects();
    var actual = container._super._uiElements[0]._super._super.positionY;
    equal(actual, expected);
});

test("adding initial floors", function () {
    var canvas = document.createElement('canvas');
    canvas.width = 550;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");
    var container = new gameContainer(550, 500, ctx, 0, 1, 'rgb(0,0,0)');

    var expected = 100;
    var actual = container._super._uiElements.length;

    equal(actual, expected);
});

test("test game ending", function () {
    var canvas = document.createElement('canvas');
    canvas.width = 550;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");
    var container = new gameContainer(550, 500, ctx, 0, 1, 'rgb(0,0,0)');

    container._player._super._super.positionY = container._super.height + container._player._super._super.height;

    for (var i = 0; i < 11; i++) {
        container.movePlayer();
        container.moveObjects();
        container.redraw();
    }

    var actual = container._gameEnded;
    var expected = true;

    equal(actual, expected);
});

test("changing direction after hitting the left wall", function () {
    var canvas = document.createElement('canvas');
    canvas.width = 550;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");
    var container = new gameContainer(550, 500, ctx, 0, 1, 'rgb(0,0,0)');

    container._player._speedX = -5;
    container._player._super._super.positionX = -6;

    container.movePlayer();

    var actual = container._player._speedX;

    // it's not five because of the constant acceleration
    var expected = 4.8;

    equal(actual, expected);
});

test("changing direction after hitting the right wall", function () {
    var canvas = document.createElement('canvas');
    canvas.width = 550;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");
    var container = new gameContainer(550, 500, ctx, 0, 1, 'rgb(0,0,0)');

    container._player._speedX = 5;
    container._player._super._super.positionX = container.width;

    container.movePlayer();

    var actual = container._player._speedX;

    // it's not minus five because of the constant acceleration
    var expected = -4.8;

    equal(actual, expected);
});


test("dificulty rise", function () {
    var canvas = document.createElement('canvas');
    canvas.width = 550;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");
    var container = new gameContainer(550, 500, ctx, 0, 1, 'rgb(0,0,0)');

    container._risingSpeed = 1
    container.moveObjects();

    var actual = container._player._super._super.positionY;
    var expected = 101;

    equal(actual, expected);
});

test("increase horizontal speed on rightKeyPressed", function () {
    var canvas = document.createElement('canvas');
    canvas.width = 550;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");
    var container = new gameContainer(550, 500, ctx, 0, 1, 'rgb(0,0,0)');

    container._rightKeyPressed = true;

    container.movePlayer();

    var actual = container._player._speedX;
    var expected = 0.2;

    equal(actual, expected);
});

test("increase horizontal speed on leftKeyPressed", function () {
    var canvas = document.createElement('canvas');
    canvas.width = 550;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");
    var container = new gameContainer(550, 500, ctx, 0, 1, 'rgb(0,0,0)');

    container._leftKeyPressed = true;

    container.movePlayer();

    var actual = container._player._speedX;
    var expected = -0.2;

    equal(actual, expected);
});


test("decrease horizontal speed while > 0", function () {
    var canvas = document.createElement('canvas');
    canvas.width = 550;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");
    var container = new gameContainer(550, 500, ctx, 0, 1, 'rgb(0,0,0)');

    container._player._speedX = 2;

    container.movePlayer();

    var actual = container._player._speedX;
    var expected = 1.8;

    equal(actual, expected);
});

test("decrease horizontal speed while > 5", function () {
    var canvas = document.createElement('canvas');
    canvas.width = 550;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");
    var container = new gameContainer(550, 500, ctx, 0, 1, 'rgb(0,0,0)');

    container._player._speedX = 6;
    container._rightKeyPressed = true;
    container.movePlayer();

    var actual = container._player._speedX;
    var expected = 3;

    equal(actual, expected);
});

test("decrease horizontal speed while < 0", function () {
    var canvas = document.createElement('canvas');
    canvas.width = 550;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");
    var container = new gameContainer(550, 500, ctx, 0, 1, 'rgb(0,0,0)');

    container._player._speedX = -2;

    container.movePlayer();

    var actual = container._player._speedX;
    var expected = -1.8;

    equal(actual, expected);
});

test("decrease horizontal speed while < -5", function () {
    var canvas = document.createElement('canvas');
    canvas.width = 550;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");
    var container = new gameContainer(550, 500, ctx, 0, 1, 'rgb(0,0,0)');

    container._player._speedX = -6;
    container._leftKeyPressed = true;
    container.movePlayer();

    var actual = container._player._speedX;
    var expected = -3;

    equal(actual, expected);
});

test("decrease horizontal speed while > 0 and < 1", function () {
    var canvas = document.createElement('canvas');
    canvas.width = 550;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");
    var container = new gameContainer(550, 500, ctx, 0, 1, 'rgb(0,0,0)');

    container._player._speedX = 0.8;
    container.movePlayer();

    var actual = container._player._speedX;
    var expected = 0;

    equal(actual, expected);
});

test("decrease horizontal speed while > -1 and < 0 ", function () {
    var canvas = document.createElement('canvas');
    canvas.width = 550;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");
    var container = new gameContainer(550, 500, ctx, 0, 1, 'rgb(0,0,0)');

    container._player._speedX = -0.8;
    container.movePlayer();

    var actual = container._player._speedX;
    var expected = 0;

    equal(actual, expected);
});