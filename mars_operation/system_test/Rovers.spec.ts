import Plateau from '../plateau/Plateau';
import Rover from '../rovers_controller/Rovers';

import IPlateau from '../plateau/interfaces/IPlateau';

describe('testing rover functions', () => {
    test('should be able to link cardinal directions with degrees N being 0º running clockwise', () => {
        const position_x = 2;
        const position_y = 7;
        const cardinal_direction = 'N';

        const rover = new Rover(position_x, position_y, cardinal_direction, 'R');

        const degree1 = rover.cardinal_to_degree('N');
        const degree2 = rover.cardinal_to_degree('E');
        const degree3 = rover.cardinal_to_degree('S');
        const degree4 = rover.cardinal_to_degree('W');

        expect(degree1).toBe(0);
        expect(degree2).toBe(90);
        expect(degree3).toBe(180);
        expect(degree4).toBe(270);
    });

    test('should be able to link degrees with cardinal directions 0º being N running clockwise', () => {
        const position_x = 2;
        const position_y = 7;
        const cardinal_direction = 'N';

        const rover = new Rover(position_x, position_y, cardinal_direction, 'R');

        const cardinal1 = rover.degree_to_cardinal(0);
        const cardinal2 = rover.degree_to_cardinal(90);
        const cardinal3 = rover.degree_to_cardinal(180);
        const cardinal4 = rover.degree_to_cardinal(270);

        expect(cardinal1).toBe('N');
        expect(cardinal2).toBe('E');
        expect(cardinal3).toBe('S');
        expect(cardinal4).toBe('W');
    });

    test('should be execute a list of actions and set the rover variables correctly', () => {
        const position_x = 0;
        const position_y = 0;
        const cardinal_direction = 'N';

        const rover = new Rover(position_x, position_y, cardinal_direction, 'RMMMMMMMLMMRRRRRM');

        const plateau = new Plateau(8, 8);

        rover.execute(plateau);

        console.log(rover);

        expect(rover.cardinal_direction).toBe('E');
        expect(rover.position_x).toBe(8);
        expect(rover.position_y).toBe(2);
    });

    test('should fail and escape the plateau to the left', () => {
        const position_x = 0;
        const position_y = 0;
        const cardinal_direction = 'N';

        const rover = new Rover(position_x, position_y, cardinal_direction, 'RMMMMMLMMLMMMMMM');

        const plateau = new Plateau(5, 5);

        rover.execute(plateau);

        console.log(rover);

        expect(rover.cardinal_direction).toBe('W');
        expect(rover.position_x).toBe(0);
        expect(rover.position_y).toBe(2);
    });

    test('should fail and escape the plateau to the right', () => {
        const position_x = 0;
        const position_y = 0;
        const cardinal_direction = 'E';

        const rover = new Rover(position_x, position_y, cardinal_direction, 'MMMMMLMMLMMMRMRMMMMMMM');

        const plateau = new Plateau(5, 5);

        rover.execute(plateau);

        console.log(rover);

        expect(rover.cardinal_direction).toBe('E');
        expect(rover.position_x).toBe(5);
        expect(rover.position_y).toBe(3);
    });

    test('should fail and escape the plateau up', () => {
        const position_x = 1;
        const position_y = 0;
        const cardinal_direction = 'N';

        const rover = new Rover(position_x, position_y, cardinal_direction, 'RMMMMMLMMLMMMRMMMMM');

        const plateau = new Plateau(9, 3);

        rover.execute(plateau);

        console.log(rover);

        expect(rover.cardinal_direction).toBe('N');
        expect(rover.position_x).toBe(3);
        expect(rover.position_y).toBe(3);
    });

    test('should fail and escape the plateau down', () => {
        const position_x = 10;
        const position_y = 8;
        const cardinal_direction = 'W';

        const rover = new Rover(position_x, position_y, cardinal_direction, 'LLMMRMMMMMMMMMMMMMMMMMMMMMMMMMMMM');

        const plateau = new Plateau(15, 75);

        rover.execute(plateau);

        console.log(rover);

        expect(rover.cardinal_direction).toBe('S');
        expect(rover.position_x).toBe(12);
        expect(rover.position_y).toBe(0);
    });

    test('should not enter the plateau because its off to the top', () => {
        const position_x = 2;
        const position_y = 8;
        const cardinal_direction = 'W';

        const rover = new Rover(position_x, position_y, cardinal_direction, 'LLMMRMMMMMMMMMMMMMMMMMMMMMMMMMMMM');

        const plateau = new Plateau(5, 6);

        console.log(rover);

        expect(() => {
            rover.execute(plateau);
        }).toThrow(Error);
    });

    test('should not enter the plateau because its off to the bottom', () => {
        const position_x = 2;
        const position_y = -6;
        const cardinal_direction = 'W';

        const rover = new Rover(position_x, position_y, cardinal_direction, 'LLMMRMMMMMMMMMMMMMMMMMMMMMMMMMMMM');

        const plateau = new Plateau(5, 6);

        console.log(rover);

        expect(() => {
            rover.execute(plateau);
        }).toThrow(Error);
    });

    test('should not enter the plateau because its off to the right', () => {
        const position_x = 10;
        const position_y = 2;
        const cardinal_direction = 'W';

        const rover = new Rover(position_x, position_y, cardinal_direction, 'LLMMRMMMMMMMMMMMMMMMMMMMMMMMMMMMM');

        const plateau = new Plateau(5, 6);

        console.log(rover);

        expect(() => {
            rover.execute(plateau);
        }).toThrow(Error);
    });

    test('should not enter the plateau because its off to the left', () => {
        const position_x = -7;
        const position_y = 2;
        const cardinal_direction = 'W';

        const rover = new Rover(position_x, position_y, cardinal_direction, 'LLMMRMMMMMMMMMMMMMMMMMMMMMMMMMMMM');

        const plateau = new Plateau(5, 6);

        console.log(rover);

        expect(() => {
            rover.execute(plateau);
        }).toThrow(Error);
    });
});
