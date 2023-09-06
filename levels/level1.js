let level1;


/**
 * Initializes the level.
 */

function initLevel() {

    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chickensmall(),
            new Chickensmall(),
            new Chickensmall(),
            new Chickensmall()
        ],
        [
            new Cloud('./img/5_background/layers/4_clouds/1.png'),
            new Cloud('./img/5_background/layers/4_clouds/2.png'),
            new Cloud('./img/5_background/layers/4_clouds/1.png'),
            new Cloud('./img/5_background/layers/4_clouds/2.png')
        ],
        [
            new Background('./img/5_background/layers/air.png', -719, 0),
            new Background('./img/5_background/layers/3_third_layer/2.png', -719, 80),
            new Background('./img/5_background/layers/2_second_layer/2.png', -719, 80),
            new Background('./img/5_background/layers/1_first_layer/2.png', -719, 80),

            new Background('./img/5_background/layers/air.png', -719.26 * 2, 0),
            new Background('./img/5_background/layers/3_third_layer/1.png', -719 * 2, 80),
            new Background('./img/5_background/layers/2_second_layer/1.png', -719 * 2, 80),
            new Background('./img/5_background/layers/1_first_layer/1.png', -719 * 2, 80),


            new Background('./img/5_background/layers/air.png', 0, 0),
            new Background('./img/5_background/layers/3_third_layer/1.png', 0, 80),
            new Background('./img/5_background/layers/2_second_layer/1.png', 0, 80),
            new Background('./img/5_background/layers/1_first_layer/1.png', 0, 80),

            new Background('./img/5_background/layers/air.png', 719, 0),
            new Background('./img/5_background/layers/3_third_layer/2.png', 719, 80),
            new Background('./img/5_background/layers/2_second_layer/2.png', 719, 80),
            new Background('./img/5_background/layers/1_first_layer/2.png', 719, 80),


            new Background('./img/5_background/layers/air.png', 719 * 2, 0),
            new Background('./img/5_background/layers/3_third_layer/1.png', 719 * 2, 80),
            new Background('./img/5_background/layers/2_second_layer/1.png', 719 * 2, 80),
            new Background('./img/5_background/layers/1_first_layer/1.png', 719 * 2, 80),

            new Background('./img/5_background/layers/air.png', 719 * 3, 0),
            new Background('./img/5_background/layers/3_third_layer/2.png', 719 * 3, 80),
            new Background('./img/5_background/layers/2_second_layer/2.png', 719 * 3, 80),
            new Background('./img/5_background/layers/1_first_layer/2.png', 719 * 3, 80),


            new Background('./img/5_background/layers/air.png', 719 * 4, 0),
            new Background('./img/5_background/layers/3_third_layer/1.png', 719 * 4, 80),
            new Background('./img/5_background/layers/2_second_layer/1.png', 719 * 4, 80),
            new Background('./img/5_background/layers/1_first_layer/1.png', 719 * 4, 80),

            new Background('./img/5_background/layers/air.png', 719 * 5, 0),
            new Background('./img/5_background/layers/3_third_layer/2.png', 719 * 5, 80),
            new Background('./img/5_background/layers/2_second_layer/2.png', 719 * 5, 80),
            new Background('./img/5_background/layers/1_first_layer/2.png', 719 * 5, 80)
        ]
    );
}