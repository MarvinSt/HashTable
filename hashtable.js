/*
Custom hash table class implemented in p5.js, including collision handling and dynamic resizing.
*/


class HashTable {
  constructor() {
    this.table = new Array(3);
    this.length = 0;
    this.collisions = 0;
  }

  resize() {
    this.length = 0;
    this.collisions = 0;
    const new_table = new Array(this.table.length * 2);

    for (var i = 0; i < this.table.length; i++) {
      var items = this.table[i];

      if (!items)
        continue;

      for (var j = 0; j < items.length; j++) {
        const idx = this.hash_key(items[j][0], new_table.length);

        this.length++;
        if (!new_table[idx]) {
          new_table[idx] = [
            items[j]
          ];
        } else {
          this.collisions++;
          new_table[idx].push(items[j]);
        }
      }
    }

    this.table = new_table;
  }

  hash_key(key, length) {
    var hash = 0;
    for (var i = 0; i < key.length; i++) {
      hash += (i * key.charCodeAt(i));
    }
    return (hash % length);
  }

  set_item(key, value) {
    const idx = this.hash_key(key, this.table.length);

    if (!this.table[idx]) {
      this.length++;
      this.table[idx] = [
        [key, value]
      ];
    } else {
      var item = this.table[idx].find(x => x[0] === key);
      if (!item) {
        this.length++;
        this.collisions++;
        this.table[idx].push([key, value]);
      } else {
        item[1] = value;
      }
    }

    if (this.length / this.table.length > 0.8) {
      this.resize();
    }
  }

  get_item(key) {
    const idx = this.hash_key(key, this.table.length);

    if (!this.table[idx]) {
      return null;
    } else {
      var item = this.table[idx].find(x => x[0] === key);
      if (!item) {
        return null;
      }
      return item[1];
    }
  }
}



function setup() {
  createCanvas(400, 400);

  var h = new HashTable();

  h.set_item('first', 1);
  print('num_items: ' + h.length + ' table_size: ' + h.table.length + ' collisions: ' + h.collisions);
  h.set_item('first', 3);
  print('num_items: ' + h.length + ' table_size: ' + h.table.length + ' collisions: ' + h.collisions);
  h.set_item('third', 25);
  print('num_items: ' + h.length + ' table_size: ' + h.table.length + ' collisions: ' + h.collisions);
  h.set_item('fourth', 6);
  print('num_items: ' + h.length + ' table_size: ' + h.table.length + ' collisions: ' + h.collisions);
  h.set_item('fifth', 9);
  print('num_items: ' + h.length + ' table_size: ' + h.table.length + ' collisions: ' + h.collisions);
    h.set_item('sixth', 10);
  print('num_items: ' + h.length + ' table_size: ' + h.table.length + ' collisions: ' + h.collisions);
    h.set_item('seventh', 12);
  print('num_items: ' + h.length + ' table_size: ' + h.table.length + ' collisions: ' + h.collisions);
  
  print(h.get_item('first'))
  print(h.get_item('second'))
  print(h.get_item('third'))
  print(h.get_item('fourth'))
  print(h.length);

  h.resize();
  // h.resize();
  // h.resize();
  console.log(h);
}

function draw() {
  background(220);
  noLoop();
}
