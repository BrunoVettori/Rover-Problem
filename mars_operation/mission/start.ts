/* eslint-disable no-plusplus */
/* eslint-disable no-continue */

import path from 'path';

import ReadFileList from 'input_reader/ReadFileList';
import ReadInputList from '../input_reader/ReadInputList';

import Rover from '../rovers_controller/Rovers';
import Plateau from '../plateau/Plateau';

const directoryPath = path.join(__dirname.replace('mission', 'input_list'));

const file_list = ReadFileList(directoryPath);

for (let index = 0; index < file_list.length; index++) {
    const file = file_list[index];

    // exclude the guideline from the execution
    if (file === 'example.txt') {
        continue;
    }

    const input_list_raw = ReadInputList(directoryPath, file).split(/\r?\n/);

    // Remove empty lines on the input
    const input_list = input_list_raw.filter(function (item) {
        return item;
    });

    let plateau_cords;
    const rovers_input = [];

    // List all the inputs, of the file, separetes the plateau cords and put each rover instruction into and object
    for (let list_index = 0; list_index < input_list.length; list_index++) {
        const inputs = input_list[list_index];

        if (list_index === 0) {
            plateau_cords = inputs.split(' ').map(function (item) {
                return parseInt(item, 10);
            });
            continue;
        }

        if (list_index % 2 !== 0) {
            rovers_input.push({ start: input_list[list_index], instructions: input_list[list_index + 1] });
        }
    }

    let plateau;

    // Verrify the plateau cords
    if (plateau_cords && plateau_cords[0] && plateau_cords[1] && plateau_cords.length === 2) {
        plateau = new Plateau(plateau_cords[0], plateau_cords[1]);
    } else {
        throw new Error('The plateau inputs are wrong, chech the example.txt file on the input_list directory for a guideline');
    }

    // List all te rovers instructions and execute, made with a different for for better understading
    for (let rover_index = 0; rover_index < rovers_input.length; rover_index++) {
        const rover_input = rovers_input[rover_index];

        const start = rover_input.start.split(' ');

        if (start.length === 3 && rover_input.instructions) {
            const rover = new Rover(parseInt(start[0], 10), parseInt(start[1], 10), start[2], rover_input.instructions);

            rover.execute(plateau);

            console.log(`${rover.position_x} ${rover.position_y} ${rover.cardinal_direction}`);
        } else {
            throw new Error('The rover inputs are wrong, chech the example.txt file on the input_list directory for a guideline');
        }
    }
}
