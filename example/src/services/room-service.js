let rooms = [
  'Room #1',
  'Room #2',
  'Room #3',
];

class RoomService {
  static getNextId() {
    return rooms.length;
  }

  static updateById(index, name) {
    rooms[index] = name;

    return {
      id: index,
      name,
    }
  }

  static create(name) {
    rooms.push(name);

    return {
      id: rooms.length - 1,
      name,
    }
  }

  static findById(index) {
    const name = rooms[index];

    return {
      id: index,
      name,
    };
  }

  static removeById(index) {
    messages.splice(index, 1)
  }

  static all() {
    return rooms.map((r, i) => ({ id: i, name: r}));
  }
}

module.exports = RoomService;