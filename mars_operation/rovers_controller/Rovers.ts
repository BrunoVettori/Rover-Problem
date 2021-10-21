/* eslint-disable no-continue */
/* eslint-disable no-plusplus */

import IPlateau from '../plateau/interfaces/IPlateau';

class Rover {
    position_x: number;

    position_y: number;

    cardinal_direction: string;

    instructions: string;

    constructor(position_x: number, position_y: number, cardinal_direction: string, instructions: string) {
        this.position_x = position_x;
        this.position_y = position_y;
        this.cardinal_direction = cardinal_direction.toUpperCase();
        this.instructions = instructions;
    }

    instructions_validation(instructions: string): void {
        let string_count = 0;

        string_count += (instructions.match(/L/g) || []).length;
        string_count += (instructions.match(/R/g) || []).length;
        string_count += (instructions.match(/M/g) || []).length;

        if (string_count !== instructions.length) {
            throw new Error(
                `The input list for the rover movements is compromissed, please review the list, no action was taken for this rover`,
            );
        }
    }

    cardinal_to_degree(direction: string): number {
        if (direction === 'N') {
            return 0;
        }

        if (direction === 'E') {
            return 90;
        }

        if (direction === 'S') {
            return 180;
        }

        if (direction === 'W') {
            return 270;
        }

        throw new Error(`The cardinal direction received: "${direction}" is not valid, no action was taken`);
    }

    degree_to_cardinal(degree: number): string {
        if (degree === 0) {
            return 'N';
        }

        if (degree === 90) {
            return 'E';
        }

        if (degree === 180) {
            return 'S';
        }

        if (degree === 270) {
            return 'W';
        }

        throw new Error(`The degree received: "${degree}" is not valid`);
    }

    execute(plateau: IPlateau): void {
        // Check if the starting position is valid

        if ((this.position_x !== 0 && !this.position_x) || (this.position_y !== 0 && !this.position_y)) {
            throw new Error(
                'The input list for the rover starting position is compromissed, please review the list, no action was taken for this rover',
            );
        }

        if (this.position_x > plateau.plateau_x || this.position_y > plateau.plateau_y || this.position_y < 0 || this.position_x < 0) {
            throw new Error('The rover cannot start on this position because its out of the plateau');
        }

        const formated_instructions = this.instructions.toUpperCase();

        this.instructions_validation(formated_instructions);

        // Change the cardinal data to Degrees starting at N = 0º
        let rover_degree = this.cardinal_to_degree(this.cardinal_direction);

        const moviment_list = formated_instructions.split('');

        for (let index = 0; index < moviment_list.length; index++) {
            const moviment = moviment_list[index];

            if (moviment === 'L') {
                rover_degree -= 90;

                if (rover_degree < 0) {
                    rover_degree += 360;
                }

                continue;
            }

            if (moviment === 'R') {
                rover_degree += 90;

                if (rover_degree >= 360) {
                    rover_degree -= 360;
                }

                continue;
            }

            if (moviment === 'M') {
                if (rover_degree === 0) {
                    if (this.position_y + 1 > plateau.plateau_y) {
                        console.log('The next move will send the rover out of the plateau, therefore the rover will stop moving');
                        break;
                    }
                    this.position_y += 1;
                    continue;
                }

                if (rover_degree === 90) {
                    if (this.position_x + 1 > plateau.plateau_x) {
                        console.log('The next move will send the rover out of the plateau, therefore the rover will stop moving');
                        break;
                    }
                    this.position_x += 1;
                    continue;
                }

                if (rover_degree === 180) {
                    if (this.position_y - 1 < 0) {
                        console.log('The next move will send the rover out of the plateau, therefore the rover will stop moving');
                        break;
                    }
                    this.position_y -= 1;
                    continue;
                }

                if (rover_degree === 270) {
                    if (this.position_x - 1 < 0) {
                        console.log('The next move will send the rover out of the plateau, therefore the rover will stop moving');
                        break;
                    }
                    this.position_x -= 1;
                    continue;
                }
            }
        }

        // Change the final position of the rover to cardinal
        this.cardinal_direction = this.degree_to_cardinal(rover_degree);
    }
}

export default Rover;
